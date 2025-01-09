import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });

    if (!client) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;

  try {
    await prisma.client.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Cliente eliminado' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
