import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const productos = [
      {
        name: "Raviolones",
        portions: 20,
        costPerPortion: 855.57,
        priceWithoutTax: 1540.03,
        tax: 46.20,
        finalPrice: 1586.23,
        roundedPrice: 1700,
        ingredients: [
          { name: "Harina", quantity: 2.5, pricePerUnit: 506.55, finalPrice: 1266.38 },
          { name: "Aceite", quantity: 0.1, pricePerUnit: 5625.00, finalPrice: 562.50 },
          { name: "Huevo", quantity: 5, pricePerUnit: 126.25, finalPrice: 631.25 },
          { name: "Carne", quantity: 1, pricePerUnit: 5850.00, finalPrice: 5850.00 },
          { name: "Espinaca", quantity: 3, pricePerUnit: 333.33, finalPrice: 1000.00 },
          { name: "Cebolla", quantity: 0.5, pricePerUnit: 1100.00, finalPrice: 550.00 },
          { name: "Pimiento", quantity: 0.2, pricePerUnit: 933.33, finalPrice: 186.67 },
          { name: "Ajo", quantity: 0.2, pricePerUnit: 900.00, finalPrice: 180.00 },
          { name: "packaging", quantity: 20, pricePerUnit: 44.23, finalPrice: 884.60 },
          { name: "Personal", quantity: 20, pricePerUnit: 300.00, finalPrice: 6000.00 },
        ]
      },
    ];
  
    for (const producto of productos) {
      const ingredientesData = await Promise.all(producto.ingredients.map(async (ingredient) => {
        const existingIngredient = await prisma.ingredient.findUnique({
          where: { name: ingredient.name }
        });
        if (!existingIngredient) {
          throw new Error(`Ingredient not found: ${ingredient.name}`);
        }
        return {
          ingredient: { connect: { id: existingIngredient.id } }, // Conectar usando el id
          quantity: ingredient.quantity,
          pricePerUnit: ingredient.pricePerUnit,
          finalPrice: ingredient.finalPrice,
        };
      }));
  
      await prisma.product.create({
        data: {
          name: producto.name,
          portions: producto.portions,
          costPerPortion: producto.costPerPortion,
          priceWithoutTax: producto.priceWithoutTax,
          tax: producto.tax,
          finalPrice: producto.finalPrice,
          roundedPrice: producto.roundedPrice,
          ingredients: {
            create: ingredientesData,
          },
        },
      });
    }
  
    console.log("Productos agregados exitosamente.");
  }

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// const seedData = {
//   products: [
//     {
//       name: "Raviolones",
//       portions: 20,
//       costPerPortion: 855.57,
//       priceWithoutTax: 1540.03,
//       tax: 0.03,  // Impuesto como porcentaje
//       finalPrice: 1586.23,
//       roundedPrice: 1586.00,
//       ingredients: [
//         { name: "Harina", quantity: 2.5, pricePerUnit: 506.55, finalPrice: 1266.38 },
//         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625.00, finalPrice: 562.50 },
//         { name: "Huevo", quantity: 5, pricePerUnit: 126.25, finalPrice: 631.25 },
//         { name: "Carne", quantity: 1, pricePerUnit: 5850.00, finalPrice: 5850.00 }
//       ]
//     },
//     {
//       name: "Lomo al Malbec",
//       portions: 9,
//       costPerPortion: 1658.65,
//       priceWithoutTax: 2985.57,
//       tax: 0.03,
//       finalPrice: 3075.13,
//       roundedPrice: 3075.00,
//       ingredients: [
//         { name: "Harina", quantity: 2, pricePerUnit: 506.55, finalPrice: 1013.10 },
//         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625.00, finalPrice: 562.50 },
//         { name: "Carne", quantity: 1, pricePerUnit: 6750.00, finalPrice: 6750.00 }
//       ]
//     },
//     {
//       name: "Solomillo al vino blanco",
//       portions: 11,
//       costPerPortion: 1149.89,
//       priceWithoutTax: 2069.80,
//       tax: 0.03,
//       finalPrice: 2131.90,
//       roundedPrice: 2132.00,
//       ingredients: [
//         { name: "Harina", quantity: 2, pricePerUnit: 506.55, finalPrice: 1013.10 },
//         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625.00, finalPrice: 562.50 },
//         { name: "Blando", quantity: 1, pricePerUnit: 3952.50, finalPrice: 3952.50 }
//       ]
//     },
//     {
//       name: "Bondiola a la cerveza",
//       portions: 9,
//       costPerPortion: 1514.20,
//       priceWithoutTax: 2725.57,
//       tax: 0.03,
//       finalPrice: 2807.33,
//       roundedPrice: 2807.00,
//       ingredients: [
//         { name: "Harina", quantity: 2, pricePerUnit: 506.55, finalPrice: 1013.10 },
//         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625.00, finalPrice: 562.50 },
//         { name: "Bondiola", quantity: 1, pricePerUnit: 6450.00, finalPrice: 6450.00 }
//       ]
//     },
//     {
//       name: "Entraña",
//       portions: 8,
//       costPerPortion: 1657.33,
//       priceWithoutTax: 2983.19,
//       tax: 0.03,
//       finalPrice: 3072.68,
//       roundedPrice: 3073.00,
//       ingredients: [
//         { name: "Harina", quantity: 2, pricePerUnit: 506.55, finalPrice: 1013.10 },
//         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625.00, finalPrice: 562.50 },
//         { name: "Entraña", quantity: 1, pricePerUnit: 7125.00, finalPrice: 7125.00 }
//       ]
//     }
//   ]
// };

