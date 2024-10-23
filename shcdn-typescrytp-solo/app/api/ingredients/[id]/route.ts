import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Obtener un ingrediente por su ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: parseInt(id) }, // Buscar por ID
    });

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
  }
}

// Actualizar un ingrediente por su ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const ingredient = await prisma.ingredient.update({
      where: { id: parseInt(id) }, // Buscar por ID
      data, // Actualizar con los datos recibidos
    });
    return NextResponse.json(ingredient);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
  }
}

// Eliminar un ingrediente por su ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await prisma.ingredient.delete({
      where: { id: parseInt(id) }, // Buscar por ID
    });
    return NextResponse.json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
  }
}

// // src/app/api/ingredients/[id]/route.js
// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/db';

// export async function GET(request, { params }) {
//   const { name } = params;

//   try {
//     const ingredient = await prisma.ingredient.findFirst({
//       where: {
//         name: {
//           contains: name,
//           mode: 'insensitive',
//         },
//       },
//     });

//     if (!ingredient) {
//       return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
//     }

//     return NextResponse.json(ingredient);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
//   }
// }
// //BUSCA POR ID, CAMBIAR EL NOMBRE DE CARPETA [NAME] A [ID]
// // export async function GET(request, { params }) {
// //   try {
// //     const ingredient = await prisma.ingredient.findUnique({
// //       where: { id: parseInt(params.id) },
// //     });
// //     if (!ingredient) {
// //       return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
// //     }
// //     return NextResponse.json(ingredient);
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Error fetching ingredient' }, { status: 500 });
// //   }
// // }

// export async function PUT(request, { params }) {
//   try {
//     const data = await request.json();
//     const ingredient = await prisma.ingredient.update({
//       where: { id: parseInt(params.id) },
//       data,
//     });
//     return NextResponse.json(ingredient);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error updating ingredient' }, { status: 500 });
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await prisma.ingredient.delete({
//       where: { id: parseInt(params.id) },
//     });
//     return NextResponse.json({ message: 'Ingredient deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting ingredient' }, { status: 500 });
//   }
// }