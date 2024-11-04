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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id: Number(params.id) },
    data: {
      name: data.name,
      portions: data.portions,
      costPerPortion: data.costPerPortion,
      priceWithoutTax: data.priceWithoutTax,
      tax: data.tax,
      finalPrice: data.finalPrice,
      roundedPrice: data.roundedPrice,
    },
  });
  return NextResponse.json(updatedProduct);
}

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
