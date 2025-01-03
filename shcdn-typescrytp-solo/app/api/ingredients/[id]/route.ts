// app/api/ingredients/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

async function recalculateProductPrices(ingredientId: number) {
  try {
    console.log(`Recalculando precios para productos relacionados con el ingrediente ${ingredientId}`);

    // Obtén todos los productos relacionados con el ingrediente
    const productsWithIngredient = await prisma.product.findMany({
      where: {
        ingredients: {
          some: { ingredientId },
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Incluye los detalles del ingrediente
          },
        },
      },
    });

    for (const product of productsWithIngredient) {
      console.log(`Producto: ${product.name}`);

      let totalIngredientsCost = 0;

      // Calcula el costo total de los ingredientes
      for (const productIngredient of product.ingredients) {
        if (!productIngredient.quantity || !productIngredient.ingredient.price) {
          console.error(
            `Datos faltantes en ingrediente del producto ${product.name}:`,
            {
              quantity: productIngredient.quantity,
              price: productIngredient.ingredient.price,
            }
          );
          continue;
        }
        const ingredientCost =
          productIngredient.quantity * productIngredient.ingredient.price;
        totalIngredientsCost += ingredientCost;
      }

      console.log(`Costo total de ingredientes: ${totalIngredientsCost}`);

      // Validar campos necesarios en el producto
      const { portions, profit = 0, tax = 0 } = product;

      if (!portions || portions <= 0) {
        console.error(
          `Porciones inválidas para el producto ${product.name}: ${portions}`
        );
        continue;
      }

      // Realiza los cálculos
      const costPerPortion = totalIngredientsCost / portions;
      const profitAmount = costPerPortion * (profit / 100);
      const basePrice = totalIngredientsCost + profitAmount * portions;
      const finalPrice = basePrice * (1 + tax / 100);

      // Validar que los cálculos no sean NaN o infinitos
      if (
        isNaN(costPerPortion) ||
        isNaN(profitAmount) ||
        isNaN(finalPrice) ||
        !isFinite(finalPrice)
      ) {
        console.error(
          `Cálculos inválidos para el producto ${product.name}:`,
          {
            costPerPortion,
            profitAmount,
            finalPrice,
          }
        );
        continue;
      }

      // Actualiza el producto en la base de datos
      await prisma.product.update({
        where: { id: product.id },
        data: {
          costPerPortion,
          priceWithoutTax: totalIngredientsCost,
          profitAmount,
          pricePerPortion: finalPrice / portions,
          finalPrice,
          roundedPrice: Math.round(finalPrice),
        },
      });

      console.log(`Producto "${product.name}" actualizado.`);
    }
  } catch (error) {
    console.error('Error al recalcular precios de productos:', error);
    throw new Error('Error al recalcular precios de productos.');
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const ingredientId = parseInt(params.id);
    const data = await req.json();

    const { name, unit, price, quantity } = data;

    // Actualizar el ingrediente
    const updatedIngredient = await prisma.ingredient.update({
      where: { id: ingredientId },
      data: { name, unit, price, quantity },
    });

    // Recalcular los precios de los productos relacionados
    await recalculateProductPrices(ingredientId);

    return NextResponse.json({
      message: 'Ingrediente y productos actualizados.',
      updatedIngredient,
    });
  } catch (error) {
    console.error('Error al actualizar el ingrediente:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el ingrediente.' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: Number(params.id) },
    });

    if (!ingredient) {
      return NextResponse.json(
        { error: 'Ingrediente no encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    console.error('Error al obtener el ingrediente:', error);
    return NextResponse.json(
      { error: 'Error al obtener el ingrediente.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const updatedIngredient = await prisma.ingredient.update({
      where: { id: Number(params.id) },
      data: {
        name: data.name,
        unit: data.unit,
        price: data.price,
        quantity: data.quantity,
      },
    });

    return NextResponse.json(updatedIngredient);
  } catch (error) {
    console.error('Error al actualizar el ingrediente:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el ingrediente.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const ingredientId = Number(params.id);

  try {
    // Eliminar relaciones en la tabla intermedia
    await prisma.productIngredient.deleteMany({
      where: { ingredientId },
    });

    // Eliminar el ingrediente
    const deletedIngredient = await prisma.ingredient.delete({
      where: { id: ingredientId },
    });

    return NextResponse.json(deletedIngredient);
  } catch (error) {
    console.error('Error al eliminar el ingrediente:', error);
    return NextResponse.json(
      { error: 'No se pudo eliminar el ingrediente.' },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const deletedIngredient = await prisma.ingredient.delete({
//     where: { id: Number(params.id) },
//   });
//   return NextResponse.json(deletedIngredient);
// }


// // app/api/ingredients/route.ts

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET() {
//   const ingredients = await prisma.ingredient.findMany();
//   return NextResponse.json(ingredients);
// }

// export async function POST(req: Request) {
//   const data = await req.json();
//   const newIngredient = await prisma.ingredient.create({
//     data: {
//       name: data.name,
//       unit: data.unit,
//       price: data.price,
//       quantity: data.quantity,
//     },
//   });
//   return NextResponse.json(newIngredient);
// }
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const deletedIngredient = await prisma.ingredient.delete({
//     where: { id: Number(params.id) },
//   });
//   return NextResponse.json(deletedIngredient);
// }


// // import { NextRequest, NextResponse } from 'next/server';
// // import prisma from '@/lib/db';

// // interface Params {
// //   params: {
// //     id: string;
// //   };
// // }

// // export async function GET(request: NextRequest, { params }: Params) {
// //   try {
// //     const ingredient = await prisma.ingredient.findUnique({
// //       where: { id: parseInt(params.id) },
// //     });
// //     if (!ingredient) {
// //       return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
// //     }
// //     return NextResponse.json(ingredient);
// //   } catch (error) {
// //     console.error("Error fetching ingredient:", error);
// //     return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
// //   }
// // }

// // export async function PUT(request: NextRequest, { params }: Params) {
// //   try {
// //     const data = await request.json();
// //     const ingredient = await prisma.ingredient.update({
// //       where: { id: parseInt(params.id) },
// //       data,
// //     });
// //     return NextResponse.json(ingredient);
// //   } catch (error) {
// //     console.error("Error updating ingredient:", error);
// //     return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
// //   }
// // }

// // export async function DELETE(request: NextRequest, { params }: Params) {
// //   try {
// //     await prisma.ingredient.delete({
// //       where: { id: parseInt(params.id) },
// //     });
// //     return NextResponse.json({ message: 'Ingredient deleted successfully' });
// //   } catch (error) {
// //     console.error("Error deleting ingredient:", error);
// //     return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
// //   }
// // }

// // // // src/app/api/ingredients/[id]/route.js
// // // import { NextResponse } from 'next/server';
// // // import  prisma  from '@/lib/db';

// // // export default async function GET(request, { params }) {
// // //   try {
// // //     const ingredient = await prisma.ingredient.findUnique({
// // //       where: { id: parseInt(params.id) },
// // //     });
// // //     if (!ingredient) {
// // //       return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
// // //     }
// // //     return NextResponse.json(ingredient);
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
// // //   }
// // // }

// // // export default async function PUT(request, { params }) {
// // //   try {
// // //     const data = await request.json();
// // //     const ingredient = await prisma.ingredient.update({
// // //       where: { id: parseInt(params.id) },
// // //       data,
// // //     });
// // //     return NextResponse.json(ingredient);
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
// // //   }
// // // }

// // // export default async function DELETE(request, { params }) {
// // //   try {
// // //     await prisma.ingredient.delete({
// // //       where: { id: parseInt(params.id) },
// // //     });
// // //     return NextResponse.json({ message: 'Ingredient deleted successfully' });
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
// // //   }
// // // }