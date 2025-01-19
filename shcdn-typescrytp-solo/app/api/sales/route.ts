import prisma from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Registrar una venta (POST /api/sales)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const sales = await prisma.sale.findMany({
      where: {
        ...(clientId ? { clientId: Number(clientId) } : {}),
        ...(startDate && endDate
          ? {
              date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {}),
      },
      include: {
        client: true,
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(sales);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener las ventas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { clientId, products } = await request.json();

  try {
    // Calcular el monto total de la venta
    let totalAmount = 0;

    for (const product of products) {
      const productData = await prisma.product.findUnique({ where: { id: product.productId } });
      if (!productData) throw new Error("Producto no encontrado");

      totalAmount += product.quantity * productData.pricePerPortion;
    }

    // Registrar la venta
    const sale = await prisma.sale.create({
      data: {
        clientId,
        totalAmount,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            totalPrice: product.quantity * product.pricePerPortion,
          })),
        },
      },
    });

    // Reducir el stock de los productos vendidos
    for (const product of products) {
      await prisma.productStock.update({
        where: { productId: product.productId },
        data: { stock: { decrement: product.quantity } },
      });
    }

    return NextResponse.json(sale);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar la venta" }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const sales = await prisma.sale.findMany({
//       include: {
//         client: true,
//         products: { include: { product: true } },
//       },
//       orderBy: { date: "desc" },
//     });
//     return NextResponse.json(sales);
//   } catch (error) {
//     return NextResponse.json({ error: "Error al obtener las ventas" }, { status: 500 });
//   }
// }
// export async function POST(request: Request) {
//   try {
//     const { clientId, products, paymentMethod } = await request.json();

//     // Calcular el monto total de la venta
//     const totalAmount = products.reduce(
//       (sum: number, product: { quantity: number; pricePerPortion: number }) =>
//         sum + product.quantity * product.pricePerPortion,
//       0
//     );

//     // Crear la venta
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         totalAmount,
//         paymentMethod,
//         products: {
//           create: products.map((product: { productId: number; quantity: number; totalPrice: number }) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.totalPrice,
//           })),
//         },
//       },
//     });

//     // Actualizar el stock de cada producto vendido
//     for (const product of products) {
//       const stock = await prisma.productStock.findUnique({
//         where: { productId: product.productId },
//       });

//       if (!stock || stock.stock < product.quantity) {
//         return NextResponse.json(
//           { error: `Stock insuficiente para el producto con ID ${product.productId}` },
//           { status: 400 }
//         );
//       }

//       await prisma.productStock.update({
//         where: { productId: product.productId },
//         data: { stock: stock.stock - product.quantity },
//       });

//       // Registrar en el historial de movimientos
//       await prisma.productStockLog.create({
//         data: {
//           productId: product.productId,
//           type: "SALE",
//           quantity: -product.quantity,
//           comment: `Venta ID: ${sale.id}`,
//         },
//       });
//     }

//     return NextResponse.json(sale);
//   } catch (error) {
//     return NextResponse.json({ error: "Error al registrar la venta" }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const { clientId, products, paymentMethod } = await request.json();

//     // Validar los datos obligatorios
//     if (!clientId || !products || products.length === 0 || !paymentMethod) {
//       return NextResponse.json(
//         { error: "Se requieren clientId, products y paymentMethod." },
//         { status: 400 }
//       );
//     }

//     // Validar que el cliente exista
//     const client = await prisma.client.findUnique({ where: { id: clientId } });
//     if (!client) {
//       return NextResponse.json({ error: "Cliente no encontrado." }, { status: 404 });
//     }

//     let totalAmount = 0;
//     const productDetails = [];

//     for (const { productId, quantity } of products) {
//       // Validar producto y cantidad
//       if (!productId || quantity <= 0) {
//         return NextResponse.json(
//           { error: "Cada producto debe tener productId y una cantidad válida." },
//           { status: 400 }
//         );
//       }

//       // Buscar el producto en la base de datos
//       const product = await prisma.product.findUnique({ where: { id: productId } });

//       if (!product) {
//         return NextResponse.json(
//           { error: `Producto con ID ${productId} no encontrado.` },
//           { status: 404 }
//         );
//       }

//       // Calcular el precio total para el producto
//       const productTotalPrice = product.pricePerPortion * quantity;
//       totalAmount += productTotalPrice;

//       // Añadir el detalle del producto
//       productDetails.push({
//         productId,
//         quantity,
//         totalPrice: productTotalPrice,
//       });

//       // Reducir el stock del producto
//       await prisma.productStock.update({
//         where: { productId },
//         data: { stock: { decrement: quantity } },
//       });
//     }

//     // Crear el registro de la venta
//     const sale = await prisma.order.create({
//       data: {
//         clientId,
//         totalAmount,
//         paymentMethod,
//         products: {
//           create: productDetails.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.totalPrice,
//           })),
//         },
//       },
//       include: {
//         products: true,
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Venta registrada exitosamente.",
//         sale,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al registrar la venta." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function GET() {
//   const sales = await prisma.sale.findMany({
//     include: { products: { include: { product: true } }, client: true },
//   });
//   return NextResponse.json(sales);
// }

// export async function POST(request: Request) {
//   const { clientId, products, totalAmount, paymentMethod } = await request.json();

//   const sale = await prisma.sale.create({
//     data: {
//       clientId,
//       totalAmount,
//       paymentMethod,
//       products: {
//         create: products.map((p: { productId: number; quantity: number; totalPrice: number }) => ({
//           productId: p.productId,
//           quantity: p.quantity,
//           totalPrice: p.totalPrice,
//         })),
//       },
//     },
//   });

//   // Actualiza el stock de los productos vendidos
//   for (const p of products) {
//     await prisma.productStock.update({
//       where: { productId: p.productId },
//       data: { stock: { decrement: p.quantity } },
//     });
//   }

//   return NextResponse.json(sale);
// }
