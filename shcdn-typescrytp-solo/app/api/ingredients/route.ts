// app/api/ingredients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET: Obtener todos los ingredientes
export async function GET() {
  const ingredients = await prisma.ingredient.findMany();
  return NextResponse.json(ingredients);
}

// POST: Crear un nuevo ingrediente
export async function POST(req: NextRequest) {
  const { name, unit, price, quantity } = await req.json();
  const ingredient = await prisma.ingredient.create({
    data: { name, unit, price, quantity },
  });
  return NextResponse.json(ingredient);
}
