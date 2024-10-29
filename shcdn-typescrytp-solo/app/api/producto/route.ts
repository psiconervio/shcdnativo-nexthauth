import prisma from '@/lib/db';

export async function GET() {
  const productos = await prisma.producto.findMany({
    include: { ingredientes: true },
  });
  return new Response(JSON.stringify(productos), { status: 200 });
}

export async function POST(request) {
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
  return new Response(JSON.stringify(nuevoProducto), { status: 201 });
}
