
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { name, amount, date, type, recurrence } = await request.json();
  const { id } = params;

  try {
    // Validar tipo de gasto
    if (type && type !== "GASTOUNICO" && type !== "GASTOMENSUAL") {
      return NextResponse.json({ error: "El tipo de gasto no es válido" }, { status: 400 });
    }

    // Validar recurrencia solo para gastos mensuales
    if (type === "GASTOMENSUAL" && !recurrence) {
      return NextResponse.json(
        { error: "La recurrencia es obligatoria para gastos mensuales" },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(amount && { amount }),
        ...(date && { date: new Date(date) }),
        ...(type && { type }),
        ...(recurrence && { recurrence: type === "GASTOMENSUAL" ? recurrence : null }),
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al actualizar el gasto" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.expense.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Gasto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar el gasto" }, { status: 500 });
  }
}
