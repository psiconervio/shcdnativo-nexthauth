import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: { ingredientes: true },
    });
    return NextResponse.json(productos, { status: 200 });
  } catch (error) {
    console.error("Error fetching productos:", error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, tipo, ingredientes } = await request.json();
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        tipo,
        ingredientes: {
          create: ingredientes.map(ing => ({
            cantidad: ing.cantidad,
            materiaPrimaId: ing.materiaPrimaId,
          })),
        },
      },
    });
    return NextResponse.json(nuevoProducto, { status: 201 });
  } catch (error) {
    console.error("Error creating producto:", error);
    return NextResponse.json({ error: 'Error creating data' }, { status: 500 });
  }
}

// import prisma from '@/lib/db';

// export async function GET() {
//   const productos = await prisma.producto.findMany({
//     include: { ingredientes: true },
//   });
//   return new Response(JSON.stringify(productos), { status: 200 });
// }

// export async function POST(request) {
//   const { nombre, tipo, ingredientes } = await request.json();
//   const nuevoProducto = await prisma.producto.create({
//     data: {
//       nombre,
//       tipo,
//       ingredientes: {
//         create: ingredientes.map(ing => ({
//           cantidad: ing.cantidad,
//           materiaPrimaId: ing.materiaPrimaId,
//         })),
//       },
//     },
//   });
//   return new Response(JSON.stringify(nuevoProducto), { status: 201 });
// }
