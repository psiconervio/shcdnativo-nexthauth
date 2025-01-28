import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { nombre, monto, fecha, descripcion, type, recurrence } = await request.json();

    // Validación básica
    if (!nombre || typeof nombre !== "string" || nombre.length > 100) {
      return NextResponse.json(
        { error: "El nombre es obligatorio y debe tener máximo 100 caracteres" },
        { status: 400 }
      );
    }

    if (!monto || typeof monto !== "number" || monto <= 0) {
      return NextResponse.json(
        { error: "El monto debe ser un número positivo válido" },
        { status: 400 }
      );
    }

    if (!type || (type !== "GASTOUNICO" && type !== "GASTOMENSUAL")) {
      return NextResponse.json(
        { error: "El tipo de gasto debe ser GASTOUNICO o GASTOMENSUAL" },
        { status: 400 }
      );
    }

    if (type === "GASTOMENSUAL" && !recurrence) {
      return NextResponse.json(
        { error: "La recurrencia es obligatoria para gastos mensuales" },
        { status: 400 }
      );
    }

    // Fecha actual si no se envía
    const parsedDate = fecha ? new Date(fecha) : new Date();

    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "La fecha proporcionada no es válida" },
        { status: 400 }
      );
    }

    // Crear el gasto en la base de datos
    const expense = await prisma.expense.create({
      data: {
        nombre,
        monto,
        fecha: parsedDate,
        descripcion: descripcion || null,
        type,
        recurrence: type === "GASTOMENSUAL" ? recurrence : null,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error("Error al procesar el gasto:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const filters: any = {};

    // Filtro por tipo
    if (type) {
      filters.type = type;
    }

    // Filtro por rango de fechas
    if (startDate || endDate) {
      filters.fecha = {  // Cambiar 'date' por 'fecha'
        ...(startDate ? { gte: new Date(startDate) } : {}),
        ...(endDate ? { lte: new Date(endDate) } : {}),
      };
    }

    // Si no hay filtros, obtenemos todos los gastos
    const expenses = await prisma.expense.findMany({
      where: Object.keys(filters).length > 0 ? filters : undefined,
      orderBy: { fecha: "desc" },  // Cambiar 'date' por 'fecha'
    });

    return NextResponse.json(expenses, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los gastos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const type = searchParams.get("type");
//     const startDate = searchParams.get("startDate");
//     const endDate = searchParams.get("endDate");

//     const filters: any = {};

//     // Filtro por tipo
//     if (type) {
//       filters.type = type;
//     }

//     // Filtro por rango de fechas
//     if (startDate || endDate) {
//       filters.date = {  // Asegúrate de que el nombre del campo sea correcto
//         ...(startDate ? { gte: new Date(startDate) } : {}),
//         ...(endDate ? { lte: new Date(endDate) } : {}),
//       };
//     }

//     // Si no hay filtros, obtenemos todos los gastos
//     const expenses = await prisma.expense.findMany({
//       where: Object.keys(filters).length > 0 ? filters : undefined,
//       orderBy: { date: "desc" },  // Cambia esto si el campo se llama diferente
//     });

//     return NextResponse.json(expenses, { status: 200 });
//   } catch (error) {
//     console.error("Error al obtener los gastos:", error);
//     return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
//   }
// }

//version solo con filtros
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const type = searchParams.get("type");
//     const startDate = searchParams.get("startDate");
//     const endDate = searchParams.get("endDate");

//     const filters: any = {};

//     // Filtro por tipo
//     if (type) {
//       filters.type = type;
//     }

//     // Filtro por rango de fechas
//     if (startDate || endDate) {
//       filters.fecha = {
//         ...(startDate ? { gte: new Date(startDate) } : {}),
//         ...(endDate ? { lte: new Date(endDate) } : {}),
//       };
//     }

//     // Obtener los gastos filtrados
//     const expenses = await prisma.expense.findMany({
//       where: filters,
//       orderBy: { fecha: "desc" },
//     });

//     return NextResponse.json(expenses, { status: 200 });
//   } catch (error) {
//     console.error("Error al obtener los gastos:", error);
//     return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function POST(request: Request) {
//   try {
//     const { name, amount, type, recurrence } = await request.json();

//     // Validar campos requeridos
//     if (!name || typeof name !== "string") {
//       return NextResponse.json({ error: "El nombre es obligatorio y debe ser una cadena" }, { status: 400 });
//     }

//     if (!amount || typeof amount !== "number" || amount <= 0) {
//       return NextResponse.json({ error: "El monto es obligatorio y debe ser un número positivo" }, { status: 400 });
//     }

//     if (!type || (type !== "GASTOUNICO" && type !== "GASTOMENSUAL")) {
//       return NextResponse.json({ error: "El tipo de gasto no es válido" }, { status: 400 });
//     }

//     if (type === "GASTOMENSUAL" && (!recurrence || typeof recurrence !== "string")) {
//       return NextResponse.json(
//         { error: "La recurrencia es obligatoria para gastos mensuales y debe ser una cadena" },
//         { status: 400 }
//       );
//     }

//     // Obtener la fecha y hora actual en la zona horaria de Argentina
//     const argentinaTime = new Date().toLocaleString("en-US", {
//       timeZone: "America/Argentina/Buenos_Aires",
//     });
//     const date = new Date(argentinaTime);

//     // Validar que la fecha sea válida
//     if (isNaN(date.getTime())) {
//       return NextResponse.json({ error: "Error al generar la fecha" }, { status: 500 });
//     }

//     // Crear el gasto en la base de datos
//     const expense = await prisma.expense.create({
//       data: {
//         name,
//         amount,
//         type,
//         date, // Usamos la fecha generada automáticamente
//         recurrence: type === "GASTOMENSUAL" ? recurrence : null,
//       },
//     });

//     return NextResponse.json(expense, { status: 201 });
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
//   }
// }

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const type = searchParams.get("type"); // Ej. "GASTOUNICO" o "GASTOMENSUAL"
//   const startDate = searchParams.get("startDate");
//   const endDate = searchParams.get("endDate");

//   try {
//     const expenses = await prisma.expense.findMany({
//       where: {
//         ...(type ? { type } : {}),
//         ...(startDate && endDate
//           ? { date: { gte: new Date(startDate), lte: new Date(endDate) } }
//           : {}),
//       },
//       orderBy: {
//         date: "desc",
//       },
//     });

//     return NextResponse.json(expenses);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al obtener los gastos" }, { status: 500 });
//   }
// }