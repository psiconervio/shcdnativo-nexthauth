// app/api/ingredients/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET: Obtener un ingrediente por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ingredient = await prisma.ingredient.findUnique({ where: { id: parseInt(params.id) } });
  return NextResponse.json(ingredient);
}

// PUT: Actualizar un ingrediente por ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { name, unit, price, quantity } = await req.json();
  const updatedIngredient = await prisma.ingredient.update({
    where: { id: parseInt(params.id) },
    data: { name, unit, price, quantity },
  });
  return NextResponse.json(updatedIngredient);
}

// DELETE: Eliminar un ingrediente por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.ingredient.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ message: 'Ingrediente eliminado' });
}
