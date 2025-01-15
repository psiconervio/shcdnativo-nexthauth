import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: parseInt(params.id) },
    include: { sales: true },
  });
  return NextResponse.json(client);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const updatedClient = await prisma.client.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(updatedClient);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.client.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Client deleted successfully" });
}

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET(_, { params }) {
//   const { id } = params;

//   try {
//     const client = await prisma.client.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!client) {
//       return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
//     }

//     return NextResponse.json(client);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(_, { params }) {
//   const { id } = params;

//   try {
//     await prisma.client.delete({
//       where: { id: parseInt(id) },
//     });

//     return NextResponse.json({ message: 'Cliente eliminado' });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
