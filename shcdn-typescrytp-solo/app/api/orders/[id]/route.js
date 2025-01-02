import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener un pedido por ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener el pedido' }, { status: 500 });
  }
}

// Eliminar un pedido por ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Pedido eliminado con éxito' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar el pedido' }, { status: 500 });
  }
}
