import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// Leer ingrediente por ID (GET /api/ingredients/[id])
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const ingredient = await prisma.ingredient.findUnique({ where: { id: parseInt(params.id) } });
  return ingredient ? NextResponse.json(ingredient) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

// Actualizar ingrediente por ID (PUT /api/ingredients/[id])
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await request.json();
  const ingredient = await prisma.ingredient.update({ where: { id: parseInt(params.id) }, data });
  return NextResponse.json(ingredient);
}


export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Primero eliminamos las referencias en ProductIngredient
    await prisma.productIngredient.deleteMany({
      where: { ingredientId: parseInt(id) },
    });

    // Luego eliminamos el ingrediente
    await prisma.ingredient.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Ingredient deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
  }
}
// export async function DELETE(request, { params }) {
//   try {
//     const { id } = params;

//     // Primero eliminamos las referencias en ProductIngredient
//     await prisma.productIngredient.deleteMany({
//       where: { ingredientId: parseInt(id) },
//     });

//     // Luego eliminamos el ingrediente
//     await prisma.ingredient.delete({
//       where: { id: parseInt(id) },
//     });

//     return NextResponse.json(null, { status: 204 });
//   } catch (error) {
//     console.error("Error deleting ingredient:", error);
//     return NextResponse.json({ error: 'Error deleting data' }, { status: 500 });
//   }
// }

// // Eliminar ingrediente por ID (DELETE /api/ingredients/[id])
// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   await prisma.ingredient.delete({ where: { id: parseInt(params.id) } });
//   return NextResponse.json({ message: 'Ingredient deleted' });
// }
