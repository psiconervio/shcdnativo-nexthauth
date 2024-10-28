// src/app/api/ingredients/route.js
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return NextResponse.json(ingredients);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching ingredients' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validación sencilla de los datos (ajusta según sea necesario)
    if (!data.name || !data.unit || typeof data.price !== 'number' || typeof data.quantity !== 'number') {
      return NextResponse.json({ error: 'Datos no válidos' }, { status: 400 });
    }

    const ingredient = await prisma.ingredient.create({ data });
    return NextResponse.json(ingredient);
  } catch (error) {
    console.error('Error al crear ingrediente:', error);
    return NextResponse.json({ error: 'Error creating ingredient' }, { status: 500 });
  }
}
// export async function POST(request) {
//   try {
//     const data = await request.json();
//     const ingredient = await prisma.ingredient.create({ data });
//     return NextResponse.json(ingredient);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating ingredient' }, { status: 500 });
//   }
// }
// // src/app/api/ingredients/route.js
// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/db';

// export async function GET() {
//   try {
//     const ingredients = await prisma.ingredient.findMany();
//     return NextResponse.json(ingredients);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching ingredients' }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const data = await request.json();
//     const ingredient = await prisma.ingredient.create({ data });
//     return NextResponse.json(ingredient);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error creating ingredient' }, { status: 500 });
//   }
// }