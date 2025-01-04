import { NextResponse } from "next/server";
import  prisma  from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, products, paymentMethod } = body;

    // Buscar cliente por nombre
    const client = await prisma.client.findUnique({
      where: { name: clientName },
    });

    if (!client) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    // Calcular el monto total del pedido
    let totalAmount = 0;
    const orderProductsData = await Promise.all(
      products.map(async (product: { name: string; quantity: number }) => {
        const productData = await prisma.product.findUnique({
          where: { name: product.name },
        });

        if (!productData) {
          throw new Error(`Producto ${product.name} no encontrado`);
        }

        const totalPrice = product.quantity * productData.roundedPrice;
        totalAmount += totalPrice;

        return {
          productId: productData.id,
          quantity: product.quantity,
          totalPrice,
        };
      })
    );

    // Crear el pedido
    const newOrder = await prisma.order.create({
      data: {
        clientId: client.id,
        paymentMethod,
        totalAmount,
        products: {
          create: orderProductsData,
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// // Crear un nuevo pedido
// export async function POST(request) {
//   try {
//     const { clientId, paymentMethod, products } = await request.json();

//     if (!clientId || !paymentMethod || !products || products.length === 0) {
//       return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
//     }

//     const order = await prisma.order.create({
//       data: {
//         clientId,
//         paymentMethod,
//         products: {
//           create: products.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: {
//               // Calcula el precio total del producto basado en cantidad * precio unitario
//               set: product.quantity * 100, // Ejemplo: reemplaza 100 con el precio real
//             },
//           })),
//         },
//       },
//       include: {
//         products: true,
//       },
//     });

//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al crear el pedido' }, { status: 500 });
//   }
// }

// // Obtener todos los pedidos
// export async function GET() {
//   try {
//     const orders = await prisma.order.findMany({
//       include: {
//         products: true,
//       },
//     });

//     return NextResponse.json(orders, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al obtener los pedidos' }, { status: 500 });
//   }
// }
