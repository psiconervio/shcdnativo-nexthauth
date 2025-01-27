import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Asegúrate de ajustar la ruta de tu instancia de Prisma
//API PARA EL COMPONENTE ITEMS-DASHBOARD
export async function GET() {
  try {
    // Obtener los datos del stock
    const stock = await prisma.productStock.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Calcular la suma del stock
    const totalStock = stock.reduce((sum, item) => sum + item.stock, 0);

    // Obtener los registros de movimientos de stock
    const stockLog = await prisma.productStockLog.findMany({
      orderBy: { createdAt: 'desc' }, // Ordenar por fecha (recientes primero)
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Calcular la suma de productos defectuosos
    const defectiveProductsTotal = stockLog
      .filter((log) => log.type === 'DEFECTIVE') // Filtrar por el tipo "DEFECTIVE"
      .reduce((sum, log) => sum + log.quantity, 0); // Sumar la cantidad de productos defectuosos

    return NextResponse.json({
      totalStock,
      stock,
      stockLog, // Logs de movimientos de stock
      defectiveProductsTotal, // Total de productos defectuosos
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener el stock o los registros de movimientos" },
      { status: 500 }
    );
  }
}
