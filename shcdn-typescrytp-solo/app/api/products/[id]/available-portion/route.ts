import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  if (!product) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  // Calcula la cantidad máxima de porciones que se pueden hacer
  const portions = product.ingredients.map(({ ingredient, quantity }) => {
    return Math.floor(ingredient.stock / quantity);  // Divide stock disponible por cantidad requerida
  });

  const maxPortions = Math.min(...portions);  // Selecciona la cantidad mínima posible

  return NextResponse.json({ maxPortions });
}
