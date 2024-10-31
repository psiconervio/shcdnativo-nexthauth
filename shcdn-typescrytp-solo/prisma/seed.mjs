import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creación de ingredientes
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { id: 1, name: 'Harina', price: 506.55 },
      { id: 2, name: 'Aceite', price: 5625.00 },
      { id: 3, name: 'Huevo', price: 126.25 },
      { id: 4, name: 'Carne', price: 5850.00 },
      { id: 5, name: 'Espinaca', price: 333.33 },
      { id: 6, name: 'Cebolla', price: 1100.00 },
      { id: 7, name: 'Pimiento', price: 933.33 },
      { id: 8, name: 'Ajo', price: 900.00 },
      { id: 9, name: 'Packaging', price: 44.23 },
      { id: 10, name: 'Personal', price: 300.00 }
    ]
  });

  // Creación de productos
  const products = await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: "Raviolones - Verdura, carne y espinaca",
        portionSize: 20,
        costPerPortion: 855.57,
        grossProfit: 684.46,
        basePrice: 1540.03,
        tax: 46.20,
        finalPrice: 1586.23,
        roundedPrice: 1700
      },
      {
        id: 2,
        name: "Lomo al Malbec",
        portionSize: 9,
        costPerPortion: 1658.65,
        grossProfit: 1326.92,
        basePrice: 2985.57,
        tax: 89.57,
        finalPrice: 3075.13,
        roundedPrice: 2600
      },
      {
        id: 3,
        name: "Solomillo al vino blanco",
        portionSize: 11,
        costPerPortion: 1149.89,
        grossProfit: 919.91,
        basePrice: 2069.80,
        tax: 62.09,
        finalPrice: 2131.90,
        roundedPrice: 2100
      },
      {
        id: 4,
        name: "Bondiola a la Cerveza",
        portionSize: 9,
        costPerPortion: 1514.20,
        grossProfit: 1211.36,
        basePrice: 2725.57,
        tax: 81.77,
        finalPrice: 2807.33,
        roundedPrice: 2500
      },
      {
        id: 5,
        name: "Entraña",
        portionSize: 8,
        costPerPortion: 1657.33,
        grossProfit: 1325.86,
        basePrice: 2983.19,
        tax: 89.50,
        finalPrice: 3072.68,
        roundedPrice: 2750
      }
    ]
  });

  // Creación de relaciones producto-ingrediente
  const productIngredients = await prisma.productIngredient.createMany({
    data: [
      { productId: 1, ingredientId: 1, quantity: 2.5 },
      { productId: 1, ingredientId: 2, quantity: 0.1 },
      { productId: 1, ingredientId: 3, quantity: 5 },
      { productId: 1, ingredientId: 4, quantity: 1 },
      { productId: 1, ingredientId: 5, quantity: 3 },
      { productId: 1, ingredientId: 6, quantity: 0.5 },
      { productId: 1, ingredientId: 7, quantity: 0.2 },
      { productId: 1, ingredientId: 8, quantity: 0.2 },
      { productId: 1, ingredientId: 9, quantity: 20 },
      { productId: 1, ingredientId: 10, quantity: 20 },
      
      // Añade entradas similares para los otros productos según los datos
      { productId: 2, ingredientId: 1, quantity: 2 },
      { productId: 2, ingredientId: 2, quantity: 0.1 },
      { productId: 2, ingredientId: 3, quantity: 6 },
      { productId: 2, ingredientId: 4, quantity: 1 },
      { productId: 2, ingredientId: 6, quantity: 0.5 },
      { productId: 2, ingredientId: 7, quantity: 0.2 },
      { productId: 2, ingredientId: 8, quantity: 0.4 },
      { productId: 2, ingredientId: 9, quantity: 9 },
      { productId: 2, ingredientId: 10, quantity: 2 }
      
      // Continúa con el resto de los productos
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
