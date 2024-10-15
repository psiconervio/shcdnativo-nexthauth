// app/api/products/route.js
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Asegúrate de importar desde lib/db.js

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, description, price, stock, featured } = await req.json();

    if (!name || typeof price !== 'number' || typeof stock !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        featured: featured || false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
