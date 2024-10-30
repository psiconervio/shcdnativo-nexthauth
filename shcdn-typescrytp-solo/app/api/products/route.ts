import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Listar productos (GET /api/products)
export async function GET() {
  const products = await prisma.product.findMany({
    include: { ingredients: { include: { ingredient: true } } }
  });
  return NextResponse.json(products);
}

// Crear producto (POST /api/products)
export async function POST(request: NextRequest) {
  const { name, portionSize, portionsPerBatch, margin, tax, ingredients } = await request.json();

  const product = await prisma.product.create({
    data: {
      name,
      portionSize,
      portionsPerBatch,
      margin,
      tax,
      ingredients: {
        create: ingredients.map((ing: { ingredientId: number, quantity: number }) => ({
          ingredient: { connect: { id: ing.ingredientId } },
          quantity: ing.quantity
        }))
      }
    },
    include: { ingredients: true }
  });

  return NextResponse.json(product);
}
