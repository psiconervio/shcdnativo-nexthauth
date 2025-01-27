import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Asegúrate de ajustar la ruta de tu instancia de Prisma

export async function GET() {
  try {
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

    return NextResponse.json({
      totalStock,
      stock,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener el stock" }, { status: 500 });
  }
}