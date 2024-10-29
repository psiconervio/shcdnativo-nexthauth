// src/app/api/ingredients/[id]/route.js
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }
    return NextResponse.json(ingredient);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const ingredient = await prisma.ingredient.update({
      where: { id: parseInt(params.id) },
      data,
    });
    return NextResponse.json(ingredient);
  } catch (error) {
    console.error('Error al actualizar ingrediente:', error);
    return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
  }
}

// export async function DELETE(request, { params }) {
//   try {
//     await prisma.ingredient.delete({
//       where: { id: parseInt(params.id) },
//     });
//     return NextResponse.json({ message: 'Ingredient deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
//   }
// }
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.ingredient.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Ingrediente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
    return NextResponse.json({ message: "Error al eliminar el ingrediente" }, { status: 500 });
  }
}