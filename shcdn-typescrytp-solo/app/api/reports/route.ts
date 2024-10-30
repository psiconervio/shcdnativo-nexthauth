import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({
    include: { ingredients: { include: { ingredient: true } } }
  });

  const report = products.map((product) => {
    let totalCost = 0;
    product.ingredients.forEach((ing) => {
      totalCost += ing.quantity * ing.ingredient.price;
    });

    const costPerPortion = totalCost / product.portionsPerBatch;
    const sellingPrice = costPerPortion * (1 + product.margin / 100) * (1 + product.tax / 100);

    return {
      productName: product.name,
      totalCost,
      sellingPrice,
      profit: sellingPrice - costPerPortion,
    };
  });

  return NextResponse.json(report);
}
