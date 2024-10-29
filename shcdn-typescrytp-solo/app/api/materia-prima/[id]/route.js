import prisma from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  const materia = await prisma.materiaPrima.findUnique({
    where: { id: parseInt(id) },
  });
  return new Response(JSON.stringify(materia), { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { nombre, unidad, costoUnit } = await request.json();
  const materiaActualizada = await prisma.materiaPrima.update({
    where: { id: parseInt(id) },
    data: { nombre, unidad, costoUnit },
  });
  return new Response(JSON.stringify(materiaActualizada), { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await prisma.materiaPrima.delete({ where: { id: parseInt(id) } });
  return new Response(null, { status: 204 });
}
