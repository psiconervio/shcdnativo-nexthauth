import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Definir tipos para la entrada
interface IngredientData {
  ingredientId: number;
  quantity: number;
}

interface ProductData {
  name: string;
  portions: number;
  tax: number;
  profitPercentage: number;
  ingredients: IngredientData[];
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los productos.' }, { status: 500 });
  }
}

async function getPricePerUnit(ingredientId: number): Promise<number> {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id: ingredientId },
    select: { price: true },
  });
  return ingredient?.price || 0;
}

export async function POST(req: Request) {
  try {
    // Validar datos de entrada
    const data: ProductData = await req.json();

    if (!data.name || !data.portions || !data.tax || !data.profitPercentage || !data.ingredients) {
      return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
    }

    let totalIngredientsCost = 0;

    // Usa un ciclo for...of para manejar las promesas de forma más sencilla
    for (const ingredient of data.ingredients) {
      const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
      totalIngredientsCost += ingredient.quantity * pricePerUnit;
    }

    const costPerPortion = totalIngredientsCost / data.portions;

    // Calcular profitAmount como el porcentaje de profitPercentage aplicado a costPerPortion
    const profitAmount = costPerPortion * (data.profitPercentage / 100);

    // Agregar profitAmount al precio final
    const finalPrice = (totalIngredientsCost * (1 + data.tax / 100)) + (profitAmount * data.portions);

    // Calcular pricePerPortion (precio por porción final con ganancia e impuestos incluidos)
    const pricePerPortion = finalPrice / data.portions;

    //precio unidad sin impuestos 
    const preciosImpuestos = totalIngredientsCost

    // Crear el nuevo producto
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        portions: data.portions,
        costPerPortion: costPerPortion,
        //precio unidad sin impuestos
        priceWithoutTax: preciosImpuestos,
        tax: data.tax,
        finalPrice: finalPrice,
        roundedPrice: Math.round(finalPrice),
        profitPercentage: data.profitPercentage,
        profitAmount: profitAmount,
        pricePerPortion: pricePerPortion,  // Nuevo campo añadido
        ingredients: {
          create: await Promise.all(data.ingredients.map(async (ingredient) => {
            const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
            return {
              quantity: ingredient.quantity,
              pricePerUnit: pricePerUnit,
              finalPrice: ingredient.quantity * pricePerUnit,
              ingredient: {
                connect: { id: ingredient.ingredientId },
              },
            };
          })),
        },
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ocurrió un error procesando los datos.' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// // Definir tipos para la entrada
// interface IngredientData {
//   ingredientId: number;
//   quantity: number;
// }

// interface ProductData {
//   name: string;
//   portions: number;
//   tax: number;
//   profitPercentage: number;
//   ingredients: IngredientData[];
// }

// export async function GET() {
//   try {
//     const products = await prisma.product.findMany({
//       include: {
//         ingredients: {
//           include: {
//             ingredient: true,
//           },
//         },
//       },
//     });
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Error al obtener los productos.' }, { status: 500 });
//   }
// }

// async function getPricePerUnit(ingredientId: number): Promise<number> {
//   const ingredient = await prisma.ingredient.findUnique({
//     where: { id: ingredientId },
//     select: { price: true },
//   });
//   return ingredient?.price || 0;
// }

// export async function POST(req: Request) {
//   try {
//     // Validar datos de entrada
//     const data: ProductData = await req.json();

//     if (!data.name || !data.portions || !data.tax || !data.profitPercentage || !data.ingredients) {
//       return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
//     }

//     let totalIngredientsCost = 0;

//     // Usa un ciclo for...of para manejar las promesas de forma más sencilla
//     for (const ingredient of data.ingredients) {
//       const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
//       totalIngredientsCost += ingredient.quantity * pricePerUnit;
//     }

//     const costPerPortion = totalIngredientsCost / data.portions;

//     // Calcular profitAmount como el porcentaje de profitPercentage aplicado a costPerPortion
//     const profitAmount = costPerPortion * (data.profitPercentage / 100);

//     // Agregar profitAmount al precio final
//     const finalPrice = (totalIngredientsCost * (1 + data.tax / 100)) + (profitAmount * data.portions);

//     // Crear el nuevo producto
//     const newProduct = await prisma.product.create({
//       data: {
//         name: data.name,
//         portions: data.portions,
//         costPerPortion: costPerPortion,
//         priceWithoutTax: totalIngredientsCost,
//         tax: data.tax,
//         finalPrice: finalPrice,
//         roundedPrice: Math.round(finalPrice),
//         profitPercentage: data.profitPercentage,
//         profitAmount: profitAmount,
//         ingredients: {
//           create: await Promise.all(data.ingredients.map(async (ingredient) => {
//             const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
//             return {
//               quantity: ingredient.quantity,
//               pricePerUnit: pricePerUnit,
//               finalPrice: ingredient.quantity * pricePerUnit,
//               ingredient: {
//                 connect: { id: ingredient.ingredientId },
//               },
//             };
//           })),
//         },
//       },
//     });

//     return NextResponse.json(newProduct);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Ocurrió un error procesando los datos.' }, { status: 500 });
//   }
// }

// // import { NextResponse } from 'next/server';
// // import prisma from '@/lib/db';

// // // Definir tipos para la entrada
// // interface IngredientData {
// //   ingredientId: number;
// //   quantity: number;
// // }

// // interface ProductData {
// //   name: string;
// //   portions: number;
// //   tax: number;
// //   profitPercentage: number;
// //   ingredients: IngredientData[];
// // }

// // export async function GET() {
// //   try {
// //     const products = await prisma.product.findMany({
// //       include: {
// //         ingredients: {
// //           include: {
// //             ingredient: true,
// //           },
// //         },
// //       },
// //     });
// //     return NextResponse.json(products);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: 'Error al obtener los productos.' }, { status: 500 });
// //   }
// // }

// // async function getPricePerUnit(ingredientId: number): Promise<number> {
// //   const ingredient = await prisma.ingredient.findUnique({
// //     where: { id: ingredientId },
// //     select: { price: true },
// //   });
// //   return ingredient?.price || 0;
// // }

// // export async function POST(req: Request) {
// //   try {
// //     // Validar datos de entrada
// //     const data: ProductData = await req.json();

// //     if (!data.name || !data.portions || !data.tax || !data.profitPercentage || !data.ingredients) {
// //       return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
// //     }

// //     let totalIngredientsCost = 0;

// //     // Usa un ciclo for...of para manejar las promesas de forma más sencilla
// //     for (const ingredient of data.ingredients) {
// //       const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
// //       totalIngredientsCost += ingredient.quantity * pricePerUnit;
// //     }

// //     const finalPrice = totalIngredientsCost * (1 + data.tax / 100);
// //     const costPerPortion = totalIngredientsCost / data.portions;

// //     // Calcular profitAmount como el porcentaje de profitPercentage aplicado a costPerPortion
// //     const profitAmount = costPerPortion * (data.profitPercentage / 100);

// //     // Crear el nuevo producto
// //     const newProduct = await prisma.product.create({
// //       data: {
// //         name: data.name,
// //         portions: data.portions,
// //         costPerPortion: costPerPortion,
// //         priceWithoutTax: totalIngredientsCost,
// //         tax: data.tax,
// //         finalPrice: finalPrice,
// //         roundedPrice: Math.round(finalPrice),
// //         profitPercentage: data.profitPercentage,
// //         profitAmount: profitAmount,
// //         ingredients: {
// //           create: await Promise.all(data.ingredients.map(async (ingredient) => {
// //             const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
// //             return {
// //               quantity: ingredient.quantity,
// //               pricePerUnit: pricePerUnit,
// //               finalPrice: ingredient.quantity * pricePerUnit,
// //               ingredient: {
// //                 connect: { id: ingredient.ingredientId },
// //               },
// //             };
// //           })),
// //         },
// //       },
// //     });

// //     return NextResponse.json(newProduct);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: 'Ocurrió un error procesando los datos.' }, { status: 500 });
// //   }
// // }

// // // app/api/products/route.ts

// // // eslint-disable-next-line @typescript-eslint/no-explicit-any

// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/db';

// // // export async function GET() {
// // //   const products = await prisma.product.findMany({
// // //     include: {
// // //       ingredients: {
// // //         include: {
// // //           ingredient: true,
// // //         },
// // //       },
// // //     },
// // //   });
// // //   return NextResponse.json(products);
// // // }

// // // export async function POST(req: Request) {
// // //   const data = await req.json();

// // //   async function getPricePerUnit(ingredientId: number): Promise<number> {
// // //     const ingredient = await prisma.ingredient.findUnique({
// // //       where: { id: ingredientId },
// // //       select: { price: true },
// // //     });
// // //     return ingredient?.price || 0;
// // //   }

// // //   const totalIngredientsCost = await data.ingredients.reduce(async (accPromise: Promise<number>, ingredient: any) => {
// // //     const acc = await accPromise;
// // //     const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
// // //     return acc + (ingredient.quantity * pricePerUnit);
// // //   }, Promise.resolve(0));

// // //   const finalPrice = totalIngredientsCost * (1 + data.tax / 100);
// // //   const costPerPortion = totalIngredientsCost / data.portions;

// // //   // Calcular profitAmount como el porcentaje de profitPercentage aplicado a costPerPortion
// // //   const profitAmount = costPerPortion * (data.profitPercentage / 100);

// // //   const newProduct = await prisma.product.create({
// // //     data: {
// // //       name: data.name,
// // //       portions: data.portions,
// // //       costPerPortion: costPerPortion,
// // //       priceWithoutTax: totalIngredientsCost,
// // //       tax: data.tax,
// // //       finalPrice: finalPrice,
// // //       roundedPrice: Math.round(finalPrice),
// // //       profitPercentage: data.profitPercentage,
// // //       profitAmount: profitAmount,
// // //       ingredients: {
// // //         create: await Promise.all(data.ingredients.map(async (ingredient: any) => {
// // //           const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
// // //           return {
// // //             quantity: ingredient.quantity,
// // //             pricePerUnit: pricePerUnit,
// // //             finalPrice: ingredient.quantity * pricePerUnit,
// // //             ingredient: {
// // //               connect: { id: ingredient.ingredientId },
// // //             },
// // //           };
// // //         })),
// // //       },
// // //     },
// // //   });

// // //   return NextResponse.json(newProduct);
// // // }

// // //CODIGO ANDANDO PERFECTO, LO UNICO QUE NO TIENE ES LOS MARGENES DE GANACIA
// // // // app/api/products/route.ts

// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/db';

// // // export async function GET() {
// // //   const products = await prisma.product.findMany({
// // //     include: {
// // //       ingredients: {
// // //         include: {
// // //           ingredient: true,
// // //         },
// // //       },
// // //     },
// // //   });
// // //   return NextResponse.json(products);
// // // }

// // // export async function POST(req: Request) {
// // //   const data = await req.json();

// // //   async function getPricePerUnit(ingredientId: number): Promise<number> {
// // //     const ingredient = await prisma.ingredient.findUnique({
// // //       where: { id: ingredientId },
// // //       select: { price: true }, // Usa el campo correcto
// // //     });
// // //     return ingredient?.price || 0;
// // //   }

// // //   const totalIngredientsCost = await data.ingredients.reduce(async (accPromise: Promise<number>, ingredient: any) => {
// // //     const acc = await accPromise;
// // //     const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
// // //     return acc + (ingredient.quantity * pricePerUnit);
// // //   }, Promise.resolve(0));

// // //   const finalPrice = totalIngredientsCost * (1 + data.tax / 100);
// // //   const costPerPortion = totalIngredientsCost / data.portions;

// // //   const newProduct = await prisma.product.create({
// // //     data: {
// // //       name: data.name,
// // //       portions: data.portions,
// // //       costPerPortion: costPerPortion,
// // //       priceWithoutTax: totalIngredientsCost,
// // //       tax: data.tax,
// // //       finalPrice: finalPrice,
// // //       roundedPrice: Math.round(finalPrice),
// // //       ingredients: {
// // //         create: await Promise.all(data.ingredients.map(async (ingredient: any) => {
// // //           const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
// // //           return {
// // //             quantity: ingredient.quantity,
// // //             pricePerUnit: pricePerUnit,
// // //             finalPrice: ingredient.quantity * pricePerUnit,
// // //             ingredient: {
// // //               connect: { id: ingredient.ingredientId },
// // //             },
// // //           };
// // //         })),
// // //       },
// // //     },
// // //   });

// // //   return NextResponse.json(newProduct);
// // // }

// // // // app/api/products/route.ts

// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/db';

// // // export async function GET() {
// // //   const products = await prisma.product.findMany({
// // //     include: {
// // //       ingredients: {
// // //         include: {
// // //           ingredient: true,
// // //         },
// // //       },
// // //     },
// // //   });
// // //   return NextResponse.json(products);
// // // }

// // // export async function POST(req: Request) {
// // //   const data = await req.json();
  
// // //   // Calcula el precio sin impuestos sumando el costo total de cada ingrediente
// // //   const totalIngredientsCost = data.ingredients.reduce((acc: number, ingredient: any) => {
// // //     return acc + (ingredient.quantity * ingredient.pricePerUnit);
// // //   }, 0);

// // //   // Calcula el precio final con impuestos
// // //   const finalPrice = totalIngredientsCost * (1 + data.tax / 100);

// // //   // Costo por porción basado en el precio sin impuestos y las porciones
// // //   const costPerPortion = totalIngredientsCost / data.portions;

// // //   // Crea el producto en la base de datos
// // //   const newProduct = await prisma.product.create({
// // //     data: {
// // //       name: data.name,
// // //       portions: data.portions,
// // //       costPerPortion: costPerPortion,
// // //       priceWithoutTax: totalIngredientsCost,
// // //       tax: data.tax,
// // //       finalPrice: finalPrice,
// // //       roundedPrice: Math.round(finalPrice), // Redondea el precio final
// // //       ingredients: {
// // //         create: data.ingredients.map((ingredient: any) => ({
// // //           quantity: ingredient.quantity,
// // //           pricePerUnit: ingredient.pricePerUnit,
// // //           finalPrice: ingredient.quantity * ingredient.pricePerUnit,
// // //           ingredient: {
// // //             connect: { id: ingredient.ingredientId },
// // //           },
// // //         })),
// // //       },
// // //     },
// // //   });

// // //   return NextResponse.json(newProduct);
// // // }


// // // // app/api/products/route.ts

// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/db';

// // // export async function GET() {
// // //   const products = await prisma.product.findMany({
// // //     include: {
// // //       ingredients: {
// // //         include: {
// // //           ingredient: true,
// // //         },
// // //       },
// // //     },
// // //   });
// // //   return NextResponse.json(products);
// // // }

// // // export async function POST(req: Request) {
// // //   const data = await req.json();

// // //   // Calcular el precio sin impuestos (suma de finalPrice de cada ingrediente)
// // //   const priceWithoutTax = data.ingredients.reduce((total, ingredient) => {
// // //     const finalPrice = ingredient.quantity * ingredient.pricePerUnit;
// // //     return total + finalPrice;
// // //   }, 0);

// // //   // Crear el producto con el cálculo de `priceWithoutTax`
// // //   const newProduct = await prisma.product.create({
// // //     data: {
// // //       name: data.name,
// // //       portions: data.portions,
// // //       costPerPortion: data.costPerPortion,
// // //       priceWithoutTax: priceWithoutTax, // Utiliza el precio calculado
// // //       tax: data.tax,
// // //       finalPrice: priceWithoutTax * (1 + data.tax / 100), // Precio con impuestos
// // //       roundedPrice: Math.round(priceWithoutTax * (1 + data.tax / 100)), // Precio redondeado
// // //       ingredients: {
// // //         create: data.ingredients.map((ingredient) => ({
// // //           quantity: ingredient.quantity,
// // //           pricePerUnit: ingredient.pricePerUnit,
// // //           finalPrice: ingredient.quantity * ingredient.pricePerUnit,
// // //           ingredient: {
// // //             connect: { id: ingredient.ingredientId },
// // //           },
// // //         })),
// // //       },
// // //     },
// // //   });

// // //   return NextResponse.json(newProduct);
// // // }

// // // // app/api/products/route.ts
// // // //codigo funcional andando legacy
// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/db';

// // // export async function GET() {
// // //   const products = await prisma.product.findMany({
// // //     include: {
// // //       ingredients: {
// // //         include: {
// // //           ingredient: true,
// // //         },
// // //       },
// // //     },
// // //   });
// // //   return NextResponse.json(products);
// // // }

// // // export async function POST(req: Request) {
// // //   const data = await req.json();
// // //   const newProduct = await prisma.product.create({
// // //     data: {
// // //       name: data.name,
// // //       portions: data.portions,
// // //       costPerPortion: data.costPerPortion,
// // //       //priceWithoutTax: Precio sin impuestos.
// // //       priceWithoutTax: data.priceWithoutTax,
// // //       // tax: Impuesto aplicado.
// // //       tax: data.tax,
// // //       //finalPrice
// // //       // finalPrice: data.finalPrice,
// // //       finalPrice: data.priceWithoutTax + data.tax,
// // //       //roundedPrice
// // //       roundedPrice: data.roundedPrice,
// // //       ingredients: {
// // //         create: data.ingredients.map((ingredient) => ({
// // //           quantity: ingredient.quantity,
// // //           pricePerUnit: ingredient.pricePerUnit,
// // //           finalPrice: ingredient.finalPrice,
// // //           ingredient: {
// // //             connect: { id: ingredient.ingredientId },
// // //           },
// // //         })),
// // //       },
// // //     },
// // //   });
// // //   return NextResponse.json(newProduct);
// // // }

// // // // src/app/api/products/route.js
// // // import { NextResponse } from 'next/server';
// // // import  prisma  from '@/lib/db';

// // // export async function GET() {
// // //   try {
// // //     const products = await prisma.product.findMany({
// // //       include: { ingredients: true },
// // //     });
// // //     return NextResponse.json(products);
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
// // //   }
// // // }

// // // export async function POST(request) {
// // //   try {
// // //     const data = await request.json();

// // //     // Validar los datos recibidos
// // //     if (!data.name || !data.ingredients || !Array.isArray(data.ingredients)) {
// // //       throw new Error('Datos requeridos faltantes o incorrectos');
// // //     }

// // //     // Validar cada ingrediente
// // //     for (const ingredient of data.ingredients) {
// // //       if (!ingredient.ingredientId || ingredient.quantity === undefined) {
// // //         throw new Error('Datos de ingrediente faltantes o incorrectos');
// // //       }
// // //     }

// // //     // Crear el producto con los ingredientes asociados
// // //     const product = await prisma.product.create({
// // //       data: {
// // //         name: data.name,
// // //         ingredients: {
// // //           create: data.ingredients.map(ingredient => ({
// // //             ingredientId: ingredient.ingredientId,
// // //             quantity: ingredient.quantity,
// // //             pricePerUnit :ingredient.pricePerUnit,    // Precio por unidad
// // //             finalPrice :ingredient.quantity * ingredient.pricePerUnit   // Precio final (cantidad * precio por unidad)
// // //           })),
// // //         },
// // //       },
// // //       include: { ingredients: true },
// // //     });

// // //     return NextResponse.json(product, { status: 201 });
// // //   } catch (error) {
// // //     console.error("Error creando producto:", error);
// // //     return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
// // //   }
// // // }
