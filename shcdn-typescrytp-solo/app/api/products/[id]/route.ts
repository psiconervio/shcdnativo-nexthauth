// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET: Obtener un producto por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { ingredients: true },
  });
  return NextResponse.json(product);
}

// PUT: Actualizar un producto por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { name, stock, featured, ingredients } = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data: {
      name,
      stock,
      featured,
      ingredients: {
        deleteMany: {}, // Elimina ingredientes actuales
        create: ingredients.map((ingredient: any) => ({
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
        })),
      },
    },
  });
  return NextResponse.json(updatedProduct);
}

// DELETE: Eliminar un producto por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ message: 'Producto eliminado' });
}
