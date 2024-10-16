// src/app/api/inventory/adjust/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { ingredientId, quantity, type } = await request.json();
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: ingredientId },
    });

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    const newQuantity = type === 'increase' 
      ? ingredient.quantity + quantity 
      : ingredient.quantity - quantity;

    const updatedIngredient = await prisma.ingredient.update({
      where: { id: ingredientId },
      data: { quantity: newQuantity },
    });

    return NextResponse.json(updatedIngredient);
  } catch (error) {
    return NextResponse.json({ error: 'Error adjusting inventory' }, { status: 500 });
  }
}