import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seedData = [
  { name: "Huevos unidad", unit: "unidad", price: 126.25, quantity: 100 },
  { name: "Harina", unit: "kg", price: 506.55, quantity: 50 },
  { name: "Queso muzarella", unit: "kg", price: 5689.50, quantity: 20 },
  { name: "Jamón", unit: "kg", price: 6750.00, quantity: 30 },
  { name: "Picada", unit: "kg", price: 5850.00, quantity: 25 },
  { name: "Dulce de espalda", unit: "kg", price: 5060.00, quantity: 15 },
  { name: "Blando de cerdo", unit: "kg", price: 3952.50, quantity: 18 },
  { name: "Bondiola de cerdo", unit: "kg", price: 6450.00, quantity: 22 },
  { name: "Entraña", unit: "kg", price: 7125.00, quantity: 10 },
  { name: "Lomo", unit: "kg", price: 6750.00, quantity: 12 },
  { name: "Ron", unit: "lt", price: 3200.00, quantity: 50 },
  { name: "Cebolla", unit: "kg", price: 1100.00, quantity: 60 },
  { name: "Pimiento", unit: "unidad", price: 933.33, quantity: 70 },
  { name: "Zanahoria", unit: "kg", price: 1100.00, quantity: 40 },
  { name: "Ajo", unit: "cabeza", price: 900.00, quantity: 80 },
  { name: "Puerro / Verdeo", unit: "atado", price: 2500.00, quantity: 30 },
  { name: "Envase plástico salsa", unit: "450cc", price: 106.70, quantity: 200 },
  { name: "Bandeja 103", unit: "unidad", price: 44.23, quantity: 150 },
  { name: "Aceite", unit: "lt", price: 5625.00, quantity: 35 },
  { name: "Espinaca", unit: "kg", price: 333.33, quantity: 25 },
  { name: "Papa deshidratada", unit: "kg", price: 950.00, quantity: 45 },
  { name: "Puré de tomate", unit: "520gr", price: 525.00, quantity: 55 },
  { name: "Vino Malbec", unit: "lt", price: 2930.00, quantity: 20 },
  { name: "Leche Entera", unit: "lt", price: 899.50, quantity: 60 },
  { name: "Queso Azul", unit: "kg", price: 5875.00, quantity: 15 },
  { name: "Queso sardo", unit: "kg", price: 5250.00, quantity: 18 },
  { name: "CERVEZA", unit: "lt", price: 1500.00, quantity: 100 },
  { name: "SALSA BLANCA", unit: "kg", price: 500.00, quantity: 40 },
  { name: "Crema de leche", unit: "lt", price: 24375.00, quantity: 5 }
];

