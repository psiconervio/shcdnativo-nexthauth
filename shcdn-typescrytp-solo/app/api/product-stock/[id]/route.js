import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const stockEntry = await prisma.productStock.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: {
          select: { name: true },
        },
      },
    });

    if (!stockEntry) {
      return NextResponse.json({ error: 'Registro de stock no encontrado' }, { status: 404 });
    }

    return NextResponse.json(stockEntry);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await prisma.productStock.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Registro de stock eliminado' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/db"; // Asegúrate de que este sea el path correcto de tu instancia de Prisma

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { productName, quantityProduced, quantityDefective, waste } =
//       await request.json();

//     // Buscamos el producto por nombre
//     const product = await prisma.product.findUnique({
//       where: { name: productName },
//     });

//     if (!product) {
//       return NextResponse.json(
//         { error: "Product not found" },
//         { status: 404 }
//       );
//     }

//     const updatedStock = await prisma.productStock.update({
//       where: { id: Number(params.id) },
//       data: {
//         productId: product.id,
//         quantityProduced,
//         quantityDefective,
//         waste,
//       },
//     });

//     return NextResponse.json(updatedStock);
//   } catch (error) {
//     console.error("Error updating product stock:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   _request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const deletedStock = await prisma.productStock.delete({
//       where: { id: Number(params.id) },
//     });

//     return NextResponse.json(deletedStock);
//   } catch (error) {
//     console.error("Error deleting product stock:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // import { NextResponse } from "next/server";
// // import  prisma  from "@/lib/db";

// // export async function GET(req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const stock = await prisma.productStock.findUnique({
// //       where: { id: Number(params.id) },
// //       include: {
// //         product: true, // Incluye información del producto relacionado
// //       },
// //     });

// //     if (!stock) {
// //       return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
// //     }

// //     return NextResponse.json(stock);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Error al obtener el registro" }, { status: 500 });
// //   }
// // }

// // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const body = await req.json();
// //     const { quantityProduced, quantityDefective, waste } = body;

// //     // Calcular la nueva cantidad disponible
// //     const quantityAvailable = quantityProduced - quantityDefective - waste;

// //     const updatedStock = await prisma.productStock.update({
// //       where: { id: Number(params.id) },
// //       data: {
// //         quantityProduced,
// //         quantityDefective,
// //         waste,
// //         quantityAvailable,
// //       },
// //     });

// //     return NextResponse.json(updatedStock);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Error al actualizar el registro" }, { status: 500 });
// //   }
// // }

// // export async function DELETE(req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     await prisma.productStock.delete({
// //       where: { id: Number(params.id) },
// //     });

// //     return NextResponse.json({ message: "Registro eliminado correctamente" });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Error al eliminar el registro" }, { status: 500 });
// //   }
// // }
