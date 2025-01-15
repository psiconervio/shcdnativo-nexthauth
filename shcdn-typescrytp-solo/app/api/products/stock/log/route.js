import prisma from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Registrar un movimiento de stock.
 */
export async function POST(request) {
  try {
    const { productId, quantity, type, comment } = await request.json();

    if (!productId || !quantity || !type) {
      return NextResponse.json(
        { error: "Se requiere productId, quantity y type." },
        { status: 400 }
      );
    }

    // Validar tipo de movimiento
    if (!["PRODUCED", "DEFECTIVE", "SALE", "ADJUSTMENT"].includes(type)) {
      return NextResponse.json(
        { error: "Tipo inválido: PRODUCED, DEFECTIVE, SALE o ADJUSTMENT." },
        { status: 400 }
      );
    }

    // Validar que el producto tenga un registro en productStock
    const stockRecord = await prisma.productStock.findUnique({
      where: { productId },
    });

    if (!stockRecord) {
      return NextResponse.json(
        { error: "El producto no tiene stock inicializado." },
        { status: 400 }
      );
    }

    // Determinar cambio en el stock
    const stockChange =
      type === "DEFECTIVE" || type === "SALE" ? -Math.abs(quantity) : Math.abs(quantity);

    // Registrar movimiento en el log
    const logEntry = await prisma.productStockLog.create({
      data: {
        productId,
        quantity: stockChange,
        type,
        comment,
      },
    });

    // Actualizar stock asociado
    const stockUpdate = await prisma.productStock.update({
      where: { productId },
      data: {
        stock: { increment: stockChange },
      },
    });

    return NextResponse.json(
      { message: "Movimiento registrado y stock actualizado.", logEntry, stockUpdate },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al registrar el movimiento de stock." },
      { status: 500 }
    );
  }
}

/**
 * Consultar el historial de movimientos de stock para un producto.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!productId) {
    return NextResponse.json(
      { error: "Se requiere el parámetro productId." },
      { status: 400 }
    );
  }

  try {
    const logs = await prisma.productStockLog.findMany({
      where: {
        productId: parseInt(productId),
        createdAt: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los movimientos de stock." },
      { status: 500 }
    );
  }
}

// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// /**
//  * Registrar un movimiento de stock (producción, defectos, ventas, ajustes).
//  */
// export async function POST(request) {
//   try {
//     const { productId, quantity, type, comment } = await request.json();

//     if (!productId || !quantity || !type) {
//       return NextResponse.json(
//         { error: "Se requiere productId, quantity y type." },
//         { status: 400 }
//       );
//     }

//     // Validar tipo de movimiento
//     const validTypes = ["PRODUCED", "DEFECTIVE", "SALE", "ADJUSTMENT"];
//     if (!validTypes.includes(type)) {
//       return NextResponse.json(
//         { error: "Tipo inválido: PRODUCED, DEFECTIVE, SALE o ADJUSTMENT." },
//         { status: 400 }
//       );
//     }

//     // Determinar cambio en el stock
//     const stockChange =
//       type === "DEFECTIVE" || type === "SALE" ? -Math.abs(quantity) : Math.abs(quantity);

//     // Verificar si existe un registro en productStock
//     let stockRecord = await prisma.productStock.findUnique({
//       where: { productId },
//     });

//     if (!stockRecord) {
//       // Si no existe, crearlo con stock inicial de 0
//       stockRecord = await prisma.productStock.create({
//         data: {
//           productId,
//           stock: 0, // Inicializamos en 0
//         },
//       });
//     }

//     // Registrar movimiento en el log
//     const logEntry = await prisma.productStockLog.create({
//       data: {
//         productId,
//         quantity: stockChange,
//         type,
//         comment,
//       },
//     });

//     // Actualizar el stock
//     const stockUpdate = await prisma.productStock.update({
//       where: { productId },
//       data: {
//         stock: { increment: stockChange },
//       },
//     });

//     return NextResponse.json(
//       { message: "Movimiento registrado y stock actualizado.", logEntry, stockUpdate },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al registrar el movimiento de stock." },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * Consultar el historial de movimientos de stock para un producto.
//  */
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const productId = searchParams.get("productId");
//     const startDate = searchParams.get("startDate");
//     const endDate = searchParams.get("endDate");

