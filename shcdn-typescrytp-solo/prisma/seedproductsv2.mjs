// seedproductsv2.mjs

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Fileto X 450cc",
      portions: 9,
      costPerPortion: 726.14,
      priceWithoutTax: 363.07,
      tax: 10.8921,
      finalPrice: 373.96,
      roundedPrice: 1500,
      ingredients: [
        { ingredientId: 12, quantity: 1, pricePerUnit: 1500, finalPrice: 1500.00 },
        { ingredientId: 13, quantity: 0.5, pricePerUnit: 500, finalPrice: 250.00 },
        { ingredientId: 14, quantity: 0.5, pricePerUnit: 1100, finalPrice: 550.00 },
        { ingredientId: 15, quantity: 0.5, pricePerUnit: 900, finalPrice: 450.00 },
        { ingredientId: 33, quantity: 0.3, pricePerUnit: 2500, finalPrice: 750.00 },
        { ingredientId: 68, quantity: 3, pricePerUnit: 525, finalPrice: 1575.00 },
        { ingredientId: 30, quantity: 9, pricePerUnit: 106, finalPrice: 954.00 },
        { ingredientId: 31, quantity: 1, pricePerUnit: 500, finalPrice: 500.00 }
      ]
    },
    {
      name: "Ñoquis de papa",
      portions: 4,
      costPerPortion: 1985.79,
      priceWithoutTax: 3000,
      tax: 90,
      finalPrice: 3090,
      roundedPrice: 2200,
      ingredients: [
        { ingredientId: 34, quantity: 1, pricePerUnit: 950, finalPrice: 950.00 },
        { ingredientId: 69, quantity: 100, pricePerUnit: 150, finalPrice: 15000.00 },
        { ingredientId: 109, quantity: 1, pricePerUnit: 89950, finalPrice: 89950.00 },
        { ingredientId: 2, quantity: 2, pricePerUnit: 50655, finalPrice: 101310.00 },
        { ingredientId: 145, quantity: 1, pricePerUnit: 4423, finalPrice: 4423.00 },
        { ingredientId: 196, quantity: 2, pricePerUnit: 1000, finalPrice: 2000.00 },
        { ingredientId: 150, quantity: 2, pricePerUnit: 300, finalPrice: 600.00 }
      ]
    },

    // Puedes agregar más productos según sea necesario
];

for (const product of products) {
    await prisma.product.create({
        data : {
            name : product.name,
            portions : product.portions,
            costPerPortion : product.costPerPortion,
            priceWithoutTax : product.priceWithoutTax,
            tax : product.tax,
            finalPrice : product.finalPrice,
            roundedPrice : product.roundedPrice,
            ingredients : {
                create : product.ingredients.map(ingredient => ({
                    ingredientId : ingredient.ingredientId,
                    quantity : ingredient.quantity,
                    pricePerUnit : ingredient.pricePerUnit,
                    finalPrice : ingredient.finalPrice
                }))
            }
        }
    });
}

