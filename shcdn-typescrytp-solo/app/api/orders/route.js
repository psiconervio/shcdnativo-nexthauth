import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Crear un nuevo pedido
export async function POST(request) {
  try {
    const { clientId, paymentMethod, products } = await request.json();

    if (!clientId || !paymentMethod || !products || products.length === 0) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        clientId,
        paymentMethod,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            totalPrice: {
              // Calcula el precio total del producto basado en cantidad * precio unitario
              set: product.quantity * 100, // Ejemplo: reemplaza 100 con el precio real
            },
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el pedido' }, { status: 500 });
  }
}

// Obtener todos los pedidos
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: true,
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los pedidos' }, { status: 500 });
  }
}
