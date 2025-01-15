import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const sales = await prisma.sale.findMany({
    include: { products: { include: { product: true } }, client: true },
  });
  return NextResponse.json(sales);
}

export async function POST(request: Request) {
  const { clientId, products, totalAmount, paymentMethod } = await request.json();

  const sale = await prisma.sale.create({
    data: {
      clientId,
      totalAmount,
      paymentMethod,
      products: {
        create: products.map((p: { productId: number; quantity: number; totalPrice: number }) => ({
          productId: p.productId,
          quantity: p.quantity,
          totalPrice: p.totalPrice,
        })),
      },
    },
  });

  // Actualiza el stock de los productos vendidos
  for (const p of products) {
    await prisma.productStock.update({
      where: { productId: p.productId },
      data: { stock: { decrement: p.quantity } },
    });
  }

  return NextResponse.json(sale);
}
