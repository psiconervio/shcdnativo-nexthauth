import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
      const saleProducts = await prisma.saleProduct.findMany({
        include: { product: true, sale: true },
      });
      return NextResponse.json(saleProducts);
    } catch {
      return NextResponse.json({ error: "Error al obtener los productos vendidos" }, { status: 500 });
    }
  }
  