console.log("Products created successfully!");

}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function ensureIngredientExists(name, unit, price) {
//     const foundIngredient = await prisma.ingredient.findUnique({
//         where: { name },
//     });
//     if (!foundIngredient) {
//         console.log(`Adding missing ingredient: ${name}`);
//         await prisma.ingredient.create({
//             data: {
//                 name,
//                 unit,
//                 price,
//                 quantity: 100, // Ajusta según sea necesario
//             },
//         });
//     }
// }

// async function main() {
//     // Lista de ingredientes a verificar
//     const ingredientsToCheck = [
//         { name: "Huevo", unit: "unidad", price: 126.25 },
//         { name: "Verdeo/Puerro", unit: "unidad", price: 2500 },
//         { name: "Puré de papas", unit: "kg", price: 950 },
//         { name: "Huevos", unit: "unidad", price: 126.25 }, // Asegúrate del nombre correcto
//         // Agrega más ingredientes según sea necesario...
//     ];

//     for (const ingredient of ingredientsToCheck) {
//         await ensureIngredientExists(ingredient.name, ingredient.unit, ingredient.price);
//     }

//     const products = [
//         {
//             name: "Cuatro Quesos",
//             portions: 8,
//             costPerPortion: 1400.18,
//             priceWithoutTax: 700.09,
//             tax: 2100.27,
//             finalPrice: 2163.28,
//             roundedPrice: 2400,
//             ingredients: [
//                 { name: "Harina", quantity: 2, pricePerUnit: 506.55 },
//                 { name: "Aceite", quantity: 0.1, pricePerUnit: 5625 },
//                 { name: "Huevo", quantity: 6, pricePerUnit: 126.25 },
//                 { name: "QUESO MUZARELLA", quantity: 1, pricePerUnit: 5689.50 },
//                 { name: "QUESO ROQUEFORT", quantity: 0.2, pricePerUnit: 5875 },
//                 { name: "QUESO REGIANITO", quantity: 0.2, pricePerUnit: 5250 },
//                 { name: "packaging", quantity: 8, pricePerUnit: 44.23 },
//                 { name: "Personal", quantity: 2, pricePerUnit: 300 }
//             ],
//         },
//         {
//             name: "Cebolla Caramelizada con muzarella",
//             portions: 6,
//             costPerPortion: 1443.32,
//             priceWithoutTax: 721.66,
//             tax: 2164.98,
//             finalPrice: 2229.93,
//             roundedPrice: 2400,
//             ingredients:[
//                 { name:"Harina", quantity :2 , pricePerUnit :506.55},
//                 {name:"Aceite", quantity :0.1 , pricePerUnit :44.23},
//                 {name:"Huevo", quantity :6 , pricePerUnit :126.25},
//                 {name:"CEBOLLA", quantity :0.3 , pricePerUnit :1100},
//                 {name:"MUZARELLA", quantity :1 , pricePerUnit :5689.50},
//                 {name:"packaging", quantity :6 , pricePerUnit :44.23},
//                 {name:"Personal", quantity :2 , pricePerUnit :300}
//             ],
//         },
//         {
//             name:"Jamon y Queso",
//             portions :9,
//             costPerPortion :1310.50,
//             priceWithoutTax :655.25,
//             tax:null, // Aquí puedes calcularlo si es necesario.
//             finalPrice:null, // Aquí puedes calcularlo si es necesario.
//             roundedPrice :2300,
//             ingredients:[
//                 { name:"Harina", quantity :2 , pricePerUnit :506.55},
//                 {name:"Aceite", quantity :0.1 , pricePerUnit :null}, // Si no hay precio definido
//                 {name:"Huevo", quantity :6 , pricePerUnit :126.25},
//                 {name:"JAMON", quantity :1 , pricePerUnit :6750},
//                 {name:"QUESO MUZARELLA", quantity :0.4 , pricePerUnit :5689.50},
//                 {name:"packaging", quantity :9 , pricePerUnit :44.23},
//                 {name:"Personal", quantity :2 , pricePerUnit :300}
//             ]
//         },
//         {
//             name:"Bolognesa X 450cc",
//             portions :9,
//             costPerPortion :1512.40,
//             priceWithoutTax :756.20,
//             tax:null, // Aquí puedes calcularlo si es necesario.
//             finalPrice:null, // Aquí puedes calcularlo si es necesario.
//             roundedPrice :2200,
//             ingredients:[
//                 { name:"Cebolla", quantity :1 , pricePerUnit :1100},
//                 {name:"Pimiento", quantity :0.5 , pricePerUnit :933.33},
//                 {name:"Zanahoria", quantity :0.5 , pricePerUnit :1100},
//                 {name:"Ajo", quantity :0.5 , pricePerUnit :900},
//                 {name:"Verdeo/Puerro", quantity :0.3 , pricePerUnit :2500},
//                 {name:"Pure de tomate", quantity :4 , pricePerUnit :525},
//                 {name:"Bisagra chico", quantity :20 , pricePerUnit :44.23},
//                 {name:"packaging", quantity :9 , pricePerUnit :106.70},
//                 {name:"Personal", quantity :1 , pricePerUnit :500},
//                 {name:"carne", quantity :1 , pricePerUnit :5850}
//             ],
//         },
//         {
//             name:"Fileto X 450cc",
//             portions :9,
//             costPerPortion :726.14,
//             priceWithoutTax :363.07,
//             tax:null, // Aquí puedes calcularlo si es necesario.
//             finalPrice:null, // Aquí puedes calcularlo si es necesario.
//             roundedPrice :1500,
//             ingredients:[
//                 {name:"Cebolla" ,quantity :1 ,pricePerUnit :1500},
//                 {name:"Pimiento" ,quantity :0.5 ,pricePerUnit :500},
//                 {name:"Zanahoria" ,quantity :0.5 ,pricePerUnit :1100},
//                 {name:"Ajo" ,quantity :0.5 ,pricePerUnit :900},
//                 {name:"Verdeo/Puerro" ,quantity :0.3 ,pricePerUnit :2500},
//                 {name:"Pure de tomate" ,quantity :3 ,pricePerUnit :525},
//                 {name:"packaging" ,quantity :9 ,pricePerUnit :"106"}, // Cambia a número si es posible
//                 {name:"Personal" ,quantity :1 ,pricePerUnit :"500"} // Cambia a número si es posible
//             ]
//         },
//         {
//             name:"Ñoquis de papa",
//             portions: 4, // Cambiar a número
//             costPerPortion: parseFloat("1985.79"), // Cambiar a float
//             priceWithoutTax: parseFloat("3000"), // Cambiar a float
//             tax:null,// No se especifica
//             finalPrice:null,// No se especifica
//             roundedPrice :"2200",
//             ingredients:[
//                 { name :"Puré de papas" ,quantity :1 ,pricePerUnit :(950)}, // Cambiar a número si es posible
//                 { name :"manteca" ,quantity :(100) ,pricePerUnit :(150)}, // Cambiar a número si es posible
//                 { name :"Leche" ,quantity :(1) ,pricePerUnit :(89950)}, // Cambiar a número si es posible
//                 { name :"Harina" ,quantity :(2) ,pricePerUnit :(50655)}, // Cambiar a número si es posible
//                 { name :"Bandeja" ,quantity :(1) ,pricePerUnit :(4423)}, // Cambiar a número si es posible
//                 // Si no hay precio definido 
//                 { name :"vs" ,quantity :(2) ,pricePerUnit:null}, 
//                  // Si no hay precio definido 
//                  { name :"personal" ,quantity :(2) ,pricePerUnit :(300)} 
//              ]
//          },
//          {
//              name:"Tallarines al huevo",
//              portions:9, // Cambiar a número
//              costPerPortion:(1145.85), // Cambiar a float
//              priceWithoutTax:(2000), // Cambiar a float
//              tax:null,// No se especifica 
//              finalPrice:(2000),// Cambiar a float o null según sea necesario
//              roundedPrice:(1500),
//              ingredients:[
//                  // Ingredientes del producto 
//                  { name :"Harina" ,quantity :(6) ,pricePerUnit :(50655)}, 
//                  // Ingredientes del producto 
//                  { name :"Huevos" ,quantity :(20) ,pricePerUnit :(12625)},
//                  // Ingredientes del producto...
//                  { name :"Aceite" ,quantity :(0.2) ,pricePerUnit :(5625)},
//                  // Ingredientes del producto 
//                  { name :"Bandejas" ,quantity :(9) ,pricePerUnit :(4423)},
//                  // Ingredientes del producto 
//                  { name :"personal" ,quantity :(2) ,pricePerUnit :(300)} 
//              ]
//          }
//      ];

//     for (const product of products) {
//         try {
//           const ingredients = await Promise.all(
//               product.ingredients.map(async (ingredient) => {
//                   const foundIngredient = await prisma.ingredient.findUnique({
//                       where:{name: ingredient.name}
//                   });
//                   if (!foundIngredient) {
//                       throw new Error(`Ingredient not found:${ingredient.name}`);
//                   }
//                   return {
//                       ingredientId: foundIngredient.id,
//                       quantity: ingredient.quantity,
//                       pricePerUnit: ingredient.pricePerUnit || foundIngredient.price,
//                       finalPrice:(ingredient.pricePerUnit || foundIngredient.price) * ingredient.quantity
//                   };
//               })
//           );

//           await prisma.product.create({
//               data:{
//                   name: product.name,
//                   portions: product.portions,
//                   costPerPortion:
//                       product.costPerPortion || (product.priceWithoutTax / product.portions),
//                   priceWithoutTax:
//                       product.priceWithoutTax || ingredients.reduce((sum, ing) => sum + ing.finalPrice, 0),
//                   tax:
//                       (product.tax || (product.priceWithoutTax * .03)), // Calcula el impuesto si no está definido.
//                   finalPrice:
//                       (product.finalPrice || (product.priceWithoutTax + (product.priceWithoutTax * .03))), // Calcula el precio final si no está definido.
//                   roundedPrice:(product.roundedPrice),
//                   ingredients:{
//                       create:(ingredients)
//                   }
//               }
//           });
//       } catch (error) {
//           console.error(`Error creating product ${product.name}:`, error.message);
//       }
//     }

//     console.log("Products created successfully!");
// }

// main()
// .catch((e) => {
//     console.error(e);
// })
// .finally(async () => {
//     await prisma.$disconnect();
// });
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function ensureIngredientExists(name, unit, price) {
//   const foundIngredient = await prisma.ingredient.findUnique({
//     where: { name },
//   });

//   if (!foundIngredient) {
//     console.log(`Adding missing ingredient: ${name}`);
//     await prisma.ingredient.create({
//       data: {
//         name,
//         unit,
//         price,
//         quantity: 100, // Ajusta según sea necesario
//       },
//     });
//   }
// }

// async function main() {
//   // Lista de ingredientes a verificar
//   const ingredientsToCheck = [
//     { name: "Huevo", unit: "unidad", price: 126.25 },
//     { name: "Verdeo/Puerro", unit: "unidad", price: 2500 },
//     { name: "Puré de papas", unit: "kg", price: 950 },
//     { name: "Huevos", unit: "unidad", price: 126.25 }, // Asegúrate del nombre correcto
//     // Agrega más ingredientes según sea necesario...
//   ];

//   for (const ingredient of ingredientsToCheck) {
//     await ensureIngredientExists(ingredient.name, ingredient.unit, ingredient.price);
//   }

//   const products = [
//     {
//       name: "Cuatro Quesos",
//       portions: 8,
//       costPerPortion: 1400.18,
//       priceWithoutTax: 700.09,
//       tax: 2100.27,
//       finalPrice: 2163.28,
//       roundedPrice: 2400,
//       ingredients: [
//         { name: "Harina", quantity: 2, pricePerUnit: 506.55 },
//         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625 },
//         { name: "Huevo", quantity: 6, pricePerUnit: 126.25 },
//         { name: "QUESO MUZARELLA", quantity: 1, pricePerUnit: 5689.50 },
//         { name: "QUESO ROQUEFORT", quantity: 0.2, pricePerUnit: 5875 },
//         { name: "QUESO REGIANITO", quantity: 0.2, pricePerUnit: 5250 },
//         { name: "packaging", quantity: 8, pricePerUnit: 44.23 },
//         { name: "Personal", quantity: 2, pricePerUnit: 300 }
//       ],
//     },
//     {
//       name: "Cebolla Caramelizada con muzarella",
//       portions: 6,
//       costPerPortion: 1443.32,
//       priceWithoutTax: 721.66,
//       tax: 2164.98,
//       finalPrice: 2229.93,
//       roundedPrice: 2400,
//       ingredients:[
//         { name:"Harina", quantity :2 , pricePerUnit :506.55},
//         {name:"Aceite", quantity :0.1 , pricePerUnit :44.23},
//         {name:"Huevo", quantity :6 , pricePerUnit :126.25},
//         {name:"CEBOLLA", quantity :0.3 , pricePerUnit :1100},
//         {name:"MUZARELLA", quantity :1 , pricePerUnit :5689.50},
//         {name:"packaging", quantity :6 , pricePerUnit :44.23},
//         {name:"Personal", quantity :2 , pricePerUnit :300}
//       ],
//     },
//     {
//       name:"Jamon y Queso",
//       portions :9,
//       costPerPortion :1310.50,
//       priceWithoutTax :655.25,
//       tax:null,
//       finalPrice:null,
//       roundedPrice :2300,
//       ingredients:[
//         { name:"Harina", quantity :2 , pricePerUnit :506.55},
//         {name:"Aceite", quantity :0.1 , pricePerUnit :null}, // Si no hay precio definido
//         {name:"Huevo", quantity :6 , pricePerUnit :126.25},
//         {name:"JAMON", quantity :1 , pricePerUnit :6750},
//         {name:"QUESO MUZARELLA", quantity :0.4 , pricePerUnit :5689.50},
//         {name:"packaging", quantity :9 , pricePerUnit :44.23},
//         {name:"Personal", quantity :2 , pricePerUnit :300}
//       ]
//     },
//     {
//       name:"Bolognesa X 450cc",
//       portions :9,
//       costPerPortion :1512.40,
//       priceWithoutTax :756.20,
//       tax:null, // Aquí puedes calcularlo si es necesario.
//       finalPrice:null, // Aquí puedes calcularlo si es necesario.
//       roundedPrice :2200,
//       ingredients:[
//         { name:"Cebolla", quantity :1 , pricePerUnit :1100},
//         {name:"Pimiento", quantity :0.5 , pricePerUnit :933.33},
//         {name:"Zanahoria", quantity :0.5 , pricePerUnit :1100},
//         {name:"Ajo", quantity :0.5 , pricePerUnit :900},
//         {name:"Verdeo/Puerro", quantity :0.3 , pricePerUnit :2500},
//         {name:"Pure de tomate", quantity :4 , pricePerUnit :525},
//         {name:"Bisagra chico", quantity :20 , pricePerUnit :44.23},
//         {name:"packaging", quantity :9 , pricePerUnit :106.70},
//         {name:"Personal", quantity :1 , pricePerUnit :500},
//         {name:"carne", quantity :1 , pricePerUnit :5850}
//       ],
//     },
//     {
//       name:"Fileto X 450cc",
//       portions :9,
//       costPerPortion :726.14,
//       priceWithoutTax :363.07,
//       tax:null, // Aquí puedes calcularlo si es necesario.
//       finalPrice:null, // Aquí puedes calcularlo si es necesario.
//       roundedPrice :1500,
//       ingredients:[
//           {name:"Cebolla" ,quantity :1 ,pricePerUnit :1500},
//           {name:"Pimiento" ,quantity :0.5 ,pricePerUnit :500},
//           {name:"Zanahoria" ,quantity :0.5 ,pricePerUnit :1100},
//           {name:"Ajo" ,quantity :0.5 ,pricePerUnit :900},
//           {name:"Verdeo/Puerro" ,quantity :0.3 ,pricePerUnit :2500},
//           {name:"Pure de tomate" ,quantity :3 ,pricePerUnit :525},
//           {name:"packaging" ,quantity :9 ,pricePerUnit :106},
//           {name:"Personal" ,quantity :1 ,pricePerUnit :500}
//        ]
//     },
//     {
//        name:"Ñoquis de papa",
//        portions :"4",
//        costPerPortion :"1985,79",
//        priceWithoutTax :"3000,00",
//        tax:null,// No se especifica
//        finalPrice :"3000,00",
//        roundedPrice :"2200",
//        ingredients:[
//           {name :"Puré de papas" ,quantity :1 ,pricePerUnit :950},
//           {name :"manteca" ,quantity :100 ,pricePerUnit :150},
//           {name :"Leche" ,quantity :1 ,pricePerUnit :89950},
//           {name :"Harina" ,quantity :2 ,pricePerUnit :50655},
//           {name :"Bandeja" ,quantity :1 ,pricePerUnit :4423},
//           // Si no hay precio definido
//           {name :"vs" ,quantity :2 ,pricePerUnit:null}, 
//           // Si no hay precio definido
//           {name :"personal" ,quantity :2 ,pricePerUnit :300}
//        ]
//     },
//     {
//        name:"Tallarines al huevo",
//        portions :"9",
//        costPerPortion :"1145,85",
//        priceWithoutTax :"2000,00",
//        tax:null,// No se especifica
//        finalPrice :"2000,00",
//        roundedPrice :"1500",
//        ingredients:[
//            // Ingredientes del producto
//            {name :"Harina" ,quantity :"6" ,pricePerUnit :50655},
//            // Ingredientes del producto
//            {name :"Huevos" ,quantity :"20" ,pricePerUnit :12625},
//            // Ingredientes del producto
//            {name :"Aceite" ,quantity :"0,2" ,pricePerUnit :5625},
//            // Ingredientes del producto
//            {name :"Bandejas" ,quantity :"9" ,pricePerUnit :4423},
//            // Ingredientes del producto
//            {name :"personal" ,quantity :"2" ,pricePerUnit :300}
//        ]
//    }
//    ];

//    for (const product of products) {
//      try {
//        const ingredients = await Promise.all(
//          product.ingredients.map(async (ingredient) => {
//            const foundIngredient = await prisma.ingredient.findUnique({
//              where:{name : ingredient.name}
//            });

//            if (!foundIngredient) {
//              throw new Error(`Ingredient not found:${ingredient.name}`);
//            }

//            return {
//              ingredientId : foundIngredient.id,
//              quantity     : ingredient.quantity,
//              pricePerUnit     :
//               ingredient.pricePerUnit || foundIngredient.price,
//              finalPrice   :
//               (ingredient.pricePerUnit || foundIngredient.price) * ingredient.quantity 
//            };
//          })
//        );

//        await prisma.product.create({
//          data:{
//            name              :
//             product.name,
//            portions          :
//             product.portions,
//            costPerPortion    :
//             product.costPerPortion || (product.priceWithoutTax / product.portions),
//            priceWithoutTax   :
//             product.priceWithoutTax || ingredients.reduce((sum, ing) => sum + ing.finalPrice, 0),
//            tax               :
//             (product.tax || (product.priceWithoutTax * .03)), // Calcula el impuesto si no está definido.
//            finalPrice        :
//             (product.finalPrice || (product.priceWithoutTax + (product.priceWithoutTax * .03))), // Calcula el precio final si no está definido.
//            roundedPrice     :
//             (product.roundedPrice),
//            ingredients:{
//              create            :(ingredients)
//             }
//          }
//        });

//      } catch (error) {
//        console.error(`Error creating product ${product.name}:`, error.message);
//      }
//    }

//    console.log("Products created successfully!");
// }

// main()
// .catch((e) => {
//  console.error(e);
// })
// .finally(async () => {
//  await prisma.$disconnect();
// });
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // async function ensureIngredientExists(name, unit, price) {
// //   const foundIngredient = await prisma.ingredient.findUnique({
// //     where: { name },
// //   });

// //   if (!foundIngredient) {
// //     console.log(`Adding missing ingredient: ${name}`);
// //     await prisma.ingredient.create({
// //       data: {
// //         name,
// //         unit,
// //         price,
// //         quantity: 100, // Ajusta según sea necesario
// //       },
// //     });
// //   }
// // }

// // async function main() {
// //   // Lista de ingredientes a verificar
// //   const ingredientsToCheck = [
// //     { name: "Huevo", unit: "unidad", price: 126.25 },
// //     { name: "Verdeo/Puerro", unit: "unidad", price: 2500 },
// //     { name: "Puré de papas", unit: "kg", price: 950 },
// //     { name: "Huevos", unit: "unidad", price: 126.25 }, // Asegúrate del nombre correcto
// //     // Agrega más ingredientes según sea necesario...
// //   ];

// //   for (const ingredient of ingredientsToCheck) {
// //     await ensureIngredientExists(ingredient.name, ingredient.unit, ingredient.price);
// //   }

// //   const products = [
// //     // Aquí va toda la definición de productos como antes...
// //     // Asegúrate de incluir todos los productos aquí.
// //   ];

// //   for (const product of products) {
// //     try {
// //       const ingredients = await Promise.all(
// //         product.ingredients.map(async (ingredient) => {
// //           const foundIngredient = await prisma.ingredient.findUnique({
// //             where:{name : ingredient.name}
// //           });

// //           return {
// //             ingredientId : foundIngredient.id,
// //             quantity : ingredient.quantity,
// //             pricePerUnit : ingredient.pricePerUnit || foundIngredient.price,
// //             finalPrice : (ingredient.pricePerUnit || foundIngredient.price) * ingredient.quantity 
// //           };
// //         })
// //       );

// //       await prisma.product.create({
// //         data:{
// //           name              : product.name,
// //           portions          : product.portions,
// //           costPerPortion    : product.costPerPortion || (product.priceWithoutTax / product.portions),
// //           priceWithoutTax   : product.priceWithoutTax || ingredients.reduce((sum, ing) => sum + ing.finalPrice, 0),
// //           tax               :(product.tax || (product.priceWithoutTax * .03)), // Calcula el impuesto si no está definido.
// //           finalPrice        :(product.finalPrice || (product.priceWithoutTax + (product.priceWithoutTax * .03))), // Calcula el precio final si no está definido.
// //           roundedPrice      :(product.roundedPrice),
// //           ingredients:{
// //             create            :(ingredients)
// //           }
// //         }
// //       });

// //     } catch (error) {
// //       console.error(`Error creating product ${product.name}:`, error.message);
// //     }
// //   }

// //   console.log("Products created successfully!");
// // }

// // main()
// // .catch((e) => {
// //  console.error(e);
// // })
// // .finally(async () => {
// //  await prisma.$disconnect();
// // });
// //este CODIGO ANDANDO CHALAAA
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // async function main() {
// //   const products = [
// //     {
// //       name: "Cuatro Quesos",
// //       portions: 8,
// //       costPerPortion: 1400.18,
// //       priceWithoutTax: 700.09,
// //       tax: 2100.27,
// //       finalPrice: 2163.28,
// //       roundedPrice: 2400,
// //       ingredients: [
// //         { name: "Harina", quantity: 2, pricePerUnit: 506.55 },
// //         { name: "Aceite", quantity: 0.1, pricePerUnit: 5625 },
// //         { name: "Huevo", quantity: 6, pricePerUnit: 126.25 },
// //         { name: "QUESO MUZARELLA", quantity: 1, pricePerUnit: 5689.50 },
// //         { name: "QUESO ROQUEFORT", quantity: 0.2, pricePerUnit: 5875 },
// //         { name: "QUESO REGIANITO", quantity: 0.2, pricePerUnit: 5250 },
// //         { name: "packaging", quantity: 8, pricePerUnit: 44.23 },
// //         { name: "Personal", quantity: 2, pricePerUnit: 300 }
// //       ],
// //     },
// //     {
// //       name: "Cebolla Caramelizada con muzarella",
// //       portions: 6,
// //       costPerPortion: 1443.32,
// //       priceWithoutTax: 721.66,
// //       tax: 2164.98,
// //       finalPrice: 2229.93,
// //       roundedPrice: 2400,
// //       ingredients: [
// //         { name: "Harina", quantity: 2, pricePerUnit: 506.55 },
// //         { name: "Aceite", quantity: 0.1, pricePerUnit: 44.23 },
// //         { name: "Huevo", quantity: 6, pricePerUnit: 126.25 },
// //         { name: "CEBOLLA", quantity: 0.3, pricePerUnit: 1100 },
// //         { name: "MUZARELLA", quantity: 1, pricePerUnit: 5689.50 },
// //         { name: "packaging", quantity: 6, pricePerUnit: 44.23 },
// //         { name: "Personal", quantity: 2, pricePerUnit: 300 }
// //       ],
// //     },
// //     {
// //       name: "Jamon y Queso",
// //       portions: 9,
// //       costPerPortion: 1310.50,
// //       priceWithoutTax: 655.25,
// //       tax: null,
// //       finalPrice: null,
// //       roundedPrice: 2300,
// //       ingredients:[
// //         { name:"Harina", quantity :2 , pricePerUnit :506.55},
// //         {name:"Aceite", quantity :0.1 , pricePerUnit :null},
// //         {name:"Huevo", quantity :6 , pricePerUnit :126.25},
// //         {name:"JAMON", quantity :1 , pricePerUnit :6750},
// //         {name:"QUESO MUZARELLA", quantity :0.4 , pricePerUnit :5689.50},
// //         {name:"packaging", quantity :9 , pricePerUnit :44.23},
// //         {name:"Personal", quantity :2 , pricePerUnit :300}
// //       ]
// //     },
// //     {
// //       name: "Bolognesa X 450cc",
// //       portions: 9,
// //       costPerPortion: 1512.40,
// //       priceWithoutTax: 756.20,
// //       tax: null,
// //       finalPrice: null,
// //       roundedPrice: 2200,
// //       ingredients:[
// //         { name:"Cebolla", quantity :1 , pricePerUnit :1100},
// //         {name:"Pimiento", quantity :0.5 , pricePerUnit :933.33},
// //         {name:"Zanahoria", quantity :0.5 , pricePerUnit :1100},
// //         {name:"Ajo", quantity :0.5 , pricePerUnit :900},
// //         {name:"Verdeo/Puerro", quantity :0.3 , pricePerUnit :2500},
// //         {name:"Pure de tomate", quantity :4 , pricePerUnit :525},
// //         {name:"Bisagra chico", quantity :20 , pricePerUnit :44.23},
// //         {name:"packaging", quantity :9 , pricePerUnit :106.70},
// //         {name:"Personal", quantity :1 , pricePerUnit :500},
// //         {name:"carne", quantity :1 , pricePerUnit :5850}
// //       ],
// //     },
// //     {
// //       name:"Fileto X 450cc",
// //       portions :9,
// //       costPerPortion :726.14,
// //       priceWithoutTax :363.07,
// //       tax:null,
// //       finalPrice:null,
// //       roundedPrice :1500,
// //       ingredients:[
// //           {name:"Cebolla" ,quantity :1 ,pricePerUnit :1500},
// //           {name:"Pimiento" ,quantity :0.5 ,pricePerUnit :500},
// //           {name:"Zanahoria" ,quantity :0.5 ,pricePerUnit :1100},
// //           {name:"Ajo" ,quantity :0.5 ,pricePerUnit :900},
// //           {name:"Verdeo/Puerro" ,quantity :0.3 ,pricePerUnit :2500},
// //           {name:"Pure de tomate" ,quantity :3 ,pricePerUnit :525},
// //           {name:"packaging" ,quantity :9 ,pricePerUnit :106.70},
// //           {name:"Personal" ,quantity :1 ,pricePerUnit :500}
// //        ]
// //     },
// //     {
// //       name:"Ñoquis de papa",
// //       portions :4,
// //       costPerPortion :1985.79,
// //       priceWithoutTax :3000.00,
// //       tax:null,
// //       finalPrice :3000.00,
// //       roundedPrice :2200,
// //        ingredients:[
// //           {name :"Puré de papas" ,quantity :1 ,pricePerUnit :950},
// //           {name :"manteca" ,quantity :"100" ,pricePerUnit :"1,50"},
// //           {name :"Leche" ,quantity :"1" ,pricePerUnit :"899,50"},
// //           {name :"Harina" ,quantity :"2" ,pricePerUnit :"506,55"},
// //           {name :"Bandeja" ,quantity :"1" ,pricePerUnit :"44,23"},
// //           // Si no hay precio definido
// //           {name :"vs" ,quantity :"2" ,pricePerUnit:null}, 
// //           // Si no hay precio definido
// //           {name :"personal" ,quantity :"2" ,pricePerUnit :"300"}
// //        ]
// //     },
// //     {
// //        name:"Tallarines al huevo",
// //        portions :"9",
// //        costPerPortion :"1145,85",
// //        priceWithoutTax :"2000,00",
// //        tax:null,// No se especifica
// //        finalPrice :"2000,00",
// //        roundedPrice :"1500",
// //        ingredients:[
// //            // Ingredientes del producto
// //            {name :"Harina" ,quantity :"6" ,pricePerUnit :"506,55"},
// //            // Ingredientes del producto
// //            {name :"Huevos" ,quantity :"20" ,pricePerUnit :"126,25"},
// //            // Ingredientes del producto
// //            {name :"Aceite" ,quantity :"0,2" ,pricePerUnit :"5625"},
// //            // Ingredientes del producto
// //            {name :"Bandejas" ,quantity :"9" ,pricePerUnit :"44,23"},
// //            // Ingredientes del producto
// //            {name :"personal" ,quantity :"2" ,pricePerUnit :"300"}
// //        ]
// //    }
// //    ];

// //    for (const product of products) {
// //      try {
// //        const ingredients = await Promise.all(
// //          product.ingredients.map(async (ingredient) => {
// //            const foundIngredient = await prisma.ingredient.findUnique({
// //              where:{name : ingredient.name}
// //            });

// //            if (!foundIngredient) {
// //              throw new Error(`Ingredient not found:${ingredient.name}`);
// //            }

// //            return {
// //              ingredientId : foundIngredient.id,
// //              quantity : ingredient.quantity,
// //              pricePerUnit : ingredient.pricePerUnit || foundIngredient.price,
// //              finalPrice:(ingredient.pricePerUnit || foundIngredient.price) * ingredient.quantity 
// //            };
// //          })
// //        );

// //        await prisma.product.create({
// //          data:{
// //            name              : product.name,
// //            portions          : product.portions,
// //            costPerPortion    : product.costPerPortion || (product.priceWithoutTax / product.portions),
// //            priceWithoutTax   : product.priceWithoutTax || ingredients.reduce((sum, ing) => sum + ing.finalPrice, 0),
// //            tax               :(product.tax || (product.priceWithoutTax * .03)), // Calcula el impuesto si no está definido.
// //            finalPrice        :(product.finalPrice || (product.priceWithoutTax + (product.priceWithoutTax * .03))), // Calcula el precio final si no está definido.
// //            roundedPrice     :(product.roundedPrice),
// //            ingredients:{
// //              create            :(ingredients)
// //             }
// //          }
// //        });

// //      } catch (error) {
// //        console.error(`Error creating product ${product.name}:`, error.message);
// //      }
// //    }

// //    console.log("Products created successfully!");
// // }

// // main()
// // .catch((e) => {
// //  console.error(e);
// // })
// // .finally(async () => {
// //  await prisma.$disconnect();
// // });
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // async function main() {
// //   const products = [
// //     {
// //       name: "Raviolones",
// //       portions: 20, // Establece este valor según tus necesidades
// //       ingredients: [
// //         { name: "Harina", quantity: 2.5 },
// //         { name: "Aceite", quantity: 0.1 },
// //         { name: "Huevos unidad", quantity: 5 },
// //         { name: "Bondiola de cerdo", quantity: 1 },
// //         { name: "Espinaca", quantity: 3 },
// //         { name: "Cebolla", quantity: 0.5 },
// //         { name: "Pimiento", quantity: 0.2 },
// //         { name: "Ajo", quantity: 0.2 },
// //         { name: "packaging", quantity: 20 },
// //         { name: "Personal", quantity: 20 }
// //       ],
// //     },
// //     // Agrega más productos aquí...
// //   ];

// //   for (const product of products) {
// //     try {
// //       const ingredients = await Promise.all(
// //         product.ingredients.map(async (ingredient) => {
// //           const foundIngredient = await prisma.ingredient.findUnique({
// //             where: { name: ingredient.name },
// //           });

// //           if (!foundIngredient) {
// //             throw new Error(`Ingredient not found: ${ingredient.name}`);
// //           }

// //           return {
// //             ingredientId: foundIngredient.id,
// //             quantity: ingredient.quantity,
// //             pricePerUnit: foundIngredient.price,
// //             finalPrice: foundIngredient.price * ingredient.quantity,
// //           };
// //         })
// //       );

// //       // Calcular el costo total de los ingredientes
// //       const totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.finalPrice, 0);
// //       const costPerPortion = totalCost / product.portions; // Costo por porción

// //       // Definir impuestos (por ejemplo, 21%)
// //       const taxRate = 0.21;
// //       const priceWithoutTax = totalCost; // O puedes definirlo como desees
// //       const tax = priceWithoutTax * taxRate; // Impuesto
// //       const finalPrice = priceWithoutTax + tax; // Precio final con impuestos
// //       const roundedPrice = Math.round(finalPrice); // Precio redondeado

// //       await prisma.product.create({
// //         data: {
// //           name: product.name,
// //           portions: product.portions,
// //           costPerPortion, // Costo por porción
// //           priceWithoutTax, // Precio antes de impuestos
// //           tax,             // Impuesto
// //           finalPrice,     // Precio final con impuestos
// //           roundedPrice,   // Precio redondeado
// //           ingredients: {
// //             create: ingredients,
// //           },
// //         },
// //       });

// //     } catch (error) {
// //       console.error(`Error creating product ${product.name}:`, error.message);
// //     }
// //   }

// //   console.log("Products created successfully!");
// // }

// // main()
// //   .catch((e) => {
// //     console.error(e);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();

// // async function main() {
// //   const products = [
// //     {
// //       name: "Raviolones",
// //       portions: 20, // Asegúrate de establecer este valor según tus necesidades
// //       ingredients: [
// //         { name: "Harina", quantity: 2.5 },
// //         { name: "Aceite", quantity: 0.1 },
// //         { name: "Huevos unidad", quantity: 5 },
// //         { name: "Bondiola de cerdo", quantity: 1 },
// //         { name: "Espinaca", quantity: 3 },
// //         { name: "Cebolla", quantity: 0.5 },
// //         { name: "Pimiento", quantity: 0.2 },
// //         { name: "Ajo", quantity: 0.2 },
// //         { name: "packaging", quantity: 20 },
// //         { name: "Personal", quantity: 20 }
// //       ],
// //     },
// //     // Agrega más productos aquí...
// //   ];

// //   for (const product of products) {
// //     try {
// //       const ingredients = await Promise.all(
// //         product.ingredients.map(async (ingredient) => {
// //           const foundIngredient = await prisma.ingredient.findUnique({
// //             where: { name: ingredient.name },
// //           });

// //           if (!foundIngredient) {
// //             throw new Error(`Ingredient not found: ${ingredient.name}`);
// //           }

// //           return {
// //             ingredientId: foundIngredient.id,
// //             quantity: ingredient.quantity,
// //             pricePerUnit: foundIngredient.price,
// //             finalPrice: foundIngredient.price * ingredient.quantity,
// //           };
// //         })
// //       );

// //       // Calcular el costo total de los ingredientes
// //       const totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.finalPrice, 0);
// //       const costPerPortion = totalCost / product.portions; // Costo por porción

// //       await prisma.product.create({
// //         data: {
// //           name: product.name,
// //           portions: product.portions,
// //           costPerPortion, // Agregar el costo por porción
// //           priceWithoutTax,
// //           ingredients: {
// //             create: ingredients,
// //           },
// //         },
// //       });

// //     } catch (error) {
// //       console.error(`Error creating product ${product.name}:`, error.message);
// //     }
// //   }

// //   console.log("Products created successfully!");
// // }

// // main()
// //   .catch((e) => {
// //     console.error(e);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });
// // // import { PrismaClient } from '@prisma/client';

// // // const prisma = new PrismaClient();

// // // async function main() {
// // //   const products = [
// // //     {
// // //       name: "Raviolones",
// // //       portions: 20, // Asegúrate de agregar este campo si es requerido
// // //       costPerPortion: 855,
// // //       ingredients: [
// // //         { name: "Harina", quantity: 2.5 },
// // //         { name: "Aceite", quantity: 0.1 },
// // //         { name: "Huevos unidad", quantity: 5 },
// // //         { name: "Bondiola de cerdo", quantity: 1 },
// // //         { name: "Espinaca", quantity: 3 },
// // //         { name: "Cebolla", quantity: 0.5 },
// // //         { name: "Pimiento", quantity: 0.2 },
// // //         { name: "Ajo", quantity: 0.2 },
// // //         { name: "packaging", quantity: 20 },
// // //         { name: "Personal", quantity: 20 }
// // //       ],
// // //     },
// // //     // Agrega más productos aquí...
// // //   ];

// // //   for (const product of products) {
// // //     try {
// // //       const ingredients = await Promise.all(
// // //         product.ingredients.map(async (ingredient) => {
// // //           const foundIngredient = await prisma.ingredient.findUnique({
// // //             where: { name: ingredient.name },
// // //           });

// // //           if (!foundIngredient) {
// // //             throw new Error(`Ingredient not found: ${ingredient.name}`);
// // //           }

// // //           return {
// // //             ingredientId: foundIngredient.id,
// // //             quantity: ingredient.quantity,
// // //             pricePerUnit: foundIngredient.price,
// // //             finalPrice: foundIngredient.price * ingredient.quantity,
// // //           };
// // //         })
// // //       );

// // //       await prisma.product.create({
// // //         data: {
// // //           name: product.name,
// // //           portions: product.portions, // Asegúrate de incluir este campo
// // //           ingredients: {
// // //             create: ingredients,
// // //           },
// // //         },
// // //       });

// // //     } catch (error) {
// // //       console.error(`Error creating product ${product.name}:`, error.message);
// // //     }
// // //   }

// // //   console.log("Products created successfully!");
// // // }

// // // main()
// // //   .catch((e) => {
// // //     console.error(e);
// // //   })
// // //   .finally(async () => {
// // //     await prisma.$disconnect();
// // //   });
// // // // import { PrismaClient } from '@prisma/client';

// // // // const prisma = new PrismaClient();

// // // // async function main() {
// // // //   // Definir los productos y sus ingredientes
// // // //   const products = [
// // // //     {
// // // //       name: "Raviolones",
// // // //       ingredients: [
// // // //         { name: "Harina", quantity: 2.5 },
// // // //         { name: "Aceite", quantity: 0.1 },
// // // //         { name: "Huevos unidad", quantity: 5 },
// // // //         { name: "Bondiola de cerdo", quantity: 1 },
// // // //         { name: "Espinaca", quantity: 3 },
// // // //         { name: "Cebolla", quantity: 0.5 },
// // // //         { name: "Pimiento", quantity: 0.2 },
// // // //         { name: "Ajo", quantity: 0.2 },
// // // //         { name: "packaging", quantity: 20 },
// // // //         { name: "Personal", quantity: 20 }
// // // //       ],
// // // //     },
// // // //     // Agrega los demás productos aquí...
// // // //   ];

// // // //   for (const product of products) {
// // // //     const ingredients = await Promise.all(
// // // //       product.ingredients.map(async (ingredient) => {
// // // //         const foundIngredient = await prisma.ingredient.findUnique({
// // // //           where: { name: ingredient.name },
// // // //         });

// // // //         if (!foundIngredient) {
// // // //           throw new Error(`Ingredient not found: ${ingredient.name}`);
// // // //         }

// // // //         return {
// // // //           ingredientId: foundIngredient.id,
// // // //           quantity: ingredient.quantity,
// // // //           pricePerUnit: foundIngredient.price,
// // // //           finalPrice: foundIngredient.price * ingredient.quantity,
// // // //         };
// // // //       })
// // // //     );

// // // //     await prisma.product.create({
// // // //       data: {
// // // //         name: product.name,
// // // //         ingredients: {
// // // //           create: ingredients,
// // // //         },
// // // //       },
// // // //     });
// // // //   }

// // // //   console.log("Products created successfully!");
// // // // }

// // // // main()
// // // //   .catch((e) => {
// // // //     console.error(e);
// // // //   })
// // // //   .finally(async () => {
// // // //     await prisma.$disconnect();
// // // //   });
