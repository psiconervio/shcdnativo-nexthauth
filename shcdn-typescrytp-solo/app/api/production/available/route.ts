// src/app/api/production/available/route.js
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { ingredients: true },
    });

    const ingredients = await prisma.ingredient.findMany();

    const availableProduction = products.map(product => {
      const availablePortions = product.ingredients.map(recipeIngredient => {
        const stockIngredient = ingredients.find(i => i.id === recipeIngredient.ingredientId);
        return Math.floor(stockIngredient.quantity / recipeIngredient.quantity);
      });

      return {
        productId: product.id,
        productName: product.name,
        availablePortions: Math.min(...availablePortions),
      };
    });

    return NextResponse.json(availableProduction);
  } catch (error) {
    return NextResponse.json({ error: 'Error calculating available production' }, { status: 500 });
  }
}