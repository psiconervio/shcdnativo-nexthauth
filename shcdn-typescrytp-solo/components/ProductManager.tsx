// // app/components/ProductManager.tsx
// import { useEffect, useState } from "react";

// export default function ProductManager() {
//   const [view, setView] = useState<"list" | "form">("list");
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [ingredientsList, setIngredientsList] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     portions: 0,
//     costPerPortion: 0,
//     priceWithoutTax: 0,
//     tax: 0,
//     finalPrice: 0,
//     roundedPrice: 0,
//     ingredients: [],
//   });
//   const [ingredientName, setIngredientName] = useState("");
//   const [ingredientQuantity, setIngredientQuantity] = useState(0);
//   const [ingredientPricePerUnit, setIngredientPricePerUnit] = useState(0);
//   const [ingredientFinalPrice, setIngredientFinalPrice] = useState(0);

//   useEffect(() => {
//     if (view === "list") {
//       fetch("/api/products")
//         .then((res) => res.json())
//         .then(setProducts);
//     }
//   }, [view]);

//   useEffect(() => {
//     // Load ingredients list
//     fetch("/api/ingredients")
//       .then((res) => res.json())
//       .then(setIngredientsList);
//   }, []);

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//     if (product) {
//       setFormData({
//         name: product.name,
//         portions: product.portions,
//         costPerPortion: product.costPerPortion,
//         priceWithoutTax: product.priceWithoutTax,
//         tax: product.tax,
//         finalPrice: product.finalPrice,
//         roundedPrice: product.roundedPrice,
//         ingredients: product.ingredients.map((ing) => ({
//           id: ing.id,
//           quantity: ing.quantity,
//           pricePerUnit: ing.pricePerUnit,
//           finalPrice: ing.finalPrice,
//           ingredientId: ing.ingredient.id,
//         })),
//       });
//     } else {
//       // Reset form data for new product creation
//       setFormData({
//         name: "",
//         portions: 0,
//         costPerPortion: 0,
//         priceWithoutTax: 0,
//         tax: 0,
//         finalPrice: 0,
//         roundedPrice: 0,
//         ingredients: [],
//       });
//     }
//     setView("form");
//   };

//   const handleSaveProduct = async () => {
//     const method = selectedProduct ? "PUT" : "POST";
//     const url = selectedProduct
//       ? `/api/products/${selectedProduct.id}`
//       : "/api/products";

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     setSelectedProduct(null);
//     setView("list");
//   };

//   const handleDeleteProduct = async () => {
//     if (selectedProduct) {
//       await fetch(`/api/products/${selectedProduct.id}`, { method: "DELETE" });
//       setSelectedProduct(null);
//       setView("list");
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: "",
//       portions: 0,
//       costPerPortion: 0,
//       priceWithoutTax: 0,
//       tax: 0,
//       finalPrice: 0,
//       roundedPrice: 0,
//       ingredients: [],
//     });
//     setIngredientName("");
//     setIngredientQuantity(0);
//     setIngredientPricePerUnit(0);
//     setIngredientFinalPrice(0);
//     setSelectedProduct(null);
//     setView("list");
//   };

//   const handleAddIngredient = () => {
//     if (
//       ingredientName &&
//       ingredientQuantity > 0 &&
//       ingredientPricePerUnit > 0
//     ) {
//       const selectedIngredient = ingredientsList.find(
//         (ing) => ing.id === ingredientName
//       );
//       const newIngredient = {
//         ingredientId: ingredientName,
//         quantity: ingredientQuantity,
//         pricePerUnit: ingredientPricePerUnit,
//         finalPrice: ingredientFinalPrice,
//         ingredientName: selectedIngredient?.name, // Guarda el nombre del ingrediente
     
//       };
//       console.log(ingredientName)
//       setFormData((prev) => ({
//         ...prev,
//         ingredients: [...prev.ingredients, newIngredient],
//       }));
//       // Limpiar los campos después de agregar el ingrediente
//       setIngredientName("");
//       setIngredientQuantity(0);
//       setIngredientPricePerUnit(0);
//       setIngredientFinalPrice(0);
//     }
//   };
//   // console.log(ingredientsList)

