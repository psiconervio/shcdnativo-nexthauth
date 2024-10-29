// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    include: { ingredients: { include: { ingredient: true } } },
  });

  return NextResponse.json(products, { status: 200 });
}
