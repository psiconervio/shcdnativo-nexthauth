import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Crear un nuevo pedido
export async function POST(request) {
  try {
    const { clientId, paymentMethod, products } = await request.json();

    if (!clientId || !paymentMethod || !products || !products.length) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios (clientId, paymentMethod, products)." },
        { status: 400 }
      );
    }

    // Validar cliente
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: "Cliente no encontrado." }, { status: 404 });
    }

    // Calcular totalAmount y preparar productos para el pedido
    let totalAmount = 0;
    const orderProducts = [];

    for (const product of products) {
      const { productId, quantity } = product;

      if (!productId || !quantity) {
        return NextResponse.json(
          { error: "Cada producto debe tener productId y quantity." },
          { status: 400 }
        );
      }

      // Validar producto y obtener precio
      const productData = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!productData) {
        return NextResponse.json(
          { error: `Producto con ID ${productId} no encontrado.` },
          { status: 404 }
        );
      }

      const pricePerPortion = productData.pricePerPortion;
      const productTotalPrice = pricePerPortion * quantity;
      totalAmount += productTotalPrice;

      // Agregar producto al pedido
      orderProducts.push({
        productId,
        quantity,
        totalPrice: productTotalPrice,
      });

      // Reducir el stock disponible
      const stock = await prisma.productStock.findFirst({
        where: { productId },
        orderBy: { date: "desc" },
      });

      if (!stock || stock.quantityAvailable < quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para el producto con ID ${productId}.` },
          { status: 400 }
        );
      }

      await prisma.productStock.update({
        where: { id: stock.id },
        data: { quantityAvailable: stock.quantityAvailable - quantity },
      });
    }

    // Crear el pedido
    const newOrder = await prisma.order.create({
      data: {
        clientId,
        paymentMethod,
        totalAmount,
        products: {
          create: orderProducts,
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al procesar el pedido." }, { status: 500 });
  }
}

// Listar todos los pedidos
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener los pedidos." }, { status: 500 });
  }
}

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // Crear un nuevo pedido
// export async function POST(request) {
//   try {
//     const { clientId, paymentMethod, products } = await request.json();

//     if (!clientId || !paymentMethod || !products || !products.length) {
//       return NextResponse.json(
//         { error: "Todos los campos son obligatorios (clientId, paymentMethod, products)." },
//         { status: 400 }
//       );
//     }

//     // Validar cliente
//     const client = await prisma.client.findUnique({
//       where: { id: clientId },
//     });

//     if (!client) {
//       return NextResponse.json({ error: "Cliente no encontrado." }, { status: 404 });
//     }

//     // Crear pedido y calcular totalAmount
//     let totalAmount = 0;
//     const orderProducts = [];

//     for (const product of products) {
//       const { productId, quantity } = product;

//       if (!productId || !quantity) {
//         return NextResponse.json(
//           { error: "Cada producto debe tener productId y quantity." },
//           { status: 400 }
//         );
//       }

//       // Recuperar el producto y su precio por porción
//       const productData = await prisma.product.findUnique({
//         where: { id: productId },
//       });

//       if (!productData) {
//         return NextResponse.json(
//           { error: `Producto con ID ${productId} no encontrado.` },
//           { status: 404 }
//         );
//       }

//       const pricePerPortion = productData.pricePerPortion;

//       // Calcular el precio total del producto en el pedido
//       const productTotalPrice = pricePerPortion * quantity;
//       totalAmount += productTotalPrice;

//       // Agregar a la lista de productos en el pedido
//       orderProducts.push({
//         productId,
//         quantity,
//         totalPrice: productTotalPrice,
//       });

//       // Reducir el stock disponible en la tabla Stock
//       const stock = await prisma.productStock.findFirst({
//         where: { productId },
//         orderBy: { date: "desc" },
//       });

//       if (!stock || stock.quantityAvailable < quantity) {
//         return NextResponse.json(
//           { error: `Stock insuficiente para el producto con ID ${productId}.` },
//           { status: 400 }
//         );
//       }

//       await prisma.productStock.update({
//         where: { id: stock.id },
//         data: { quantityAvailable: stock.quantityAvailable - quantity },
//       });
//     }

//     // Crear el pedido en la base de datos
//     const newOrder = await prisma.order.create({
//       data: {
//         clientId,
//         paymentMethod,
//         totalAmount,
//         products: {
//           create: orderProducts,
//         },
//       },
//       include: {
//         products: true,
//       },
//     });

//     return NextResponse.json(newOrder, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al procesar el pedido." }, { status: 500 });
//   }
// }

// // Listar todos los pedidos
// export async function GET() {
//   try {
//     const orders = await prisma.order.findMany({
//       include: {
//         client: true,
//         products: {
//           include: {
//             product: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(orders, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al obtener los pedidos." }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function POST(request) {
//   const { clientId, products, paymentMethod } = await request.json();

//   if (!clientId || !products || products.length === 0 || !paymentMethod) {
//     return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 });
//   }

//   try {
//     const order = await prisma.order.create({
//       data: {
//         clientId,
//         paymentMethod,
//         products: {
//           create: products.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.totalPrice,
//           })),
//         },
//         totalAmount: products.reduce((acc, p) => acc + p.totalPrice, 0),
//       },
//     });

//     // Reducir stock disponible
//     for (const product of products) {
//       const currentStock = await prisma.productStock.findFirst({
//         where: { productId: product.productId },
//         orderBy: { date: 'desc' },
//       });

//       if (!currentStock || currentStock.quantityProduced < product.quantity) {
//         throw new Error(`No hay suficiente stock del producto ${product.productId}`);
//       }

//       await prisma.productStock.updateMany({
//         where: { productId: product.productId },
//         data: { quantityProduced: currentStock.quantityProduced - product.quantity },
//       });
//     }

//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const orders = await prisma.order.findMany({
//       include: {
//         client: {
//           select: { name: true },
//         },
//         products: {
//           include: {
//             product: { select: { name: true } },
//           },
//         },
//       },
//     });

//     return NextResponse.json(orders);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // import { NextResponse } from "next/server";
// // import  prisma  from "@/lib/db";

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json();
// //     const { clientName, products, paymentMethod } = body;

// //     // Buscar cliente por nombre
// //     const client = await prisma.client.findUnique({
// //       where: { name: clientName },
// //     });

// //     if (!client) {
// //       return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
// //     }

// //     // Calcular el monto total del pedido
// //     let totalAmount = 0;
// //     const orderProductsData = await Promise.all(
// //       products.map(async (product: { name: string; quantity: number }) => {
// //         const productData = await prisma.product.findUnique({
// //           where: { name: product.name },
// //         });

// //         if (!productData) {
// //           throw new Error(`Producto ${product.name} no encontrado`);
// //         }

// //         const totalPrice = product.quantity * productData.roundedPrice;
// //         totalAmount += totalPrice;

// //         return {
// //           productId: productData.id,
// //           quantity: product.quantity,
// //           totalPrice,
// //         };
// //       })
// //     );

// //     // Crear el pedido
// //     const newOrder = await prisma.order.create({
// //       data: {
// //         clientId: client.id,
// //         paymentMethod,
// //         totalAmount,
// //         products: {
// //           create: orderProductsData,
// //         },
// //       },
// //     });

// //     return NextResponse.json(newOrder, { status: 201 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
// //   }
// // }

// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/db';

// // // // Crear un nuevo pedido
// // // export async function POST(request) {
// // //   try {
// // //     const { clientId, paymentMethod, products } = await request.json();

// // //     if (!clientId || !paymentMethod || !products || products.length === 0) {
// // //       return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
// // //     }

// // //     const order = await prisma.order.create({
// // //       data: {
// // //         clientId,
// // //         paymentMethod,
// // //         products: {
// // //           create: products.map((product) => ({
// // //             productId: product.productId,
// // //             quantity: product.quantity,
// // //             totalPrice: {
// // //               // Calcula el precio total del producto basado en cantidad * precio unitario
// // //               set: product.quantity * 100, // Ejemplo: reemplaza 100 con el precio real
// // //             },
// // //           })),
// // //         },
// // //       },
// // //       include: {
// // //         products: true,
// // //       },
// // //     });

// // //     return NextResponse.json(order, { status: 201 });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json({ error: 'Error al crear el pedido' }, { status: 500 });
// // //   }
// // // }

// // // // Obtener todos los pedidos
// // // export async function GET() {
// // //   try {
// // //     const orders = await prisma.order.findMany({
// // //       include: {
// // //         products: true,
// // //       },
// // //     });

// // //     return NextResponse.json(orders, { status: 200 });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json({ error: 'Error al obtener los pedidos' }, { status: 500 });
// // //   }
// // // }
