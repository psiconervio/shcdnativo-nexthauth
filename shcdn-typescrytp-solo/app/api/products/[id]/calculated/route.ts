import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { ingredients: { include: { ingredient: true } } }
  });

  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  let totalCost = 0;
  product.ingredients.forEach((ing) => {
    totalCost += ing.quantity * ing.ingredient.price;
  });

  const costPerPortion = totalCost / product.portionsPerBatch;
  const sellingPrice = costPerPortion * (1 + product.margin / 100) * (1 + product.tax / 100);

  return NextResponse.json({
    totalCost,
    costPerPortion,
    sellingPrice,
  });
}
