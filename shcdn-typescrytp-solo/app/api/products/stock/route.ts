import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const stock = await prisma.productStock.findMany();
  return NextResponse.json(stock);
}

export async function POST(request: Request) {
  try {
    const { productId, stock } = await request.json();

    // Verificar si ya existe un registro de stock para este producto
    const existingStock = await prisma.productStock.findUnique({
      where: { productId },
    });

    let updatedStock;

    if (existingStock) {
      // Si existe, actualizamos el stock
      updatedStock = await prisma.productStock.update({
        where: { productId },
        data: { stock },
      });
    } else {
      // Si no existe, creamos un nuevo registro
      updatedStock = await prisma.productStock.create({
        data: { productId, stock },
      });
    }

    return NextResponse.json(updatedStock);
  } catch (error) {
    console.error("Error en POST /api/products/stock", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
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
