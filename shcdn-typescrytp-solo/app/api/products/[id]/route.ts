// app/api/products/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
  return NextResponse.json(product);
}

interface IngredientData {
  ingredientId: number;
  quantity: number;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID.' }, { status: 400 });
    }

    const data: { ingredients: IngredientData[] } = await req.json();

    if (!data.ingredients) {
      return NextResponse.json({ error: 'Missing ingredients data.' }, { status: 400 });
    }

    let totalIngredientsCost = 0;

    const ingredientData = await Promise.all(
      data.ingredients.map(async (ingredient) => {
        const pricePerUnit = await getPricePerUnit(ingredient.ingredientId);
        const finalPrice = ingredient.quantity * pricePerUnit;
        totalIngredientsCost += finalPrice;
        return {
          quantity: ingredient.quantity,
          pricePerUnit: pricePerUnit,
          finalPrice: finalPrice,
          ingredient: {
            connect: { id: ingredient.ingredientId },
          },
        };
      })
    );

    // Calculate new prices
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: { portions: true, tax: true, profitPercentage: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    const { portions, tax, profitPercentage } = existingProduct;
    const finalPrice = totalIngredientsCost * (1 + tax / 100);
    const costPerPortion = totalIngredientsCost / portions;
    const profitAmount = costPerPortion * (profitPercentage / 100);

    // Update the product's ingredients and prices
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ingredients: {
          deleteMany: {}, // Remove existing ingredients
          create: ingredientData,
        },
        costPerPortion: costPerPortion,
        priceWithoutTax: totalIngredientsCost,
        finalPrice: finalPrice,
        roundedPrice: Math.round(finalPrice),
        profitAmount: profitAmount,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while updating the product.' }, { status: 500 });
  }
}

async function getPricePerUnit(ingredientId: number): Promise<number> {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id: ingredientId },
    select: { price: true },
  });
  return ingredient?.price || 0;
}
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const data = await req.json();
//   const updatedProduct = await prisma.product.update({
//     where: { id: Number(params.id) },
//     data: {
//       name: data.name,
//       portions: data.portions,
//       costPerPortion: data.costPerPortion,
//       priceWithoutTax: data.priceWithoutTax,
//       tax: data.tax,
//       finalPrice: data.finalPrice,
//       roundedPrice: data.roundedPrice,
//     },
//   });
//   return NextResponse.json(updatedProduct);
// }

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const deletedProduct = await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(deletedProduct);
}

// // app/api/products/[productId]/route.ts

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET(req: Request, { params }: { params: { productId: string } }) {
//   const product = await prisma.product.findUnique({
//     where: { id: Number(params.productId) },
//     include: {
//       ingredients: {
//         include: {
//           ingredient: true,
//         },
//       },
//     },
//   });
//   return NextResponse.json(product);
// }

// export async function PUT(req: Request, { params }: { params: { productId: string } }) {
//   const data = await req.json();
//   const updatedProduct = await prisma.product.update({
//     where: { id: Number(params.productId) },
//     data: {
//       name: data.name,
//       portions: data.portions,
//       costPerPortion: data.costPerPortion,
//       priceWithoutTax: data.priceWithoutTax,
//       tax: data.tax,
//       finalPrice: data.finalPrice,
//       roundedPrice: data.roundedPrice,
//     },
//   });
//   return NextResponse.json(updatedProduct);
// }

// export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
//   const deletedProduct = await prisma.product.delete({
//     where: { id: Number(params.productId) },
//   });
//   return NextResponse.json(deletedProduct);
// }


// // src/app/api/products/[id]/route.js
// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/db';

// export async function GET(request, { params }) {
//   try {
//     const product = await prisma.product.findUnique({
//       where: { id: parseInt(params.id) },
//       include: { ingredients: true },
//     });
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
//     return NextResponse.json(product);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const data = await request.json();
//     const product = await prisma.product.update({
//       where: { id: parseInt(params.id) },
//       data: {
//         ...data,
//         ingredients: {
//           deleteMany: {},
//           create: data.ingredients,
//         },
//       },
//       include: { ingredients: true },
//     });
//     return NextResponse.json(product);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await prisma.product.delete({
//       where: { id: parseInt(params.id) },
//     });
//     return NextResponse.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
//   }
// }