// async function seedProducts() {
//   for (const product of seedData.products) {
//     // Crea el producto
//     const createdProduct = await prisma.product.create({
//       data: {
//         name: product.name,
//         portions: product.portions,
//         costPerPortion: product.costPerPortion,
//         priceWithoutTax: product.priceWithoutTax,
//         tax: product.tax,
//         finalPrice: product.finalPrice,
//         roundedPrice: product.roundedPrice
//       }
//     });

//     // Ahora busca cada ingrediente por su nombre y crea la relación en ProductIngredient
//     for (const ingredient of product.ingredients) {
//       const existingIngredient = await prisma.ingredient.findUnique({
//         where: { name: ingredient.name }
//       });

//       if (existingIngredient) {
//         // Crea la relación en ProductIngredient
//         await prisma.productIngredient.create({
//           data: {
//             productId: createdProduct.id,
//             ingredientId: existingIngredient.id,
//             quantity: ingredient.quantity,
//             pricePerUnit: ingredient.pricePerUnit,
//             finalPrice: ingredient.finalPrice
//           }
//         });
//       } else {
//         console.error(`Ingrediente no encontrado: ${ingredient.name}`);
//       }
//     }
//   }
// }

// seedProducts()
//   .catch(e => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// // import { PrismaClient } from '@prisma/client';
// // const prisma = new PrismaClient();

