
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
export async function POST(request: Request) {
  const { name, amount, date, type, recurrence } = await request.json();

  try {
    // Validar datos básicos
    if (!name || !amount || !date || !type) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // Validar tipo de gasto
    if (type !== "GASTOUNICO" && type !== "GASTOMENSUAL") {
      return NextResponse.json({ error: "El tipo de gasto no es válido" }, { status: 400 });
    }

    // Validar recurrencia solo para gastos mensuales
    if (type === "GASTOMENSUAL" && !recurrence) {
      return NextResponse.json(
        { error: "La recurrencia es obligatoria para gastos mensuales" },
        { status: 400 }
      );
    }

    // Crear el gasto
    const expense = await prisma.expense.create({
      data: {
        name,
        amount,
        date: new Date(date),
        type,
        recurrence: type === "GASTOMENSUAL" ? recurrence : null, // Solo para recurrentes
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear el gasto" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // Ej. "GASTOUNICO" o "GASTOMENSUAL"
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        ...(type ? { type } : {}),
        ...(startDate && endDate
          ? { date: { gte: new Date(startDate), lte: new Date(endDate) } }
          : {}),
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener los gastos" }, { status: 500 });
  }
}

  