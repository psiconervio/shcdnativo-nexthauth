import prisma from '@/lib/db';

export async function GET(request) {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        ingredientes: {
          include: {
            materiaPrima: true, // Incluye los detalles de cada materia prima
          },
        },
      },
    });
    return new Response(JSON.stringify(productos), { status: 200 });
  } catch (error) {
    console.error("Error fetching productos:", error);
    return new Response(JSON.stringify({ error: "Error fetching productos" }), { status: 500 });
  }
}


export async function POST(request) {
  const { nombre, tipo, ingredientes } = await request.json();

  // Verificar que todos los materiaPrimaId existen
  for (const ing of ingredientes) {
    const exists = await prisma.materiaPrima.findUnique({
      where: { id: ing.materiaPrimaId },
    });
    if (!exists) {
      return new Response(
        JSON.stringify({ error: `Materia Prima con ID ${ing.materiaPrimaId} no existe` }),
        { status: 400 }
      );
    }
  }

  // Calcular el costo total basado en los ingredientes
  let costoTotal = 0;
  for (const ing of ingredientes) {
    const materiaPrima = await prisma.materiaPrima.findUnique({
      where: { id: ing.materiaPrimaId },
    });
    if (materiaPrima) {
      costoTotal += materiaPrima.costoUnit * ing.cantidad;
    }
  }

  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre,
      tipo,
      costoTotal,
      ingredientes: {
        create: ingredientes.map(ing => ({
          cantidad: ing.cantidad,
          materiaPrimaId: ing.materiaPrimaId,
        })),
      },
    },
  });

  return new Response(JSON.stringify(nuevoProducto), { status: 201 });
}

// import prisma from '@/lib/db';


// export async function POST(request) {
//   const { nombre, tipo, ingredientes } = await request.json();

//   // Calcular el costo total basado en los ingredientes
//   let costoTotal = 0;
//   for (const ing of ingredientes) {
//     const materiaPrima = await prisma.materiaPrima.findUnique({
//       where: { id: ing.materiaPrimaId },
//     });
//     if (materiaPrima) {
//       costoTotal += materiaPrima.costoUnit * ing.cantidad;
//     }
//   }

//   const nuevoProducto = await prisma.producto.create({
//     data: {
//       nombre,
//       tipo,
//       costoTotal,
//       ingredientes: {
//         create: ingredientes.map(ing => ({
//           cantidad: ing.cantidad,
//           materiaPrimaId: ing.materiaPrimaId,
//         })),
//       },
//     },
//   });

//   return new Response(JSON.stringify(nuevoProducto), { status: 201 });
// }

// // import prisma from '@/lib/db';

// export async function GET() {
//   try {
//     const productos = await prisma.producto.findMany({
//       include: { ingredientes: true },
//     });
//     return NextResponse.json(productos, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching productos:", error);
//     return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
//   }
// }

// // export async function POST(request) {
// //   try {
// //     const { nombre, tipo, ingredientes } = await request.json();
// //     const nuevoProducto = await prisma.producto.create({
// //       data: {
// //         nombre,
// //         tipo,
// //         ingredientes: {
// //           create: ingredientes.map(ing => ({
// //             cantidad: ing.cantidad,
// //             materiaPrimaId: ing.materiaPrimaId,
// //           })),
// //         },
// //       },
// //     });
// //     return NextResponse.json(nuevoProducto, { status: 201 });
// //   } catch (error) {
// //     console.error("Error creating producto:", error);
// //     return NextResponse.json({ error: 'Error creating data' }, { status: 500 });
// //   }
// // }

// // // import prisma from '@/lib/db';

// // // export async function GET() {
// // //   const productos = await prisma.producto.findMany({
// // //     include: { ingredientes: true },
// // //   });
// // //   return new Response(JSON.stringify(productos), { status: 200 });
// // // }

// // // export async function POST(request) {
// // //   const { nombre, tipo, ingredientes } = await request.json();
// // //   const nuevoProducto = await prisma.producto.create({
// // //     data: {
// // //       nombre,
// // //       tipo,
// // //       ingredientes: {
// // //         create: ingredientes.map(ing => ({
// // //           cantidad: ing.cantidad,
// // //           materiaPrimaId: ing.materiaPrimaId,
// // //         })),
// // //       },
// // //     },
// // //   });
// // //   return new Response(JSON.stringify(nuevoProducto), { status: 201 });
// // // }
