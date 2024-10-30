import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Leer producto por ID (GET /api/products/[id])
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { ingredients: { include: { ingredient: true } } }
  });
  return product ? NextResponse.json(product) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

// Actualizar producto por ID (PUT /api/products/[id])
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await request.json();
  const product = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data,
    include: { ingredients: true }
  });
  return NextResponse.json(product);
}

// Eliminar producto por ID (DELETE /api/products/[id])
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ message: 'Product deleted' });
}
