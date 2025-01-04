import { NextResponse } from "next/server";
import  prisma  from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // Crear nuevo cliente
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
