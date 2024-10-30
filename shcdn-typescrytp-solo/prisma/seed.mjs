import prisma from '../lib/db.js';

const ingredients = [
  { name: "Huevos", unit: "unidad", price: 126.25 },
  { name: "Harina", unit: "kilo", price: 506.55 },
  { name: "Queso muzarella", unit: "kilo", price: 5689.50 },
  { name: "Jamón", unit: "kg", price: 6750.00 },
  { name: "Picada", unit: "kg", price: 5850.00 },
  { name: "Dulce de espalda", unit: "kg", price: 5060.00 },
  { name: "Blando de cerdo", unit: "kg", price: 3952.50 },
  { name: "bondiola de cerdo", unit: "kg", price: 6450.00 },
  { name: "Entraña", unit: "kg", price: 7125.00 },
  { name: "Lomo", unit: "kg", price: 6750.00 },
  { name: "Ron", unit: "lt", price: 3200.00 },
  { name: "Cebolla", unit: "kg", price: 1100.00 },
  { name: "Pimiento", unit: "unidad", price: 933.33 },
  { name: "Zanahoria", unit: "kg", price: 1100.00 },
  { name: "Ajo", unit: "cabeza", price: 900.00 },
  { name: "Puerro / Verdeo", unit: "atado", price: 2500.00 },
  { name: "Envase plástico salsa", unit: "450cc", price: 106.70 },
  { name: "bandeja", unit: "103", price: 44.23 },
  { name: "Aceite", unit: "lt", price: 5625.00 },
  { name: "Espinaca", unit: "kg", price: 333.33 },
  { name: "Papa deshidratada", unit: "kg", price: 950.00 },
  { name: "Puré de tomate", unit: "520gr", price: 525.00 },
  { name: "Vino Malbec", unit: "lt", price: 2930.00 },
  { name: "Leche Entera", unit: "lt", price: 899.50 },
  { name: "Queso Azul", unit: "kg", price: 5875.00 },
  { name: "Queso sardo", unit: "kg", price: 5250.00 },
  { name: "CERVEZA", unit: "lt", price: 1500.00 },
  { name: "SALSA BLANCA", unit: "lt", price: 500.00 },
  { name: "crema de leche", unit: "lt", price: 24375.00 }
];

async function main() {
  for (const ingredient of ingredients) {
    await prisma.ingredient.create({
      data: ingredient,
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
