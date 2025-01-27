import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request) {
  const { productId, quantityProduced, quantityDefective } = await request.json();

  if (!productId || quantityProduced == null || quantityDefective == null) {
    return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 });
  }

  try {
    const stock = await prisma.productStock.create({
      data: {
        productId,
        quantityProduced,
        quantityDefective,
      },
    });

    return NextResponse.json(stock, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stockEntries = await prisma.productStock.findMany({
      include: {
        product: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(stockEntries);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/db"; // Asegúrate de que este sea el path correcto de tu instancia de Prisma

// export async function POST(request: Request) {
//   try {
//     const { productName, quantityProduced, quantityDefective, waste } = await request.json();

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

//     // Creamos el registro de stock
//     const newStock = await prisma.productStock.create({
//       data: {
//         productId: product.id,
//         quantityProduced,
//         quantityDefective,
//         waste,
//       },
//     });

//     return NextResponse.json(newStock, { status: 201 });
//   } catch (error) {
//     console.error("Error creating product stock:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const stocks = await prisma.productStock.findMany({
//       include: {
//         product: {
//           select: { name: true },
//         },
//       },
//     });

//     return NextResponse.json(stocks);
//   } catch (error) {
//     console.error("Error fetching product stocks:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/db";

// export async function GET() {
//   try {
//     const stocks = await prisma.productStock.findMany({
//       include: {
//         product: true, // Incluye información del producto relacionado
//       },
//     });
//     return NextResponse.json(stocks);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al obtener los registros" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { productName, quantityProduced, quantityDefective, waste } = body;

//     // Buscar el producto por nombre
//     const product = await prisma.product.findUnique({
//       where: { name: productName },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
//     }

//     // Calcular la cantidad disponible
//     const quantityAvailable = quantityProduced - quantityDefective - waste;

//     // Crear registro de stock
//     const newStock = await prisma.productStock.create({
//       data: {
//         productId: product.id,
//         quantityProduced,
//         quantityDefective,
//         waste,
//         quantityAvailable,
//       },
//     });

//     return NextResponse.json(newStock, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al crear el registro" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import prisma  from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { productName, quantityProduced, quantityDefective, waste } = body;

//     // Buscar el producto por nombre
//     const product = await prisma.product.findUnique({
//       where: { name: productName },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
//     }

//     // Calcular cantidad disponible
//     const quantityAvailable = quantityProduced - quantityDefective - waste;

//     // Crear registro de stock
//     const newStock = await prisma.productStock.create({
//       data: {
//         productId: product.id,
//         quantityProduced,
//         quantityDefective,
//         waste,
//         quantityAvailable,
//       },
//     });

//     return NextResponse.json(newStock, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// // Crear entrada de stock diario
// export async function POST(request) {
//   try {
//     const { productId, quantityProduced, quantityDefective, waste } = await request.json();

//     if (!productId || quantityProduced == null || quantityDefective == null || waste == null) {
//       return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
//     }

//     const productStock = await prisma.productStock.create({
//       data: {
//         productId,
//         quantityProduced,
//         quantityDefective,
//         quantityAvailable: quantityProduced - quantityDefective,
//         waste,
//       },
//     });

//     return NextResponse.json(productStock, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al crear el stock' }, { status: 500 });
//   }
// }

// // Obtener todas las entradas de stock
// export async function GET() {
//   try {
//     const productStocks = await prisma.productStock.findMany();
//     return NextResponse.json(productStocks, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al obtener el stock' }, { status: 500 });
//   }
// }
