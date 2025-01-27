import { NextResponse } from "next/server";
import prisma from "@/lib/db";
/** Registrar una venta (POST /api/sales) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  try {
    const sales = await prisma.sale.findMany({
      where: {
        ...(clientId ? { clientId: Number(clientId) } : {}),
        ...(startDate && endDate
          ? {
              date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {}),
      },
      include: {
        client: true,
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(sales);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener las ventas" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { clientId, paymentMethod, products } = await req.json();

    if (!clientId || !paymentMethod || !products || products.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields or products" },
        { status: 400 }
      );
    }

    // Definir los descuentos según el método de pago
    const discountRates: { [key: string]: number } = {
      EFECTIVO: 0.15, // 15% de descuento
      TRANSFERENCIA: 0.10, // 10% de descuento
      POSNET: 0.05, // 5% de descuento
    };

    // Validar si el método de pago es válido
    const discountRate = discountRates[paymentMethod.toUpperCase()] || 0;

    // Validar stock y calcular el total antes del descuento
    let totalAmount = 0;

    const saleProducts = await Promise.all(
      products.map(async ({ productId, quantity }) => {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new Error(`Product with ID: ${productId} not found`);
        }

        // Verificar disponibilidad en el stock
        const productStock = await prisma.productStock.findUnique({
          where: { productId },
        });

        if (!productStock || productStock.stock < quantity) {
          throw new Error(
            `Insufficient stock for product with ID: ${productId}`
          );
        }

        // Calcular el precio total del producto
        const totalPrice = product.pricePerPortion * quantity;
        totalAmount += totalPrice;

        // Reducir el stock
        await prisma.productStock.update({
          where: { productId },
          data: { stock: productStock.stock - quantity },
        });

        return {
          productId,
          quantity,
          totalPrice,
        };
      })
    );

    // Aplicar el descuento al total de la compra
    const discountAmount = totalAmount * discountRate;
    const finalTotalAmount = totalAmount - discountAmount;

    // Crear la venta
    const sale = await prisma.sale.create({
      data: {
        clientId,
        paymentMethod,
        totalAmount: finalTotalAmount, // Total después del descuento
        products: {
          create: saleProducts,
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(
      {
        sale,
        discountRate,
        discountAmount,
        originalTotalAmount: totalAmount,
        finalTotalAmount,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message || "An error occurred" },
      { status: 500 }
    );
  }
}


//codigo legacy, no aplica descuentos
// export async function POST(req: Request) {
//   try {
//     const { clientId, paymentMethod, products } = await req.json();

//     if (!clientId || !paymentMethod || !products || products.length === 0) {
//       return NextResponse.json(
//         { error: "Missing required fields or products" },
//         { status: 400 }
//       );
//     }

//     // Validate stock and calculate totals
//     let totalAmount = 0;

//     const saleProducts = await Promise.all(
//       products.map(async ({ productId, quantity }) => {
//         const product = await prisma.product.findUnique({
//           where: { id: productId },
//         });

//         if (!product) {
//           throw new Error(`Product with ID: ${productId} not found`);
//         }

//         // Check stock availability
//         const productStock = await prisma.productStock.findUnique({
//           where: { productId },
//         });

//         if (!productStock || productStock.stock < quantity) {
//           throw new Error(
//             `Insufficient stock for product with ID: ${productId}`
//           );
//         }

//         // Calculate total price for the product
//         const totalPrice = product.pricePerPortion * quantity;
//         totalAmount += totalPrice;

//         // Reduce stock
//         await prisma.productStock.update({
//           where: { productId },
//           data: { stock: productStock.stock - quantity },
//         });

//         return {
//           productId,
//           quantity,
//           totalPrice,
//         };
//       })
//     );

//     // Create the sale
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         paymentMethod,
//         totalAmount,
//         products: {
//           create: saleProducts,
//         },
//       },
//       include: {
//         products: true,
//       },
//     });

//     return NextResponse.json(sale, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as any).message || "An error occurred" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { clientId, products, paymentMethod } = body;

//     if (!clientId || !products || products.length === 0 || !paymentMethod) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Calcular el monto total de la venta
//     const totalAmount = products.reduce((sum, product) => sum + product.totalPrice, 0);

//     // Crear la venta y las relaciones con los productos
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         totalAmount,
//         paymentMethod,
//         products: {
//           create: products.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.totalPrice,
//           })),
//         },
//       },
//     });

//     // Actualizar el stock de los productos en la tabla ProductStock
//     for (const product of products) {
//       const productStock = await prisma.productStock.findUnique({
//         where: { productId: product.productId },
//       });

//       if (!productStock || productStock.stock < product.quantity) {
//         return NextResponse.json({
//           error: `Insufficient stock for productId ${product.productId}`,
//         }, { status: 400 });
//       }

//       await prisma.productStock.update({
//         where: { productId: product.productId },
//         data: { stock: productStock.stock - product.quantity },
//       });
//     }

//     return NextResponse.json(sale, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { clientId, paymentMethod, products } = body;

//     // Validación de campos requeridos
//     if (!clientId || !paymentMethod || !products || products.length === 0) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields: clientId, paymentMethod, or products" }),
//         { status: 400 }
//       );
//     }

//     // Validar que el cliente exista
//     const client = await prisma.client.findUnique({ where: { id: clientId } });
//     if (!client) {
//       return new Response(JSON.stringify({ error: "Client not found" }), { status: 404 });
//     }

//     // Calcular el totalAmount y validar productos
//     let totalAmount = 0;

//     const productData = await Promise.all(
//       products.map(async (product) => {
//         const { productId, quantity } = product;

//         // Buscar información del producto
//         const productInfo = await prisma.product.findUnique({
//           where: { id: productId },
//           include: {
//             ingredients: {
//               include: { ingredient: true },
//             },
//           },
//         });

//         if (!productInfo) {
//           throw new Error(`Product with ID ${productId} not found`);
//         }

//         // Calcular el precio total del producto
//         const totalPrice = productInfo.priceWithoutTax * quantity;
//         if (isNaN(totalPrice)) {
//           throw new Error("Invalid totalPrice calculation");
//         }

//         totalAmount += totalPrice;

//         // Reducir el stock de los ingredientes del producto
//         for (const productIngredient of productInfo.ingredients) {
//           const requiredQuantity = productIngredient.quantity * quantity;

//           // Validar si hay suficiente stock
//           if (productIngredient.ingredient.quantity < requiredQuantity) {
//             throw new Error(
//               `Insufficient stock for ingredient ${productIngredient.ingredient.name}`
//             );
//           }

//           // Actualizar el stock del ingrediente
//           await prisma.ingredient.update({
//             where: { id: productIngredient.ingredientId },
//             data: {
//               quantity: {
//                 decrement: requiredQuantity,
//               },
//             },
//           });
//         }

//         return {
//           productId,
//           quantity,
//           totalPrice,
//         };
//       })
//     );

//     // Crear la venta
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         paymentMethod,
//         totalAmount,
//         products: {
//           create: productData, // Relación con los productos vendidos
//         },
//       },
//     });

//     return new Response(JSON.stringify(sale), { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { clientId, paymentMethod, products } = body;

//     // Validación de campos requeridos
//     if (!clientId || !paymentMethod || !products || products.length === 0) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields: clientId, paymentMethod, or products" }),
//         { status: 400 }
//       );
//     }

//     // Validar que el cliente exista
//     const client = await prisma.client.findUnique({ where: { id: clientId } });
//     if (!client) {
//       return new Response(JSON.stringify({ error: "Client not found" }), { status: 404 });
//     }

//     // Calcular el totalAmount y validar productos
//     let totalAmount = 0;

//     const productData = await Promise.all(
//       products.map(async (product) => {
//         const { productId, quantity } = product;

//         // Buscar información del producto
//         const productInfo = await prisma.product.findUnique({ where: { id: productId } });
//         if (!productInfo) {
//           throw new Error(`Product with ID ${productId} not found`);
//         }

//         // Calcular el precio total del producto
//         const totalPrice = productInfo.pricePerPortion * quantity;
//         if (isNaN(totalPrice)) {
//           throw new Error("Invalid totalPrice calculation");
//         }

//         totalAmount += totalPrice;

//         return {
//           productId,
//           quantity,
//           totalPrice,
//         };
//       })
//     );

//     // Crear la venta
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         paymentMethod,
//         totalAmount,
//         products: {
//           create: productData, // Relación con los productos vendidos
//         },
//       },
//     });

//     return new Response(JSON.stringify(sale), { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   const { clientId, products } = await request.json();

//   try {
//     // Calcular el monto total de la venta
//     let totalAmount = 0;

//     for (const product of products) {
//       const productData = await prisma.product.findUnique({ where: { id: product.productId } });
//       if (!productData) throw new Error("Producto no encontrado");

//       totalAmount += product.quantity * productData.pricePerPortion;
//     }

//     // Registrar la venta
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         totalAmount,
//         products: {
//           create: products.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.quantity * product.pricePerPortion,
//           })),
//         },
//       },
//     });

//     // Reducir el stock de los productos vendidos
//     for (const product of products) {
//       await prisma.productStock.update({
//         where: { productId: product.productId },
//         data: { stock: { decrement: product.quantity } },
//       });
//     }

//     return NextResponse.json(sale);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al registrar la venta" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const sales = await prisma.sale.findMany({
//       include: {
//         client: true,
//         products: { include: { product: true } },
//       },
//       orderBy: { date: "desc" },
//     });
//     return NextResponse.json(sales);
//   } catch (error) {
//     return NextResponse.json({ error: "Error al obtener las ventas" }, { status: 500 });
//   }
// }
// export async function POST(request: Request) {
//   try {
//     const { clientId, products, paymentMethod } = await request.json();

//     // Calcular el monto total de la venta
//     const totalAmount = products.reduce(
//       (sum: number, product: { quantity: number; pricePerPortion: number }) =>
//         sum + product.quantity * product.pricePerPortion,
//       0
//     );

//     // Crear la venta
//     const sale = await prisma.sale.create({
//       data: {
//         clientId,
//         totalAmount,
//         paymentMethod,
//         products: {
//           create: products.map((product: { productId: number; quantity: number; totalPrice: number }) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.totalPrice,
//           })),
//         },
//       },
//     });

//     // Actualizar el stock de cada producto vendido
//     for (const product of products) {
//       const stock = await prisma.productStock.findUnique({
//         where: { productId: product.productId },
//       });

//       if (!stock || stock.stock < product.quantity) {
//         return NextResponse.json(
//           { error: `Stock insuficiente para el producto con ID ${product.productId}` },
//           { status: 400 }
//         );
//       }

//       await prisma.productStock.update({
//         where: { productId: product.productId },
//         data: { stock: stock.stock - product.quantity },
//       });

//       // Registrar en el historial de movimientos
//       await prisma.productStockLog.create({
//         data: {
//           productId: product.productId,
//           type: "SALE",
//           quantity: -product.quantity,
//           comment: `Venta ID: ${sale.id}`,
//         },
//       });
//     }

//     return NextResponse.json(sale);
//   } catch (error) {
//     return NextResponse.json({ error: "Error al registrar la venta" }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const { clientId, products, paymentMethod } = await request.json();

//     // Validar los datos obligatorios
//     if (!clientId || !products || products.length === 0 || !paymentMethod) {
//       return NextResponse.json(
//         { error: "Se requieren clientId, products y paymentMethod." },
//         { status: 400 }
//       );
//     }

//     // Validar que el cliente exista
//     const client = await prisma.client.findUnique({ where: { id: clientId } });
//     if (!client) {
//       return NextResponse.json({ error: "Cliente no encontrado." }, { status: 404 });
//     }

//     let totalAmount = 0;
//     const productDetails = [];

//     for (const { productId, quantity } of products) {
//       // Validar producto y cantidad
//       if (!productId || quantity <= 0) {
//         return NextResponse.json(
//           { error: "Cada producto debe tener productId y una cantidad válida." },
//           { status: 400 }
//         );
//       }

//       // Buscar el producto en la base de datos
//       const product = await prisma.product.findUnique({ where: { id: productId } });

//       if (!product) {
//         return NextResponse.json(
//           { error: `Producto con ID ${productId} no encontrado.` },
//           { status: 404 }
//         );
//       }

//       // Calcular el precio total para el producto
//       const productTotalPrice = product.pricePerPortion * quantity;
//       totalAmount += productTotalPrice;

//       // Añadir el detalle del producto
//       productDetails.push({
//         productId,
//         quantity,
//         totalPrice: productTotalPrice,
//       });

//       // Reducir el stock del producto
//       await prisma.productStock.update({
//         where: { productId },
//         data: { stock: { decrement: quantity } },
//       });
//     }

//     // Crear el registro de la venta
//     const sale = await prisma.order.create({
//       data: {
//         clientId,
//         totalAmount,
//         paymentMethod,
//         products: {
//           create: productDetails.map((product) => ({
//             productId: product.productId,
//             quantity: product.quantity,
//             totalPrice: product.totalPrice,
//           })),
//         },
//       },
//       include: {
//         products: true,
//       },
//     });

//     return NextResponse.json(
//       {
//         message: "Venta registrada exitosamente.",
//         sale,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Error al registrar la venta." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function GET() {
//   const sales = await prisma.sale.findMany({
//     include: { products: { include: { product: true } }, client: true },
//   });
//   return NextResponse.json(sales);
// }

// export async function POST(request: Request) {
//   const { clientId, products, totalAmount, paymentMethod } = await request.json();

//   const sale = await prisma.sale.create({
//     data: {
//       clientId,
//       totalAmount,
//       paymentMethod,
//       products: {
//         create: products.map((p: { productId: number; quantity: number; totalPrice: number }) => ({
//           productId: p.productId,
//           quantity: p.quantity,
//           totalPrice: p.totalPrice,
//         })),
//       },
//     },
//   });

//   // Actualiza el stock de los productos vendidos
//   for (const p of products) {
//     await prisma.productStock.update({
//       where: { productId: p.productId },
//       data: { stock: { decrement: p.quantity } },
//     });
//   }

//   return NextResponse.json(sale);
// }
