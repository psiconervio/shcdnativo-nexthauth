// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { ingredients: true },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        ...data,
        ingredients: {
          create: data.ingredients,
        },
      },
      include: { ingredients: true },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
// import prisma from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';

// // Listar productos (GET /api/products)
// export async function GET() {
//   const products = await prisma.product.findMany({
//     include: { ingredients: { include: { ingredient: true } } }
//   });
//   return NextResponse.json(products);
// }

// // Crear producto (POST /api/products)
// export async function POST(request: NextRequest) {
//   const { name, portionSize, portionsPerBatch, margin, tax, ingredients } = await request.json();

//   const product = await prisma.product.create({
//     data: {
//       name,
//       portionSize,
//       portionsPerBatch,
//       margin,
//       tax,
//       ingredients: {
//         create: ingredients.map((ing: { ingredientId: number, quantity: number }) => ({
//           ingredient: { connect: { id: ing.ingredientId } },
//           quantity: ing.quantity
//         }))
//       }
//     },
//     include: { ingredients: true }
//   });

//   return NextResponse.json(product);
// }
