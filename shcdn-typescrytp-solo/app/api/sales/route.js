import prisma from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Registrar una venta (POST /api/sales)
 */
export async function POST(request) {
  try {
    const { clientId, products, paymentMethod } = await request.json();

    // Validar los datos obligatorios
    if (!clientId || !products || products.length === 0 || !paymentMethod) {
      return NextResponse.json(
        { error: "Se requieren clientId, products y paymentMethod." },
        { status: 400 }
      );
    }

    // Validar que el cliente exista
    const client = await prisma.client.findUnique({ where: { id: clientId } });
    if (!client) {
      return NextResponse.json({ error: "Cliente no encontrado." }, { status: 404 });
    }

    let totalAmount = 0;
    const productDetails = [];

    for (const { productId, quantity } of products) {
      // Validar producto y cantidad
      if (!productId || quantity <= 0) {
        return NextResponse.json(
          { error: "Cada producto debe tener productId y una cantidad válida." },
          { status: 400 }
        );
      }

      // Buscar el producto en la base de datos
      const product = await prisma.product.findUnique({ where: { id: productId } });

      if (!product) {
        return NextResponse.json(
          { error: `Producto con ID ${productId} no encontrado.` },
          { status: 404 }
        );
      }

      // Calcular el precio total para el producto
      const productTotalPrice = product.pricePerPortion * quantity;
      totalAmount += productTotalPrice;

      // Añadir el detalle del producto
      productDetails.push({
        productId,
        quantity,
        totalPrice: productTotalPrice,
      });

      // Reducir el stock del producto
      await prisma.productStock.update({
        where: { productId },
        data: { stock: { decrement: quantity } },
      });
    }

    // Crear el registro de la venta
    const sale = await prisma.order.create({
      data: {
        clientId,
        totalAmount,
        paymentMethod,
        products: {
          create: productDetails.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            totalPrice: product.totalPrice,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(
      {
        message: "Venta registrada exitosamente.",
        sale,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al registrar la venta." },
      { status: 500 }
    );
  }
}

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
