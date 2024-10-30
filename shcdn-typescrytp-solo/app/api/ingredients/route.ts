import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Listar ingredientes (GET /api/ingredients)
export async function GET() {
  const ingredients = await prisma.ingredient.findMany();
  return NextResponse.json(ingredients);
}

// Crear ingrediente (POST /api/ingredients)
export async function POST(request: NextRequest) {
  const data = await request.json();
  const ingredient = await prisma.ingredient.create({ data });
  return NextResponse.json(ingredient);
}
