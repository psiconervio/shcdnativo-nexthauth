import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const materiasPrimas = await prisma.materiaPrima.findMany();
    return NextResponse.json(materiasPrimas, { status: 200 });
  } catch (error) {
    console.error("Error fetching materiasPrimas:", error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nombre, unidad, costoUnit } = await request.json();
    const nuevaMateria = await prisma.materiaPrima.create({
      data: { nombre, unidad, costoUnit },
    });
    return NextResponse.json(nuevaMateria, { status: 201 });
  } catch (error) {
    console.error("Error creating materiaPrima:", error);
    return NextResponse.json({ error: 'Error creating data' }, { status: 500 });
  }
}

// import prisma from '@/lib/db';


// export async function GET() {
//   const materiasPrimas = await prisma.materiaPrima.findMany();
//   return new Response(JSON.stringify(materiasPrimas), { status: 200 });
// }

// export async function POST(request) {
//   const { nombre, unidad, costoUnit } = await request.json();
//   const nuevaMateria = await prisma.materiaPrima.create({
//     data: { nombre, unidad, costoUnit },
//   });
//   return new Response(JSON.stringify(nuevaMateria), { status: 201 });
// }