async function main() {
  await prisma.ingredient.createMany({
    data: seedData,
    skipDuplicates: true,
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// const seedData = {
//   products: [
//     { id: 1, name: "Raviolones de Ricotta y Espinaca", portionSize: 200, portionsPerBatch: 10, margin: 25, tax: 10 },
//     { id: 2, name: "Sorrentinos de Jamón y Queso", portionSize: 250, portionsPerBatch: 8, margin: 20, tax: 10 },
//     { id: 3, name: "Ñoquis de Papa", portionSize: 300, portionsPerBatch: 15, margin: 22, tax: 8 }
//   ],
//   ingredients: [
//     { id: 1, name: "Harina", price: 1.5, unit: "kg" },
//     { id: 2, name: "Ricotta", price: 4.0, unit: "kg" },
//     { id: 3, name: "Jamón", price: 3.5, unit: "kg" },
//     { id: 4, name: "Queso Mozzarella", price: 5.0, unit: "kg" },
//     { id: 5, name: "Papa", price: 2.0, unit: "kg" }
//   ],
//   productIngredients: [
//     { productId: 1, ingredientId: 1, quantity: 150 },
//     { productId: 1, ingredientId: 2, quantity: 50 },
//     { productId: 2, ingredientId: 3, quantity: 200 },
//     { productId: 2, ingredientId: 4, quantity: 100 },
//     { productId: 3, ingredientId: 1, quantity: 300 },
//     { productId: 3, ingredientId: 5, quantity: 50 }
//   ]
// };

// async function main() {
//   await prisma.product.createMany({
//     data: seedData.products,
//     skipDuplicates: true,
//   });

//   await prisma.ingredient.createMany({
//     data: seedData.ingredients,
//     skipDuplicates: true,
//   });

//   await prisma.productIngredient.createMany({
//     data: seedData.productIngredients,
//     skipDuplicates: true,
//   });
// }

// main()
//   .catch(e => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Creación de ingredientes
//   const ingredients = await prisma.ingredient.createMany({
//     data: [
//       { id: 1, name: 'Harina', price: 506.55 },
//       { id: 2, name: 'Aceite', price: 5625.00 },
//       { id: 3, name: 'Huevo', price: 126.25 },
//       { id: 4, name: 'Carne', price: 5850.00 },
//       { id: 5, name: 'Espinaca', price: 333.33 },
//       { id: 6, name: 'Cebolla', price: 1100.00 },
//       { id: 7, name: 'Pimiento', price: 933.33 },
//       { id: 8, name: 'Ajo', price: 900.00 },
//       { id: 9, name: 'Packaging', price: 44.23 },
//       { id: 10, name: 'Personal', price: 300.00 }
//     ]
//   });

//   // Creación de productos
//   const products = await prisma.product.createMany({
//     data: [
//       {
//         id: 1,
//         name: "Raviolones - Verdura, carne y espinaca",
//         portionSize: 20,
//         costPerPortion: 855.57,
//         grossProfit: 684.46,
//         basePrice: 1540.03,
//         tax: 46.20,
//         finalPrice: 1586.23,
//         roundedPrice: 1700
//       },
//       {
//         id: 2,
//         name: "Lomo al Malbec",
//         portionSize: 9,
//         costPerPortion: 1658.65,
//         grossProfit: 1326.92,
//         basePrice: 2985.57,
//         tax: 89.57,
//         finalPrice: 3075.13,
//         roundedPrice: 2600
//       },
//       {
//         id: 3,
//         name: "Solomillo al vino blanco",
//         portionSize: 11,
//         costPerPortion: 1149.89,
//         grossProfit: 919.91,
//         basePrice: 2069.80,
//         tax: 62.09,
//         finalPrice: 2131.90,
//         roundedPrice: 2100
//       },
//       {
//         id: 4,
//         name: "Bondiola a la Cerveza",
//         portionSize: 9,
//         costPerPortion: 1514.20,
//         grossProfit: 1211.36,
//         basePrice: 2725.57,
//         tax: 81.77,
//         finalPrice: 2807.33,
//         roundedPrice: 2500
//       },
//       {
//         id: 5,
//         name: "Entraña",
//         portionSize: 8,
//         costPerPortion: 1657.33,
//         grossProfit: 1325.86,
//         basePrice: 2983.19,
//         tax: 89.50,
//         finalPrice: 3072.68,
//         roundedPrice: 2750
//       }
//     ]
//   });

//   // Creación de relaciones producto-ingrediente
//   const productIngredients = await prisma.productIngredient.createMany({
//     data: [
//       { productId: 1, ingredientId: 1, quantity: 2.5 },
//       { productId: 1, ingredientId: 2, quantity: 0.1 },
//       { productId: 1, ingredientId: 3, quantity: 5 },
//       { productId: 1, ingredientId: 4, quantity: 1 },
//       { productId: 1, ingredientId: 5, quantity: 3 },
//       { productId: 1, ingredientId: 6, quantity: 0.5 },
//       { productId: 1, ingredientId: 7, quantity: 0.2 },
//       { productId: 1, ingredientId: 8, quantity: 0.2 },
//       { productId: 1, ingredientId: 9, quantity: 20 },
//       { productId: 1, ingredientId: 10, quantity: 20 },
      
//       // Añade entradas similares para los otros productos según los datos
//       { productId: 2, ingredientId: 1, quantity: 2 },
//       { productId: 2, ingredientId: 2, quantity: 0.1 },
//       { productId: 2, ingredientId: 3, quantity: 6 },
//       { productId: 2, ingredientId: 4, quantity: 1 },
//       { productId: 2, ingredientId: 6, quantity: 0.5 },
//       { productId: 2, ingredientId: 7, quantity: 0.2 },
//       { productId: 2, ingredientId: 8, quantity: 0.4 },
//       { productId: 2, ingredientId: 9, quantity: 9 },
//       { productId: 2, ingredientId: 10, quantity: 2 }
      
//       // Continúa con el resto de los productos
//     ]
//   });
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
