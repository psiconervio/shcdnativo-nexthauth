
// app/api/ingredients/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(ingredient);
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedIngredient = await prisma.ingredient.update({
    where: { id: Number(params.id) },
    data: {
      name: data.name,
      unit: data.unit,
      price: data.price,
      quantity: data.quantity,
    },
  });
  return NextResponse.json(updatedIngredient);
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const ingredientId = Number(params.id);

  try {
    // Eliminar relaciones en la tabla intermedia
    await prisma.productIngredient.deleteMany({
      where: { ingredientId },
    });

    // Eliminar el ingrediente
    const deletedIngredient = await prisma.ingredient.delete({
      where: { id: ingredientId },
    });

    return NextResponse.json(deletedIngredient);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'No se pudo eliminar el ingrediente.' },
      { status: 500 }
    );
  }
}
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const deletedIngredient = await prisma.ingredient.delete({
//     where: { id: Number(params.id) },
//   });
//   return NextResponse.json(deletedIngredient);
// }


// // app/api/ingredients/route.ts

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET() {
//   const ingredients = await prisma.ingredient.findMany();
//   return NextResponse.json(ingredients);
// }

// export async function POST(req: Request) {
//   const data = await req.json();
//   const newIngredient = await prisma.ingredient.create({
//     data: {
//       name: data.name,
//       unit: data.unit,
//       price: data.price,
//       quantity: data.quantity,
//     },
//   });
//   return NextResponse.json(newIngredient);
// }
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const deletedIngredient = await prisma.ingredient.delete({
//     where: { id: Number(params.id) },
//   });
//   return NextResponse.json(deletedIngredient);
// }


// // import { NextRequest, NextResponse } from 'next/server';
// // import prisma from '@/lib/db';

// // interface Params {
// //   params: {
// //     id: string;
// //   };
// // }

// // export async function GET(request: NextRequest, { params }: Params) {
// //   try {
// //     const ingredient = await prisma.ingredient.findUnique({
// //       where: { id: parseInt(params.id) },
// //     });
// //     if (!ingredient) {
// //       return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
// //     }
// //     return NextResponse.json(ingredient);
// //   } catch (error) {
// //     console.error("Error fetching ingredient:", error);
// //     return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
// //   }
// // }

// // export async function PUT(request: NextRequest, { params }: Params) {
// //   try {
// //     const data = await request.json();
// //     const ingredient = await prisma.ingredient.update({
// //       where: { id: parseInt(params.id) },
// //       data,
// //     });
// //     return NextResponse.json(ingredient);
// //   } catch (error) {
// //     console.error("Error updating ingredient:", error);
// //     return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
// //   }
// // }

// // export async function DELETE(request: NextRequest, { params }: Params) {
// //   try {
// //     await prisma.ingredient.delete({
// //       where: { id: parseInt(params.id) },
// //     });
// //     return NextResponse.json({ message: 'Ingredient deleted successfully' });
// //   } catch (error) {
// //     console.error("Error deleting ingredient:", error);
// //     return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
// //   }
// // }

// // // // src/app/api/ingredients/[id]/route.js
// // // import { NextResponse } from 'next/server';
// // // import  prisma  from '@/lib/db';

// // // export default async function GET(request, { params }) {
// // //   try {
// // //     const ingredient = await prisma.ingredient.findUnique({
// // //       where: { id: parseInt(params.id) },
// // //     });
// // //     if (!ingredient) {
// // //       return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
// // //     }
// // //     return NextResponse.json(ingredient);
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
// // //   }
// // // }

// // // export default async function PUT(request, { params }) {
// // //   try {
// // //     const data = await request.json();
// // //     const ingredient = await prisma.ingredient.update({
// // //       where: { id: parseInt(params.id) },
// // //       data,
// // //     });
// // //     return NextResponse.json(ingredient);
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
// // //   }
// // // }

// // // export default async function DELETE(request, { params }) {
// // //   try {
// // //     await prisma.ingredient.delete({
// // //       where: { id: parseInt(params.id) },
// // //     });
// // //     return NextResponse.json({ message: 'Ingredient deleted successfully' });
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
// // //   }
// // // }