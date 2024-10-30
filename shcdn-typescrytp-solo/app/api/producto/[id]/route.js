import prisma from '@/lib/db';

// Obtener un producto por ID (GET /api/producto/[id])
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
      include: {
        ingredientes: {
          include: {
            materiaPrima: true, // Incluye los detalles de cada materia prima
          },
        },
      },
    });
    if (!producto) {
      return new Response(JSON.stringify({ error: "Producto not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(producto), { status: 200 });
  } catch (error) {
    console.error("Error fetching producto:", error);
    return new Response(JSON.stringify({ error: "Error fetching producto" }), { status: 500 });
  }
}

// Actualizar un producto por ID (PUT /api/producto/[id])
export async function PUT(request, { params }) {
  const { id } = params;
  const { nombre, tipo, ingredientes } = await request.json();

  try {
    const updatedProducto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        tipo,
        ingredientes: {
          deleteMany: {}, // Borra ingredientes actuales y añade los nuevos
          create: ingredientes.map((ing) => ({
            cantidad: ing.cantidad,
            materiaPrimaId: ing.materiaPrimaId,
          })),
        },
      },
    });
    return new Response(JSON.stringify(updatedProducto), { status: 200 });
  } catch (error) {
    console.error("Error updating producto:", error);
    return new Response(JSON.stringify({ error: "Error updating producto" }), { status: 500 });
  }
}

// Eliminar un producto por ID (DELETE /api/producto/[id])
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    return new Response(JSON.stringify({ message: "Producto deleted" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting producto:", error);
    return new Response(JSON.stringify({ error: "Error deleting producto" }), { status: 500 });
  }
}
