// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: { ingredients: true },
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        ...data,
        ingredients: {
          deleteMany: {},
          create: data.ingredients,
        },
      },
      include: { ingredients: true },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}