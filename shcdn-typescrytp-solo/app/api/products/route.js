// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { ingredients: true },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Validar los datos recibidos
    if (!data.name || !data.ingredients || !Array.isArray(data.ingredients)) {
      throw new Error('Datos requeridos faltantes o incorrectos');
    }

    // Validar cada ingrediente
    for (const ingredient of data.ingredients) {
      if (!ingredient.ingredientId || ingredient.quantity === undefined) {
        throw new Error('Datos de ingrediente faltantes o incorrectos');
      }
    }

    // Crear el producto con los ingredientes asociados
    const product = await prisma.product.create({
      data: {
        name: data.name,
        ingredients: {
          create: data.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
          })),
        },
      },
      include: { ingredients: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creando producto:", error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