//     if (!productId) {
//       return NextResponse.json(
//         { error: "Se requiere el parámetro productId." },
//         { status: 400 }
//       );
//     }

//     const logs = await prisma.productStockLog.findMany({
//       where: {
//         productId: parseInt(productId),
//         createdAt: {
//           gte: startDate ? new Date(startDate) : undefined,
//           lte: endDate ? new Date(endDate) : undefined,
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(logs, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al obtener los movimientos de stock." },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * Inicializar registros de stock para todos los productos existentes.
//  */
// export async function initializeStockForExistingProducts() {
//   try {
//     // Obtener todos los productos existentes
//     const products = await prisma.product.findMany();

//     for (const product of products) {
//       // Comprobar si ya existe un registro de stock para este producto
//       const stockRecord = await prisma.productStock.findUnique({
//         where: { productId: product.id },
//       });

//       if (!stockRecord) {
//         // Crear un registro en productStock con stock inicial de 0
//         await prisma.productStock.create({
//           data: {
//             productId: product.id,
//             stock: 0, // Inicializar con 0 stock
//           },
//         });
//         console.log(`Stock inicializado para el producto con ID: ${product.id}`);
//       }
//     }

//     console.log("Stock inicializado para todos los productos existentes.");
//   } catch (error) {
//     console.error("Error al inicializar el stock:", error);
//   }
// }

// // import prisma from "@/lib/db";
// // import { NextResponse } from "next/server";
// // /**
// //  * Registrar un movimiento de stock (producción, defectos, ventas, ajustes).
// //  */
// // export async function POST(request) {
// //     try {
// //       const { productId, quantity, type, comment } = await request.json();
  
// //       if (!productId || !quantity || !type) {
// //         return NextResponse.json(
// //           { error: "Se requiere productId, quantity y type." },
// //           { status: 400 }
// //         );
// //       }
  
// //       // Validar tipo de movimiento
// //       if (!["PRODUCED", "DEFECTIVE", "SALE", "ADJUSTMENT"].includes(type)) {
// //         return NextResponse.json(
// //           { error: "Tipo inválido: PRODUCED, DEFECTIVE, SALE o ADJUSTMENT." },
// //           { status: 400 }
// //         );
// //       }
  
// //       // Determinar cambio en el stock
// //       const stockChange =
// //         type === "DEFECTIVE" || type === "SALE" ? -Math.abs(quantity) : Math.abs(quantity);
  
// //       // Registrar movimiento en el log
// //       const logEntry = await prisma.productStockLog.create({
// //         data: {
// //           productId,
// //           quantity: stockChange,
// //           type,
// //           comment,
// //         },
// //       });
  
// //       // Actualizar stock asociado
// //       const stockUpdate = await prisma.productStock.update({
// //         where: { productId },
// //         data: {
// //           stock: { increment: stockChange },
// //         },
// //       });
  
// //       return NextResponse.json(
// //         { message: "Movimiento registrado y stock actualizado.", logEntry, stockUpdate },
// //         { status: 201 }
// //       );
// //     } catch (error) {
// //       console.error(error);
// //       return NextResponse.json(
// //         { error: "Error al registrar el movimiento de stock." },
// //         { status: 500 }
// //       );
// //     }
// //   }
// //   /**
// //  * Consultar el historial de movimientos de stock para un producto.
// //  */
// // export async function GET(request) {
// //     const { searchParams } = new URL(request.url);
// //     const productId = searchParams.get("productId");
// //     const startDate = searchParams.get("startDate");
// //     const endDate = searchParams.get("endDate");
  
// //     if (!productId) {
// //       return NextResponse.json(
// //         { error: "Se requiere el parámetro productId." },
// //         { status: 400 }
// //       );
// //     }
  
// //     try {
// //       const logs = await prisma.productStockLog.findMany({
// //         where: {
// //           productId: parseInt(productId),
// //           createdAt: {
// //             gte: startDate ? new Date(startDate) : undefined,
// //             lte: endDate ? new Date(endDate) : undefined,
// //           },
// //         },
// //         orderBy: { createdAt: "desc" },
// //       });
  
// //       return NextResponse.json(logs, { status: 200 });
// //     } catch (error) {
// //       console.error(error);
// //       return NextResponse.json(
// //         { error: "Error al obtener los movimientos de stock." },
// //         { status: 500 }
// //       );
// //     }
// //   }
  
  