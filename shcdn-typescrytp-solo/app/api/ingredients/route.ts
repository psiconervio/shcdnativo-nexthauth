// app/api/ingredients/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  const ingredients = await prisma.ingredient.findMany();
  return NextResponse.json(ingredients);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newIngredient = await prisma.ingredient.create({
    data: {
      name: data.name,
      unit: data.unit,
      price: data.price,
      quantity: data.quantity,
    },
  });
  return NextResponse.json(newIngredient);
}
export async function DELETE(req: Request, { params }: { params: { ingredientId: string } }) {
  const deletedIngredient = await prisma.ingredient.delete({
    where: { id: Number(params.ingredientId) },
  });
  return NextResponse.json(deletedIngredient);
}

// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET() {
//   try {
//     const ingredients = await prisma.ingredient.findMany();
//     return NextResponse.json(ingredients);
//   } catch (error) {
//     console.error("Error fetching ingredients:", error);
//     return NextResponse.json({ error: 'Error fetching ingredients' }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const ingredient = await prisma.ingredient.create({ data });
//     return NextResponse.json(ingredient);
//   } catch (error) {
//     console.error("Error creating ingredient:", error);
//     return NextResponse.json({ error: 'Error creating ingredient' }, { status: 500 });
//   }
// }

// // // src/app/api/ingredients/route.js
// // import { NextResponse } from 'next/server';
// // import  prisma  from '@/lib/db';

// // export async function GET() {
// //   try {
// //     const ingredients = await prisma.ingredient.findMany();
// //     return NextResponse.json(ingredients);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Error fetching ingredients' }, { status: 500 });
// //   }
// // }

// // export async function POST(request) {
// //   try {
// //     const data = await request.json();
// //     const ingredient = await prisma.ingredient.create({ data });
// //     return NextResponse.json(ingredient);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Error creating ingredient' }, { status: 500 });
// //   }
// // }