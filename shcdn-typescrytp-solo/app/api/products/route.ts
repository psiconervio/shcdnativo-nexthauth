// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET: Obtener todos los productos
export async function GET() {
  const products = await prisma.product.findMany({
    include: { ingredients: true },
  });
  return NextResponse.json(products);
}

// POST: Crear un nuevo producto
export async function POST(req: NextRequest) {
  const { name, stock, featured, ingredients } = await req.json();
  const product = await prisma.product.create({
    data: {
      name,
      stock,
      featured,
      ingredients: {
        create: ingredients.map((ingredient: any) => ({
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
        })),
      },
    },
  });
  return NextResponse.json(product);
}
