// app/api/ingredients/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, unit, price, quantity } = await req.json();
  
  const ingredient = await prisma.ingredient.create({
    data: { name, unit, price, quantity },
  });

  return NextResponse.json(ingredient, { status: 201 });
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, unit, price, quantity } = await req.json();

  const updatedIngredient = await prisma.ingredient.update({
    where: { id: parseInt(params.id) },
    data: { name, unit, price, quantity },
  });

  return NextResponse.json(updatedIngredient, { status: 200 });
}


export async function GET() {
  const ingredients = await prisma.ingredient.findMany();
  return NextResponse.json(ingredients, { status: 200 });
}