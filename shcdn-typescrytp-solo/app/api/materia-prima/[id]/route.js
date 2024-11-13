import prisma from '@/lib/db';

// Actualizar stock de materia prima (PATCH /api/materia-prima/[id])
export async function PATCH(request, { params }) {
  const { id } = params;
  const { cantidad } = await request.json();

  try {
    const materiaPrima = await prisma.materiaPrima.update({
      where: { id: parseInt(id) },
      data: { stock: { increment: cantidad } }, // Incrementa o reduce el stock
    });
    return new Response(JSON.stringify(materiaPrima), { status: 200 });
  } catch (error) {
    console.error("Error updating stock of materia prima:", error);
    return new Response(JSON.stringify({ error: "Error updating stock" }), { status: 500 });
  }
}

// import prisma from '@/lib/db';

// export async function GET(request, { params }) {
//   const { id } = params;
//   const materia = await prisma.materiaPrima.findUnique({
//     where: { id: parseInt(id) },
//   });
//   return new Response(JSON.stringify(materia), { status: 200 });
// }

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const { nombre, unidad, costoUnit } = await request.json();
//   const materiaActualizada = await prisma.materiaPrima.update({
//     where: { id: parseInt(id) },
//     data: { nombre, unidad, costoUnit },
//   });
//   return new Response(JSON.stringify(materiaActualizada), { status: 200 });
// }

// export async function DELETE(request, { params }) {
//   const { id } = params;
//   await prisma.materiaPrima.delete({ where: { id: parseInt(id) } });
//   return new Response(null, { status: 204 });
// }
