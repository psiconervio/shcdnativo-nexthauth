import prisma from '@/lib/db';


export async function GET() {
  const materiasPrimas = await prisma.materiaPrima.findMany();
  return new Response(JSON.stringify(materiasPrimas), { status: 200 });
}

export async function POST(request) {
  const { nombre, unidad, costoUnit } = await request.json();
  const nuevaMateria = await prisma.materiaPrima.create({
    data: { nombre, unidad, costoUnit },
  });
  return new Response(JSON.stringify(nuevaMateria), { status: 201 });
}
