// app/api/products/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
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
}

export async function POST(req: Request) {
  const data = await req.json();
  
  // Calcula el precio sin impuestos sumando el costo total de cada ingrediente
  const totalIngredientsCost = data.ingredients.reduce((acc: number, ingredient: any) => {
    return acc + (ingredient.quantity * ingredient.pricePerUnit);
  }, 0);

  // Calcula el precio final con impuestos
  const finalPrice = totalIngredientsCost * (1 + data.tax / 100);

  // Costo por porción basado en el precio sin impuestos y las porciones
  const costPerPortion = totalIngredientsCost / data.portions;

  // Crea el producto en la base de datos
  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      portions: data.portions,
      costPerPortion: costPerPortion,
      priceWithoutTax: totalIngredientsCost,
      tax: data.tax,
      finalPrice: finalPrice,
      roundedPrice: Math.round(finalPrice), // Redondea el precio final
      ingredients: {
        create: data.ingredients.map((ingredient: any) => ({
          quantity: ingredient.quantity,
          pricePerUnit: ingredient.pricePerUnit,
          finalPrice: ingredient.quantity * ingredient.pricePerUnit,
          ingredient: {
            connect: { id: ingredient.ingredientId },
          },
        })),
      },
    },
  });

  return NextResponse.json(newProduct);
}


// // app/api/products/route.ts

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET() {
//   const products = await prisma.product.findMany({
//     include: {
//       ingredients: {
//         include: {
//           ingredient: true,
//         },
//       },
//     },
//   });
//   return NextResponse.json(products);
// }

// export async function POST(req: Request) {
//   const data = await req.json();

//   // Calcular el precio sin impuestos (suma de finalPrice de cada ingrediente)
//   const priceWithoutTax = data.ingredients.reduce((total, ingredient) => {
//     const finalPrice = ingredient.quantity * ingredient.pricePerUnit;
//     return total + finalPrice;
//   }, 0);

//   // Crear el producto con el cálculo de `priceWithoutTax`
//   const newProduct = await prisma.product.create({
//     data: {
//       name: data.name,
//       portions: data.portions,
//       costPerPortion: data.costPerPortion,
//       priceWithoutTax: priceWithoutTax, // Utiliza el precio calculado
//       tax: data.tax,
//       finalPrice: priceWithoutTax * (1 + data.tax / 100), // Precio con impuestos
//       roundedPrice: Math.round(priceWithoutTax * (1 + data.tax / 100)), // Precio redondeado
//       ingredients: {
//         create: data.ingredients.map((ingredient) => ({
//           quantity: ingredient.quantity,
//           pricePerUnit: ingredient.pricePerUnit,
//           finalPrice: ingredient.quantity * ingredient.pricePerUnit,
//           ingredient: {
//             connect: { id: ingredient.ingredientId },
//           },
//         })),
//       },
//     },
//   });

//   return NextResponse.json(newProduct);
// }

// // app/api/products/route.ts
// //codigo funcional andando legacy
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET() {
//   const products = await prisma.product.findMany({
//     include: {
//       ingredients: {
//         include: {
//           ingredient: true,
//         },
//       },
//     },
//   });
//   return NextResponse.json(products);
// }

// export async function POST(req: Request) {
//   const data = await req.json();
//   const newProduct = await prisma.product.create({
//     data: {
//       name: data.name,
//       portions: data.portions,
//       costPerPortion: data.costPerPortion,
//       //priceWithoutTax: Precio sin impuestos.
//       priceWithoutTax: data.priceWithoutTax,
//       // tax: Impuesto aplicado.
//       tax: data.tax,
//       //finalPrice
//       // finalPrice: data.finalPrice,
//       finalPrice: data.priceWithoutTax + data.tax,
//       //roundedPrice
//       roundedPrice: data.roundedPrice,
//       ingredients: {
//         create: data.ingredients.map((ingredient) => ({
//           quantity: ingredient.quantity,
//           pricePerUnit: ingredient.pricePerUnit,
//           finalPrice: ingredient.finalPrice,
//           ingredient: {
//             connect: { id: ingredient.ingredientId },
//           },
//         })),
//       },
//     },
//   });
//   return NextResponse.json(newProduct);
// }

// // src/app/api/products/route.js
// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/db';

// export async function GET() {
//   try {
//     const products = await prisma.product.findMany({
//       include: { ingredients: true },
//     });
//     return NextResponse.json(products);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const data = await request.json();

//     // Validar los datos recibidos
//     if (!data.name || !data.ingredients || !Array.isArray(data.ingredients)) {
//       throw new Error('Datos requeridos faltantes o incorrectos');
//     }

//     // Validar cada ingrediente
//     for (const ingredient of data.ingredients) {
//       if (!ingredient.ingredientId || ingredient.quantity === undefined) {
//         throw new Error('Datos de ingrediente faltantes o incorrectos');
//       }
//     }

//     // Crear el producto con los ingredientes asociados
//     const product = await prisma.product.create({
//       data: {
//         name: data.name,
//         ingredients: {
//           create: data.ingredients.map(ingredient => ({
//             ingredientId: ingredient.ingredientId,
//             quantity: ingredient.quantity,
//             pricePerUnit :ingredient.pricePerUnit,    // Precio por unidad
//             finalPrice :ingredient.quantity * ingredient.pricePerUnit   // Precio final (cantidad * precio por unidad)
//           })),
//         },
//       },
//       include: { ingredients: true },
//     });

//     return NextResponse.json(product, { status: 201 });
//   } catch (error) {
//     console.error("Error creando producto:", error);
//     return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
//   }
// }
