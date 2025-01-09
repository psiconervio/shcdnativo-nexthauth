import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request) {
  const { name, email, phone } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
  }

  try {
    const client = await prisma.client.create({
      data: { name, email, phone },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import  prisma  from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, phone } = body;

//     // Crear nuevo cliente
//     const newClient = await prisma.client.create({
//       data: {
//         name,
//         email,
//         phone,
//       },
//     });

//     return NextResponse.json(newClient, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
//   }
// }
