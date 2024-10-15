import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Datos recibidos:', body); // Para verificar en consola
    return NextResponse.json({
      message: 'Datos recibidos correctamente',
      receivedData: body,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al recibir datos' }, { status: 400 });
  }
}