//   return (
//     <div className="container mx-auto p-4">
//       {view === "list" && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Productos</h2>
//           <button
//             onClick={() => handleSelectProduct(null)} // Pass null to create a new product
//             className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
//           >
//             Agregar Producto
//           </button>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {products.map((product) => (
//               <li
//                 key={product.id}
//                 className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition"
//               >
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p>Porciones: {product.portions}</p>
//                 <div className="flex justify-between mt-2">
//                   <button
//                     onClick={() => handleSelectProduct(product)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Ver detalles
//                   </button>
//                   <button
//                     onClick={() => handleSelectProduct(product)}
//                     className="text-yellow-500 hover:underline"
//                   >
//                     Editar
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {view === "form" && (
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSaveProduct();
//           }}
//           className="bg-white p-6 rounded shadow-lg border max-w-lg mx-auto"
//         >
//           <h2 className="text-2xl font-bold mb-4">
//             {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
//           </h2>
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Nombre</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               placeholder="Nombre"
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block font-medium mb-1">Porciones</label>
//               <input
//                 name="portions"
//                 type="number"
//                 value={formData.portions}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     portions: parseInt(e.target.value, 10),
//                   })
//                 }
//                 placeholder="Porciones"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">
//                 Costo por porción
//               </label>
//               <input
//                 name="costPerPortion"
//                 type="number"
//                 value={formData.costPerPortion}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     costPerPortion: parseFloat(e.target.value),
//                   })
//                 }
//                 placeholder="Costo por porción"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block font-medium mb-1">
//                 Precio sin impuestos
//               </label>
//               <input
//                 name="priceWithoutTax"
//                 type="number"
//                 value={formData.priceWithoutTax}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     priceWithoutTax: parseFloat(e.target.value),
//                   })
//                 }
//                 placeholder="Precio sin impuestos"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Impuesto (%)</label>
//               <input
//                 name="tax"
//                 type="number"
//                 value={formData.tax}
//                 onChange={(e) =>
//                   setFormData({ ...formData, tax: parseFloat(e.target.value) })
//                 }
//                 placeholder="Impuesto"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block font-medium mb-1">Precio final</label>
//               <input
//                 name="finalPrice"
//                 type="number"
//                 value={formData.finalPrice}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     finalPrice: parseFloat(e.target.value),
//                   })
//                 }
//                 placeholder="Precio final"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">
//                 Precio redondeado
//               </label>
//               <input
//                 name="roundedPrice"
//                 type="number"
//                 value={formData.roundedPrice}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     roundedPrice: parseFloat(e.target.value),
//                   })
//                 }
//                 placeholder="Precio redondeado"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="font-bold">Ingredientes</h3>
//             <div className="flex mb-2">
//               <select
//                 value={ingredientName}
//                 onChange={(e) =>
//                   setIngredientName(parseInt(e.target.value, 10))
//                 }
//                 className="w-1/2 p-2 border rounded"
//                 required
//               >
//                 <option value="">Seleccionar ingrediente</option>
//                 {ingredientsList.map((ingredient) => (
//                   <option key={ingredient.id} value={ingredient.id}>
//                     {ingredient.name}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 value={ingredientPricePerUnit}
//                 onChange={(e) =>
//                   setIngredientPricePerUnit(parseFloat(e.target.value))
//                 }
//                 placeholder="Precio unitario"
//                 className="w-1/4 p-2 border rounded ml-2"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleAddIngredient}
//                 className="bg-green-500 text-white p-2 rounded ml-2"
//               >
//                 Agregar
//               </button>
//             </div>
//             <ul>
//               {formData.ingredients.map((ingredient, index) => {
//                 console.log(ingredient); // Esto mostrará cada objeto ingredient en la consola
//                 return (
//                   <li key={index} className="flex justify-between border-b p-2">
//                     <span>
//                       {ingredient.ingredientId} - Cantidad:{" "}
//                       {ingredient.quantity} - Precio Unitario: $
//                       {ingredient.pricePerUnit.toFixed(2)}
//                     </span>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               {selectedProduct ? "Actualizar Producto" : "Crear Producto"}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//             >
//               Cancelar
//             </button>
//             {selectedProduct && (
//               <button
//                 type="button"
//                 onClick={handleDeleteProduct}
//                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//               >
//                 Eliminar
//               </button>
//             )}
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// // // app/components/ProductManager.tsx
// // import { useEffect, useState } from 'react';

// // export default function ProductManager() {
// //   const [view, setView] = useState<'list' | 'form' | 'details'>('list');
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     portions: 0,
// //     costPerPortion: 0,
// //     priceWithoutTax: 0,
// //     tax: 0,
// //     finalPrice: 0,
// //     roundedPrice: 0,
// //     ingredients: [],
// //   });
// //   const [ingredientName, setIngredientName] = useState('');
// //   const [ingredientQuantity, setIngredientQuantity] = useState(0);
// //   const [ingredientPricePerUnit, setIngredientPricePerUnit] = useState(0);
// //   const [ingredientFinalPrice, setIngredientFinalPrice] = useState(0);

// //   useEffect(() => {
// //     if (view === 'list') {
// //       fetch('/api/products')
// //         .then((res) => res.json())
// //         .then(setProducts);
// //     }
// //   }, [view]);

// //   const handleSelectProduct = (product) => {
// //     setSelectedProduct(product);
// //     setFormData({
// //       name: product.name,
// //       portions: product.portions,
// //       costPerPortion: product.costPerPortion,
// //       priceWithoutTax: product.priceWithoutTax,
// //       tax: product.tax,
// //       finalPrice: product.finalPrice,
// //       roundedPrice: product.roundedPrice,
// //       ingredients: product.ingredients.map((ing) => ({
// //         id: ing.id,
// //         quantity: ing.quantity,
// //         pricePerUnit: ing.pricePerUnit,
// //         finalPrice: ing.finalPrice,
// //         ingredientId: ing.ingredient.id,
// //       })),
// //     });
// //     setView('form');
// //   };

// //   const handleSaveProduct = async () => {
// //     const method = selectedProduct ? 'PUT' : 'POST';
// //     const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';

// //     await fetch(url, {
// //       method,
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(formData),
// //     });

// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   const handleDeleteProduct = async () => {
// //     if (selectedProduct) {
// //       await fetch(`/api/products/${selectedProduct.id}`, { method: 'DELETE' });
// //       setSelectedProduct(null);
// //       setView('list');
// //     }
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setIngredientName('');
// //     setIngredientQuantity(0);
// //     setIngredientPricePerUnit(0);
// //     setIngredientFinalPrice(0);
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   const handleAddIngredient = () => {
// //     if (ingredientName && ingredientQuantity > 0 && ingredientPricePerUnit > 0) {
// //       const newIngredient = {
// //         ingredientId: ingredientName, // Assume you get this from an ingredient selector or API
// //         quantity: ingredientQuantity,
// //         pricePerUnit: ingredientPricePerUnit,
// //         finalPrice: ingredientFinalPrice,
// //       };
// //       setFormData((prev) => ({
// //         ...prev,
// //         ingredients: [...prev.ingredients, newIngredient],
// //       }));
// //       setIngredientName('');
// //       setIngredientQuantity(0);
// //       setIngredientPricePerUnit(0);
// //       setIngredientFinalPrice(0);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       {view === 'list' && (
// //         <div>
// //           <h2 className="text-2xl font-bold mb-4">Productos</h2>
// //           <button
// //             onClick={() => handleSelectProduct(null)}
// //             className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
// //           >
// //             Agregar Producto
// //           </button>
// //           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {products.map((product) => (
// //               <li
// //                 key={product.id}
// //                 className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition"
// //               >
// //                 <h3 className="text-lg font-semibold">{product.name}</h3>
// //                 <p>Porciones: {product.portions}</p>
// //                 <div className="flex justify-between mt-2">
// //                   <button
// //                     onClick={() => handleSelectProduct(product)}
// //                     className="text-blue-500 hover:underline"
// //                   >
// //                     Ver detalles
// //                   </button>
// //                   <button
// //                     onClick={() => handleSelectProduct(product)}
// //                     className="text-yellow-500 hover:underline"
// //                   >
// //                     Editar
// //                   </button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {view === 'form' && (
// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             handleSaveProduct();
// //           }}
// //           className="bg-white p-6 rounded shadow-lg border max-w-lg mx-auto"
// //         >
// //           <h2 className="text-2xl font-bold mb-4">
// //             {selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}
// //           </h2>
// //           <div className="mb-4">
// //             <label className="block font-medium mb-1">Nombre</label>
// //             <input
// //               name="name"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               placeholder="Nombre"
// //               className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4 mb-4">
// //             <div>
// //               <label className="block font-medium mb-1">Porciones</label>
// //               <input
// //                 name="portions"
// //                 type="number"
// //                 value={formData.portions}
// //                 onChange={(e) => setFormData({ ...formData, portions: parseInt(e.target.value, 10) })}
// //                 placeholder="Porciones"
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Costo por porción</label>
// //               <input
// //                 name="costPerPortion"
// //                 type="number"
// //                 value={formData.costPerPortion}
// //                 onChange={(e) => setFormData({ ...formData, costPerPortion: parseFloat(e.target.value) })}
// //                 placeholder="Costo por porción"
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4 mb-4">
// //             <div>
// //               <label className="block font-medium mb-1">Precio sin impuestos</label>
// //               <input
// //                 name="priceWithoutTax"
// //                 type="number"
// //                 value={formData.priceWithoutTax}
// //                 onChange={(e) => setFormData({ ...formData, priceWithoutTax: parseFloat(e.target.value) })}
// //                 placeholder="Precio sin impuestos"
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Impuesto (%)</label>
// //               <input
// //                 name="tax"
// //                 type="number"
// //                 value={formData.tax}
// //                 onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) })}
// //                 placeholder="Impuesto"
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4 mb-4">
// //             <div>
// //               <label className="block font-medium mb-1">Precio final</label>
// //               <input
// //                 name="finalPrice"
// //                 type="number"
// //                 value={formData.finalPrice}
// //                 onChange={(e) => setFormData({ ...formData, finalPrice: parseFloat(e.target.value) })}
// //                 placeholder="Precio final"
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Precio redondeado</label>
// //               <input
// //                 name="roundedPrice"
// //                 type="number"
// //                 value={formData.roundedPrice}
// //                 onChange={(e) => setFormData({ ...formData, roundedPrice: parseFloat(e.target.value) })}
// //                 placeholder="Precio redondeado"
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="mb-4">
// //             <h3 className="font-bold">Ingredientes</h3>
// //             <div className="flex mb-2">
// //               <input
// //                 value={ingredientName}
// //                 onChange={(e) => setIngredientName(e.target.value)}
// //                 placeholder="Ingrediente"
// //                 className="w-1/2 p-2 border rounded"
// //                 required
// //               />
// //               <input
// //                 type="number"
// //                 value={ingredientQuantity}
// //                 onChange={(e) => setIngredientQuantity(parseFloat(e.target.value))}
// //                 placeholder="Cantidad"
// //                 className="w-1/4 p-2 border rounded ml-2"
// //                 required
// //               />
// //               <input
// //                 type="number"
// //                 value={ingredientPricePerUnit}
// //                 onChange={(e) => setIngredientPricePerUnit(parseFloat(e.target.value))}
// //                 placeholder="Precio unitario"
// //                 className="w-1/4 p-2 border rounded ml-2"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleAddIngredient}
// //                 className="bg-green-500 text-white p-2 rounded ml-2"
// //               >
// //                 Agregar
// //               </button>
// //             </div>
// //             <ul>
// //               {formData.ingredients.map((ingredient, index) => (
// //                 <li key={index} className="flex justify-between border-b p-2">
// //                   <span>
// //                     {ingredient.ingredientId} - Cantidad: {ingredient.quantity} - Precio Unitario: ${ingredient.pricePerUnit.toFixed(2)}
// //                   </span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           <div className="flex justify-between">
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
// //             >
// //               {selectedProduct ? 'Actualizar Producto' : 'Crear Producto'}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={handleCancel}
// //               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
// //             >
// //               Cancelar
// //             </button>
// //             {selectedProduct && (
// //               <button
// //                 type="button"
// //                 onClick={handleDeleteProduct}
// //                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
// //               >
// //                 Eliminar
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }

// // // app/components/ProductManager.tsx
// // import { useEffect, useState } from 'react';

// // export default function ProductManager() {
// //   const [view, setView] = useState<'list' | 'form' | 'details'>('list');
// //   const [products, setProducts] = useState([]);
// //   const [ingredients, setIngredients] = useState([]); // Lista de ingredientes para seleccionar
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     portions: 0,
// //     costPerPortion: 0,
// //     priceWithoutTax: 0,
// //     tax: 0,
// //     finalPrice: 0,
// //     roundedPrice: 0,
// //     ingredients: [{ ingredientId: '', quantity: 0, pricePerUnit: 0, finalPrice: 0 }],
// //   });

// //   useEffect(() => {
// //     if (view === 'list') {
// //       fetch('/api/products')
// //         .then((res) => res.json())
// //         .then(setProducts);
// //     }
// //     fetch('/api/ingredients') // Obtener lista de ingredientes para el formulario
// //       .then((res) => res.json())
// //       .then(setIngredients);
// //   }, [view]);

// //   const handleAddIngredient = () => {
// //     setFormData({
// //       ...formData,
// //       ingredients: [...formData.ingredients, { ingredientId: '', quantity: 0, pricePerUnit: 0, finalPrice: 0 }],
// //     });
// //   };

// //   const handleIngredientChange = (index, field, value) => {
// //     const updatedIngredients = formData.ingredients.map((ingredient, i) =>
// //       i === index ? { ...ingredient, [field]: value } : ingredient
// //     );
// //     setFormData({ ...formData, ingredients: updatedIngredients });
// //   };

// //   const handleSaveProduct = async () => {
// //     const method = selectedProduct ? 'PUT' : 'POST';
// //     const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';

// //     await fetch(url, {
// //       method,
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(formData),
// //     });

// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [{ ingredientId: '', quantity: 0, pricePerUnit: 0, finalPrice: 0 }],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [{ ingredientId: '', quantity: 0, pricePerUnit: 0, finalPrice: 0 }],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       {view === 'form' && (
// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             handleSaveProduct();
// //           }}
// //           className="bg-white p-6 rounded shadow-lg border max-w-lg mx-auto"
// //         >
// //           <h2 className="text-2xl font-bold mb-4">
// //             {selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}
// //           </h2>
// //           <div className="mb-4">
// //             <label className="block font-medium mb-1">Nombre</label>
// //             <input
// //               name="name"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               placeholder="Nombre"
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block font-medium mb-1">Porciones</label>
// //               <input
// //                 name="portions"
// //                 type="number"
// //                 value={formData.portions}
// //                 onChange={(e) => setFormData({ ...formData, portions: parseInt(e.target.value, 10) })}
// //                 placeholder="Porciones"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Costo por porción</label>
// //               <input
// //                 name="costPerPortion"
// //                 type="number"
// //                 value={formData.costPerPortion}
// //                 onChange={(e) => setFormData({ ...formData, costPerPortion: parseFloat(e.target.value) })}
// //                 placeholder="Costo por porción"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Precio sin impuestos</label>
// //               <input
// //                 name="priceWithoutTax"
// //                 type="number"
// //                 value={formData.priceWithoutTax}
// //                 onChange={(e) => setFormData({ ...formData, priceWithoutTax: parseFloat(e.target.value) })}
// //                 placeholder="Precio sin impuestos"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Impuesto (%)</label>
// //               <input
// //                 name="tax"
// //                 type="number"
// //                 value={formData.tax}
// //                 onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) })}
// //                 placeholder="Impuesto (%)"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Precio final</label>
// //               <input
// //                 name="finalPrice"
// //                 type="number"
// //                 value={formData.finalPrice}
// //                 onChange={(e) => setFormData({ ...formData, finalPrice: parseFloat(e.target.value) })}
// //                 placeholder="Precio final"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Precio redondeado</label>
// //               <input
// //                 name="roundedPrice"
// //                 type="number"
// //                 value={formData.roundedPrice}
// //                 onChange={(e) => setFormData({ ...formData, roundedPrice: parseFloat(e.target.value) })}
// //                 placeholder="Precio redondeado"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //           </div>
// //           <div className="mt-4">
// //             <h3 className="text-xl font-semibold mb-2">Ingredientes</h3>
// //             {formData.ingredients.map((ingredient, index) => (
// //               <div key={index} className="mb-4 border-b pb-2">
// //                 <label className="block font-medium mb-1">Ingrediente</label>
// //                 <select
// //                   value={ingredient.ingredientId}
// //                   onChange={(e) =>
// //                     handleIngredientChange(index, 'ingredientId', e.target.value)
// //                   }
// //                   className="w-full p-2 border rounded mb-2"
// //                 >
// //                   <option value="">Seleccionar ingrediente</option>
// //                   {ingredients.map((ing) => (
// //                     <option key={ing.id} value={ing.id}>
// //                       {ing.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <label className="block font-medium mb-1">Cantidad</label>
// //                 <input
// //                   type="number"
// //                   value={ingredient.quantity}
// //                   onChange={(e) =>
// //                     handleIngredientChange(index, 'quantity', parseFloat(e.target.value))
// //                   }
// //                   placeholder="Cantidad"
// //                   className="w-full p-2 border rounded"
// //                 />
// //                 <label className="block font-medium mb-1">Precio por unidad</label>
// //                 <input
// //                   type="number"
// //                   value={ingredient.pricePerUnit}
// //                   onChange={(e) =>
// //                     handleIngredientChange(index, 'pricePerUnit', parseFloat(e.target.value))
// //                   }
// //                   placeholder="Precio por unidad"
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //             ))}
// //             <button
// //               type="button"
// //               onClick={handleAddIngredient}
// //               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
// //             >
// //               Agregar ingrediente
// //             </button>
// //           </div>
// //           <div className="mt-6 flex justify-between">
// //             <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
// //               Guardar
// //             </button>
// //             <button
// //               type="button"
// //               onClick={handleCancel}
// //               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
// //             >
// //               Cancelar
// //             </button>
// //           </div>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }

// // // app/components/ProductManager.tsx
// // import { useEffect, useState } from 'react';

// // export default function ProductManager() {
// //   const [view, setView] = useState<'list' | 'form' | 'details'>('list');
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     portions: 0,
// //     costPerPortion: 0,
// //     priceWithoutTax: 0,
// //     tax: 0,
// //     finalPrice: 0,
// //     roundedPrice: 0,
// //     ingredients: [],
// //   });

// //   useEffect(() => {
// //     if (view === 'list') {
// //       fetch('/api/products')
// //         .then((res) => res.json())
// //         .then(setProducts);
// //     }
// //   }, [view]);

// //   const handleSelectProduct = (product) => {
// //     setSelectedProduct(product);
// //     setView('details');
// //   };

// //   const handleSaveProduct = async () => {
// //     const method = selectedProduct ? 'PUT' : 'POST';
// //     const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';

// //     await fetch(url, {
// //       method,
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(formData),
// //     });

// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   const handleDeleteProduct = async () => {
// //     if (selectedProduct) {
// //       await fetch(`/api/products/${selectedProduct.id}`, { method: 'DELETE' });
// //       setSelectedProduct(null);
// //       setView('list');
// //     }
// //   };

// //   const handleEditProduct = (product = null) => {
// //     setSelectedProduct(product);
// //     setFormData(product || {
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setView('form');
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   return (
// //     <div className="p-4">
// //       {view === 'list' && (
// //         <div>
// //           <h2 className="text-2xl font-semibold mb-4">Productos</h2>
// //           <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => handleEditProduct()}>
// //             Agregar Producto
// //           </button>
// //           <ul className="grid grid-cols-1 gap-4">
// //             {products.map((product) => (
// //               <li key={product.id} className="bg-white p-4 shadow rounded-lg flex justify-between items-center">
// //                 <div>
// //                   <p className="font-medium text-lg">{product.name}</p>
// //                   <p className="text-gray-500">Porciones: {product.portions}</p>
// //                 </div>
// //                 <div className="space-x-2">
// //                   <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleSelectProduct(product)}>Detalles</button>
// //                   <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEditProduct(product)}>Editar</button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {view === 'details' && selectedProduct && (
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h2>
// //           <p><strong>Porciones:</strong> {selectedProduct.portions}</p>
// //           <p><strong>Costo por porción:</strong> ${selectedProduct.costPerPortion}</p>
// //           <p><strong>Precio sin impuestos:</strong> ${selectedProduct.priceWithoutTax}</p>
// //           <p><strong>Impuesto:</strong> {selectedProduct.tax}%</p>
// //           <p><strong>Precio final:</strong> ${selectedProduct.finalPrice}</p>
// //           <p><strong>Precio redondeado:</strong> ${selectedProduct.roundedPrice}</p>
// //           <h3 className="mt-4 font-semibold">Ingredientes:</h3>
// //           <ul className="list-disc pl-5">
// //             {selectedProduct.ingredients.map((item) => (
// //               <li key={item.id}>
// //                 {item.ingredient.name} - Cantidad: {item.quantity}, Precio por unidad: ${item.pricePerUnit}
// //               </li>
// //             ))}
// //           </ul>
// //           <div className="mt-4 space-x-2">
// //             <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleEditProduct(selectedProduct)}>Editar</button>
// //             <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteProduct}>Eliminar</button>
// //             <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancel}>Volver</button>
// //           </div>
// //         </div>
// //       )}

// //       {view === 'form' && (
// //         <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveProduct(); }}>
// //           <h2 className="text-2xl font-semibold mb-2">{selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
// //           <div className="grid gap-4">
// //             <input
// //               className="border p-2 rounded w-full"
// //               placeholder="Nombre"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //             />
// //             <input
// //               className="border p-2 rounded w-full"
// //               type="number"
// //               placeholder="Porciones"
// //               value={formData.portions}
// //               onChange={(e) => setFormData({ ...formData, portions: parseInt(e.target.value, 10) })}
// //             />
// //             <input
// //               className="border p-2 rounded w-full"
// //               type="number"
// //               placeholder="Costo por porción"
// //               value={formData.costPerPortion}
// //               onChange={(e) => setFormData({ ...formData, costPerPortion: parseFloat(e.target.value) })}
// //             />
// //             <input
// //               className="border p-2 rounded w-full"
// //               type="number"
// //               placeholder="Precio sin impuestos"
// //               value={formData.priceWithoutTax}
// //               onChange={(e) => setFormData({ ...formData, priceWithoutTax: parseFloat(e.target.value) })}
// //             />
// //             <input
// //               className="border p-2 rounded w-full"
// //               type="number"
// //               placeholder="Impuesto"
// //               value={formData.tax}
// //               onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) })}
// //             />
// //             <input
// //               className="border p-2 rounded w-full"
// //               type="number"
// //               placeholder="Precio final"
// //               value={formData.finalPrice}
// //               onChange={(e) => setFormData({ ...formData, finalPrice: parseFloat(e.target.value) })}
// //             />
// //             <input
// //               className="border p-2 rounded w-full"
// //               type="number"
// //               placeholder="Precio redondeado"
// //               value={formData.roundedPrice}
// //               onChange={(e) => setFormData({ ...formData, roundedPrice: parseFloat(e.target.value) })}
// //             />
// //           </div>
// //           <div className="mt-4 space-x-2">
// //             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
// //             <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancel}>Cancelar</button>
// //           </div>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }

// // app/components/ProductManager.tsx
// // import { useEffect, useState } from 'react';

// // export default function ProductManager() {
// //   const [view, setView] = useState<'list' | 'form' | 'details'>('list');
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     portions: 0,
// //     costPerPortion: 0,
// //     priceWithoutTax: 0,
// //     tax: 0,
// //     finalPrice: 0,
// //     roundedPrice: 0,
// //     ingredients: [],
// //   });

// //   useEffect(() => {
// //     if (view === 'list') {
// //       fetch('/api/products')
// //         .then((res) => res.json())
// //         .then(setProducts);
// //     }
// //   }, [view]);

// //   const handleSelectProduct = (product) => {
// //     setSelectedProduct(product);
// //     setView('details');
// //   };

// //   const handleSaveProduct = async () => {
// //     const method = selectedProduct ? 'PUT' : 'POST';
// //     const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';

// //     await fetch(url, {
// //       method,
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(formData),
// //     });

// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   const handleDeleteProduct = async () => {
// //     if (selectedProduct) {
// //       await fetch(`/api/products/${selectedProduct.id}`, { method: 'DELETE' });
// //       setSelectedProduct(null);
// //       setView('list');
// //     }
// //   };

// //   const handleEditProduct = (product = null) => {
// //     setSelectedProduct(product);
// //     setFormData(product || {
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setView('form');
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       {view === 'list' && (
// //         <div>
// //           <h2 className="text-2xl font-bold mb-4">Productos</h2>
// //           <button
// //             onClick={() => handleEditProduct()}
// //             className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
// //           >
// //             Agregar Producto
// //           </button>
// //           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {products.map((product) => (
// //               <li
// //                 key={product.id}
// //                 className="bg-white p-4 rounded shadow-md border hover:shadow-lg transition"
// //               >
// //                 <h3 className="text-lg font-semibold">{product.name}</h3>
// //                 <p>Porciones: {product.portions}</p>
// //                 <div className="flex justify-between mt-2">
// //                   <button
// //                     onClick={() => handleSelectProduct(product)}
// //                     className="text-blue-500 hover:underline"
// //                   >
// //                     Ver detalles
// //                   </button>
// //                   <button
// //                     onClick={() => handleEditProduct(product)}
// //                     className="text-yellow-500 hover:underline"
// //                   >
// //                     Editar
// //                   </button>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {view === 'details' && selectedProduct && (
// //         <div className="bg-white p-6 rounded shadow-lg border max-w-md mx-auto">
// //           <h2 className="text-2xl font-bold mb-2">Detalles de {selectedProduct.name}</h2>
// //           <p>Porciones: {selectedProduct.portions}</p>
// //           <p>Costo por porción: ${selectedProduct.costPerPortion.toFixed(2)}</p>
// //           <p>Precio sin impuestos: ${selectedProduct.priceWithoutTax.toFixed(2)}</p>
// //           <p>Impuesto: {selectedProduct.tax}%</p>
// //           <p>Precio final: ${selectedProduct.finalPrice.toFixed(2)}</p>
// //           <p>Precio redondeado: ${selectedProduct.roundedPrice.toFixed(2)}</p>
// //           <h3 className="text-xl font-semibold mt-4">Ingredientes:</h3>
// //           <ul className="list-disc ml-5">
// //             {selectedProduct.ingredients.map((item) => (
// //               <li key={item.id}>
// //                 {item.ingredient.name} - Cantidad: {item.quantity}, Precio: ${item.pricePerUnit}
// //               </li>
// //             ))}
// //           </ul>
// //           <div className="mt-4 flex justify-between">
// //             <button
// //               onClick={() => handleEditProduct(selectedProduct)}
// //               className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
// //             >
// //               Editar
// //             </button>
// //             <button
// //               onClick={handleDeleteProduct}
// //               className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
// //             >
// //               Eliminar
// //             </button>
// //             <button
// //               onClick={handleCancel}
// //               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
// //             >
// //               Volver
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {view === 'form' && (
// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             handleSaveProduct();
// //           }}
// //           className="bg-white p-6 rounded shadow-lg border max-w-lg mx-auto"
// //         >
// //           <h2 className="text-2xl font-bold mb-4">
// //             {selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}
// //           </h2>
// //           <div className="mb-4">
// //             <label className="block font-medium mb-1">Nombre</label>
// //             <input
// //               name="name"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //               placeholder="Nombre"
// //               className="w-full p-2 border rounded"
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="block font-medium mb-1">Porciones</label>
// //               <input
// //                 name="portions"
// //                 type="number"
// //                 value={formData.portions}
// //                 onChange={(e) => setFormData({ ...formData, portions: parseInt(e.target.value, 10) })}
// //                 placeholder="Porciones"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div>
// //               <label className="block font-medium mb-1">Costo por porción</label>
// //               <input
// //                 name="costPerPortion"
// //                 type="number"
// //                 value={formData.costPerPortion}
// //                 onChange={(e) => setFormData({ ...formData, costPerPortion: parseFloat(e.target.value) })}
// //                 placeholder="Costo por porción"
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //           </div>
// //           {/* Añadir más campos con similar estructura */}
// //           <div className="mt-6 flex justify-between">
// //             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
// //               Guardar
// //             </button>
// //             <button
// //               type="button"
// //               onClick={handleCancel}
// //               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
// //             >
// //               Cancelar
// //             </button>
// //           </div>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }

// // // app/components/ProductManager.tsx
// // import { useEffect, useState } from 'react';

// // export default function ProductManager() {
// //   const [view, setView] = useState<'list' | 'form' | 'details'>('list');
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     portions: 0,
// //     costPerPortion: 0,
// //     priceWithoutTax: 0,
// //     tax: 0,
// //     finalPrice: 0,
// //     roundedPrice: 0,
// //     ingredients: [],
// //   });

// //   // Fetch productos
// //   useEffect(() => {
// //     if (view === 'list') {
// //       fetch('/api/products')
// //         .then((res) => res.json())
// //         .then(setProducts);
// //     }
// //   }, [view]);

// //   // Seleccionar un producto para ver detalles o editar
// //   const handleSelectProduct = (product) => {
// //     setSelectedProduct(product);
// //     setView('details');
// //   };

// //   // Crear un nuevo producto o editar el seleccionado
// //   const handleSaveProduct = async () => {
// //     const method = selectedProduct ? 'PUT' : 'POST';
// //     const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';

// //     await fetch(url, {
// //       method,
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(formData),
// //     });

// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   // Eliminar un producto
// //   const handleDeleteProduct = async () => {
// //     if (selectedProduct) {
// //       await fetch(`/api/products/${selectedProduct.id}`, { method: 'DELETE' });
// //       setSelectedProduct(null);
// //       setView('list');
// //     }
// //   };

// //   // Cambiar a vista de formulario para agregar o editar
// //   const handleEditProduct = (product = null) => {
// //     setSelectedProduct(product);
// //     setFormData(product || {
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setView('form');
// //   };

// //   // Cambiar a la vista de lista
// //   const handleCancel = () => {
// //     setFormData({
// //       name: '',
// //       portions: 0,
// //       costPerPortion: 0,
// //       priceWithoutTax: 0,
// //       tax: 0,
// //       finalPrice: 0,
// //       roundedPrice: 0,
// //       ingredients: [],
// //     });
// //     setSelectedProduct(null);
// //     setView('list');
// //   };

// //   return (
// //     <div>
// //       {view === 'list' && (
// //         <div>
// //           <h2>Productos</h2>
// //           <button onClick={() => handleEditProduct()}>Agregar Producto</button>
// //           <ul>
// //             {products.map((product) => (
// //               <li key={product.id}>
// //                 {product.name} - {product.portions} porciones
// //                 <button onClick={() => handleSelectProduct(product)}>Detalles</button>
// //                 <button onClick={() => handleEditProduct(product)}>Editar</button>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {view === 'details' && selectedProduct && (
// //         <div>
// //           <h2>Detalles de {selectedProduct.name}</h2>
// //           <p>Porciones: {selectedProduct.portions}</p>
// //           <p>Costo por porción: {selectedProduct.costPerPortion}</p>
// //           <p>Precio sin impuestos: {selectedProduct.priceWithoutTax}</p>
// //           <p>Impuesto: {selectedProduct.tax}</p>
// //           <p>Precio final: {selectedProduct.finalPrice}</p>
// //           <p>Precio redondeado: {selectedProduct.roundedPrice}</p>
// //           <h3>Ingredientes:</h3>
// //           <ul>
// //             {selectedProduct.ingredients.map((item) => (
// //               <li key={item.id}>
// //                 {item.ingredient.name} - Cantidad: {item.quantity}, Precio por unidad: {item.pricePerUnit}
// //               </li>
// //             ))}
// //           </ul>
// //           <button onClick={() => handleEditProduct(selectedProduct)}>Editar</button>
// //           <button onClick={handleDeleteProduct}>Eliminar</button>
// //           <button onClick={handleCancel}>Volver</button>
// //         </div>
// //       )}

// //       {view === 'form' && (
// //         <form onSubmit={(e) => { e.preventDefault(); handleSaveProduct(); }}>
// //           <h2>{selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
// //           <input
// //             name="name"
// //             value={formData.name}
// //             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //             placeholder="Nombre"
// //           />
// //           <input
// //             name="portions"
// //             type="number"
// //             value={formData.portions}
// //             onChange={(e) => setFormData({ ...formData, portions: parseInt(e.target.value, 10) })}
// //             placeholder="Porciones"
// //           />
// //           <input
// //             name="costPerPortion"
// //             type="number"
// //             value={formData.costPerPortion}
// //             onChange={(e) => setFormData({ ...formData, costPerPortion: parseFloat(e.target.value) })}
// //             placeholder="Costo por porción"
// //           />
// //           <input
// //             name="priceWithoutTax"
// //             type="number"
// //             value={formData.priceWithoutTax}
// //             onChange={(e) => setFormData({ ...formData, priceWithoutTax: parseFloat(e.target.value) })}
// //             placeholder="Precio sin impuestos"
// //           />
// //           <input
// //             name="tax"
// //             type="number"
// //             value={formData.tax}
// //             onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) })}
// //             placeholder="Impuesto"
// //           />
// //           <input
// //             name="finalPrice"
// //             type="number"
// //             value={formData.finalPrice}
// //             onChange={(e) => setFormData({ ...formData, finalPrice: parseFloat(e.target.value) })}
// //             placeholder="Precio final"
// //           />
// //           <input
// //             name="roundedPrice"
// //             type="number"
// //             value={formData.roundedPrice}
// //             onChange={(e) => setFormData({ ...formData, roundedPrice: parseFloat(e.target.value) })}
// //             placeholder="Precio redondeado"
// //           />
// //           <button type="submit">Guardar</button>
// //           <button type="button" onClick={handleCancel}>Cancelar</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }
