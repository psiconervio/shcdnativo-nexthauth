import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: {
          select: { name: true },
        },
        products: {
          include: {
            product: { select: { name: true } },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Pedido eliminado' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// // Obtener un pedido por ID
// export async function GET(request, { params }) {
//   const { id } = params;

//   try {
//     const order = await prisma.order.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         products: true,
//       },
//     });

//     if (!order) {
//       return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
//     }

//     return NextResponse.json(order, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al obtener el pedido' }, { status: 500 });
//   }
// }

// // Eliminar un pedido por ID
// export async function DELETE(request, { params }) {
//   const { id } = params;

//   try {
//     await prisma.order.delete({
//       where: { id: parseInt(id) },
//     });

//     return NextResponse.json({ message: 'Pedido eliminado con éxito' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al eliminar el pedido' }, { status: 500 });
//   }
// }
