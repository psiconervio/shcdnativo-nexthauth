import { NextResponse } from 'next/server';
// import prisma from '@/src/lib/prisma';
import prisma from '@/src/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const { name, description, price } = await request.json();
  const product = await prisma.product.create({
    data: { name, description, price },
  });
  return NextResponse.json(product);
}