// // const seedData = {
// //   products: [
// //     {
// //       name: "Raviolones",
// //       portions: 20,
// //       costPerPortion: 855.57,
// //       priceWithoutTax: 1540.03,
// //       taxAmount: 46.20,
// //       finalPrice: 1586.23,
// //       ingredients: [
// //         { name: "Harina", quantity: 2.5, price: 506.55, total: 1266.38 },
// //         { name: "Aceite", quantity: 0.1, price: 5625.00, total: 562.50 },
// //         { name: "Huevo", quantity: 5, price: 126.25, total: 631.25 },
// //         { name: "Carne", quantity: 1, price: 5850.00, total: 5850.00 },
// //         { name: "Espinaca", quantity: 3, price: 333.33, total: 1000.00 },
// //         { name: "Cebolla", quantity: 0.5, price: 1100.00, total: 550.00 },
// //         { name: "Pimiento", quantity: 0.2, price: 933.33, total: 186.67 },
// //         { name: "Ajo", quantity: 0.2, price: 900.00, total: 180.00 },
// //         { name: "Packaging", quantity: 20, price: 44.23, total: 884.60 },
// //         { name: "Personal", quantity: 20, price: 300.00, total: 6000.00 }
// //       ]
// //     },
// //     {
// //       name: "Lomo al Malbec",
// //       portions: 9,
// //       costPerPortion: 1658.65,
// //       priceWithoutTax: 2985.57,
// //       taxAmount: 89.57,
// //       finalPrice: 3075.13,
// //       ingredients: [
// //         { name: "Harina", quantity: 2, price: 506.55, total: 1013.10 },
// //         { name: "Aceite", quantity: 0.1, price: 5625.00, total: 562.50 },
// //         { name: "Huevo", quantity: 6, price: 126.25, total: 757.50 },
// //         { name: "Carne", quantity: 1, price: 6750.00, total: 6750.00 },
// //         { name: "Puerro/Verdeo", quantity: 0.5, price: 2500.00, total: 1250.00 },
// //         { name: "Vino Malbec", quantity: 1, price: 2500.00, total: 2500.00 },
// //         { name: "Cebolla", quantity: 0.5, price: 1100.00, total: 550.00 },
// //         { name: "Pimiento", quantity: 0.2, price: 933.33, total: 186.67 },
// //         { name: "Ajo", quantity: 0.4, price: 900.00, total: 360.00 },
// //         { name: "Packaging", quantity: 9, price: 44.23, total: 398.07 },
// //         { name: "Personal", quantity: 2, price: 300.00, total: 600.00 }
// //       ]
// //     },
// //     {
// //       name: "Solomillo al vino blanco",
// //       portions: 11,
// //       costPerPortion: 1149.89,
// //       priceWithoutTax: 2069.80,
// //       taxAmount: 62.09,
// //       finalPrice: 2131.90,
// //       ingredients: [
// //         { name: "Harina", quantity: 2, price: 506.55, total: 1013.10 },
// //         { name: "Aceite", quantity: 0.1, price: 5625.00, total: 562.50 },
// //         { name: "Huevo", quantity: 6, price: 126.25, total: 757.50 },
// //         { name: "Blando", quantity: 1, price: 3952.50, total: 3952.50 },
// //         { name: "Puerro/Verdeo", quantity: 0.5, price: 2500.00, total: 1250.00 },
// //         { name: "Vino blanco", quantity: 1, price: 2930.00, total: 2930.00 },
// //         { name: "Cebolla", quantity: 0.5, price: 1100.00, total: 550.00 },
// //         { name: "Pimiento", quantity: 0.2, price: 933.33, total: 186.67 },
// //         { name: "Ajo", quantity: 0.4, price: 900.00, total: 360.00 },
// //         { name: "Packaging", quantity: 11, price: 44.23, total: 486.53 },
// //         { name: "Personal", quantity: 2, price: 300.00, total: 600.00 }
// //       ]
// //     },
// //     {
// //       name: "Bondiola a la cerveza",
// //       portions: 9,
// //       costPerPortion: 1514.20,
// //       priceWithoutTax: 2725.57,
// //       taxAmount: 81.77,
// //       finalPrice: 2807.33,
// //       ingredients: [
// //         { name: "Harina", quantity: 2, price: 506.55, total: 1013.10 },
// //         { name: "Aceite", quantity: 0.1, price: 5625.00, total: 562.50 },
// //         { name: "Huevo", quantity: 6, price: 126.25, total: 757.50 },
// //         { name: "Bondiola", quantity: 1, price: 6450.00, total: 6450.00 },
// //         { name: "Puerro/Verdeo", quantity: 0.5, price: 2500.00, total: 1250.00 },
// //         { name: "Cerveza", quantity: 1, price: 1500.00, total: 1500.00 },
// //         { name: "Cebolla", quantity: 0.5, price: 1100.00, total: 550.00 },
// //         { name: "Pimiento", quantity: 0.2, price: 933.33, total: 186.67 },
// //         { name: "Ajo", quantity: 0.4, price: 900.00, total: 360.00 },
// //         { name: "Packaging", quantity: 9, price: 44.23, total: 398.07 },
// //         { name: "Personal", quantity: 2, price: 300.00, total: 600.00 }
// //       ]
// //     },
// //     {
// //       name: "Entraña",
// //       portions: 8,
// //       costPerPortion: 1657.33,
// //       priceWithoutTax: 2983.19,
// //       taxAmount: 89.50,
// //       finalPrice: 3072.68,
// //       ingredients: [
// //         { name: "Harina", quantity: 2, price: 506.55, total: 1013.10 },
// //         { name: "Aceite", quantity: 0.1, price: 5625.00, total: 562.50 },
// //         { name: "Huevo", quantity: 6, price: 126.25, total: 757.50 },
// //         { name: "Entraña", quantity: 1, price: 7125.00, total: 7125.00 },
// //         { name: "Puerro/Verdeo", quantity: 0.5, price: 2500.00, total: 1250.00 },
// //         { name: "Salsa Blanca", quantity: 1, price: 500.00, total: 500.00 },
// //         { name: "Cebolla", quantity: 0.5, price: 1100.00, total: 550.00 },
// //         { name: "Pimiento", quantity: 0.2, price: 933.33, total: 186.67 },
// //         { name: "Ajo", quantity: 0.4, price: 900.00, total: 360.00 },
// //         { name: "Packaging", quantity: 8, price: 44.23, total: 353.84 },
// //         { name: "Personal", quantity: 2, price: 300.00, total: 600.00 }
// //       ]
// //     }
// //   ]
// // };

// // async function main() {
// //   for (const product of seedData.products) {
// //     await prisma.product.create({
// //       data: {
// //         name: product.name,
// //         portions: product.portions,
// //         costPerPortion: product.costPerPortion,
// //         priceWithoutTax: product.priceWithoutTax,
// //         taxAmount: product.taxAmount,
// //         finalPrice: product.finalPrice,
// //         ingredients: {
// //           create: product.ingredients.map(ingredient => ({
// //             name: ingredient.name,
// //             quantity: ingredient.quantity,
// //             price: ingredient.price,
// //             total: ingredient.total
// //           }))
// //         }
// //       }
// //     });
// //   }
// // }

// // main()
// //   .catch(e => console.error(e))
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });