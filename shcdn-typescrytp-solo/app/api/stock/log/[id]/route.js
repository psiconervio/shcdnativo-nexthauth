import prisma from "@/lib/db";
import { NextResponse } from "next/server";
/**
 * Obtener detalles de un movimiento de stock por su ID.
 */
export async function GET(request, { params }) {
    const { id } = params;
  
    try {
      const logEntry = await prisma.productStockLog.findUnique({
        where: { id: parseInt(id) },
        include: { product: { select: { name: true } } }, // Incluye el nombre del producto
      });
  
      if (!logEntry) {
        return NextResponse.json(
          { error: "Movimiento de stock no encontrado." },
          { status: 404 }
        );
      }
  
      return NextResponse.json(logEntry, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error al obtener el movimiento de stock." },
        { status: 500 }
      );
    }
  }
  