import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });

  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const { name, description, price } = await req.json();

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, description, price },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request, { params }: any) {
  const { id } = params;
  await prisma.product.delete({ where: { id: Number(id) } });

  return NextResponse.json({ message: 'Product deleted' });
}
