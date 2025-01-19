import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// export async function GET() {
//   const stock = await prisma.productStock.findMany();
//   return NextResponse.json(stock);
// }
export async function GET() {
  try {
    const stock = await prisma.productStock.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener el stock" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { productId, quantity, type, comment } = await request.json();

  // Validar que el producto exista
  const productStock = await prisma.productStock.findUnique({
    where: { productId },
  });

  if (!productStock) {
    return NextResponse.json({ error: "Producto no encontrado en stock." }, { status: 404 });
  }

  // Registrar el movimiento en el historial (ProductStockLog)
  await prisma.productStockLog.create({
    data: {
      productId,
      type,
      quantity,
      comment,
    },
  });

  // Calcular el nuevo stock total
  const updatedStock = productStock.stock + quantity;

  // Actualizar el stock total en la tabla ProductStock
  const updatedProductStock = await prisma.productStock.update({
    where: { productId },
    data: { stock: updatedStock },
  });

  return NextResponse.json(updatedProductStock);
}

// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const productId = searchParams.get("productId");

//   if (!productId) {
//     return NextResponse.json(
//       { error: "Se requiere el parámetro productId." },
//       { status: 400 }
//     );
//   }

//   try {
//     const stockRecord = await prisma.productStock.findUnique({
//       where: { productId: parseInt(productId) },
//     });

//     if (!stockRecord) {
//       return NextResponse.json(
//         { error: "No se encontró un registro de stock para el producto." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(stockRecord, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al obtener el stock actual del producto." },
//       { status: 500 }
//     );
//   }
// }

// // import prisma from "@/lib/db";
// // import { NextResponse } from "next/server";

// // export async function GET(request) {
// //   const { searchParams } = new URL(request.url);
// //   const productId = searchParams.get("productId");

// //   if (!productId) {
// //     return NextResponse.json(
// //       { error: "Se requiere el parámetro productId." },
// //       { status: 400 }
// //     );
// //   }

// //   try {
// //     const stockRecord = await prisma.productStock.findUnique({
// //       where: { productId: parseInt(productId) },
// //     });

// //     if (!stockRecord) {
// //       return NextResponse.json(
// //         { error: "No se encontró un registro de stock para el producto." },
// //         { status: 404 }
// //       );
// //     }

// //     return NextResponse.json(stockRecord, { status: 200 });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Error al obtener el stock actual del producto." },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // import prisma from "@/lib/db";
// // // import { NextResponse } from "next/server";

// // // /**
// // //  * Obtener el stock actual de todos los productos o de uno específico.
// // //  */
// // // export async function GET(request) {
// // //   const { searchParams } = new URL(request.url);
// // //   const productId = searchParams.get("productId");

// // //   try {
// // //     if (productId) {
// // //       // Obtener el stock de un producto específico
// // //       const stock = await prisma.productStock.findUnique({
// // //         where: { productId: parseInt(productId) },
// // //       });

// // //       if (!stock) {
// // //         return NextResponse.json(
// // //           { error: "Producto no encontrado o sin stock." },
// // //           { status: 404 }
// // //         );
// // //       }

// // //       return NextResponse.json(stock, { status: 200 });
// // //     }

// // //     // Obtener el stock de todos los productos
// // //     const allStock = await prisma.productStock.findMany({
// // //       include: {
// // //         product: { select: { name: true } }, // Incluye el nombre del producto
// // //       },
// // //     });

// // //     return NextResponse.json(allStock, { status: 200 });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "Error al obtener el stock." },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // /**
// // //  * Crear o actualizar el stock de un producto específico.
// // //  */
// // // export async function PUT(request) {
// // //   try {
// // //     const { productId, stock } = await request.json();

// // //     if (!productId || stock === undefined) {
// // //       return NextResponse.json(
// // //         { error: "Se requieren productId y stock." },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Crear o actualizar el stock
// // //     const stockUpdate = await prisma.productStock.upsert({
// // //       where: { productId },
// // //       create: { productId, stock },
// // //       update: { stock },
// // //     });

// // //     return NextResponse.json(
// // //       { message: "Stock actualizado exitosamente.", stockUpdate },
// // //       { status: 200 }
// // //     );
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "Error al actualizar el stock." },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
