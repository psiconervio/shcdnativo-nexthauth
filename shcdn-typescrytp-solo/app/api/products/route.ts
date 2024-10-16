// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { ingredients: true },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        ...data,
        ingredients: {
          create: data.ingredients,
        },
      },
      include: { ingredients: true },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
