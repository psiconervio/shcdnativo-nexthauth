import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Crear entrada de stock diario
export async function POST(request) {
  try {
    const { productId, quantityProduced, quantityDefective, waste } = await request.json();

    if (!productId || quantityProduced == null || quantityDefective == null || waste == null) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const productStock = await prisma.productStock.create({
      data: {
        productId,
        quantityProduced,
        quantityDefective,
        quantityAvailable: quantityProduced - quantityDefective,
        waste,
      },
    });

    return NextResponse.json(productStock, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el stock' }, { status: 500 });
  }
}

// Obtener todas las entradas de stock
export async function GET() {
  try {
    const productStocks = await prisma.productStock.findMany();
    return NextResponse.json(productStocks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener el stock' }, { status: 500 });
  }
}
