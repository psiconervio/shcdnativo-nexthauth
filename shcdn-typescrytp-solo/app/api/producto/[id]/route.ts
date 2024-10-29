import prisma from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  const producto = await prisma.producto.findUnique({
    where: { id: parseInt(id) },
    include: { ingredientes: { include: { materiaPrima: true } } },
  });
  return new Response(JSON.stringify(producto), { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { nombre, tipo, ingredientes } = await request.json();
  const productoActualizado = await prisma.producto.update({
    where: { id: parseInt(id) },
    data: {
      nombre,
      tipo,
      ingredientes: {
        deleteMany: {},  // Elimina ingredientes previos para actualizar
        create: ingredientes.map(ing => ({
          cantidad: ing.cantidad,
          materiaPrimaId: ing.materiaPrimaId,
        })),
      },
    },
  });
  return new Response(JSON.stringify(productoActualizado), { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await prisma.producto.delete({ where: { id: parseInt(id) } });
  return new Response(null, { status: 204 });
}
