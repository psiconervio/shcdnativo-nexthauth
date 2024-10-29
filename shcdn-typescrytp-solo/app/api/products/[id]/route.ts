// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, ingredients } = await req.json();

  try {
    // Actualiza el producto
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        ingredients: {
          deleteMany: {}, // Elimina todas las relaciones de ingredientes actuales
          create: ingredients.map((ingredient: { id: number; quantity: number }) => ({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
          })),
        },
      },
      include: { ingredients: { include: { ingredient: true } } },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({ message: "Error al eliminar el producto" }, { status: 500 });
  }
}