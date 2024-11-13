// // app/crud/page.tsx
// "use client";

// import { useState, useEffect } from "react";

// // Interfaces
// interface Ingredient {
//   id: number;
//   name: string;
//   unit: string;
//   price: number;
//   quantity: number;
// }

// interface ProductIngredient {
//   ingredientId: number;
//   quantity: number;
// }

// interface Product {
//   id: number;
//   name: string;
//   ingredients: ProductIngredient[];
// }

 function CrudPage() {
//   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [ingredientForm, setIngredientForm] = useState<Partial<Ingredient>>({});
//   const [productForm, setProductForm] = useState<Partial<Product>>({ ingredients: [] });
//   const [editingIngredientId, setEditingIngredientId] = useState<number | null>(null);
//   const [editingProductId, setEditingProductId] = useState<number | null>(null);

//   // Fetch data
//   const fetchIngredients = async () => {
//     const res = await fetch("/api/ingredients");
//     const data = await res.json();
//     setIngredients(data);
//   };

//   const fetchProducts = async () => {
//     const res = await fetch("/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     fetchIngredients();
//     fetchProducts();
//   }, []);

//   // CRUD for Ingredients
//   const handleIngredientSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const method = editingIngredientId ? "PUT" : "POST";
//     const url = editingIngredientId ? `/api/ingredients/${editingIngredientId}` : "/api/ingredients";
    
//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredientForm),
//     });

//     setIngredientForm({});
//     setEditingIngredientId(null);
//     fetchIngredients();
//   };

//   const handleEditIngredient = (ingredient: Ingredient) => {
//     setIngredientForm(ingredient);
//     setEditingIngredientId(ingredient.id);
//   };

//   const handleDeleteIngredient = async (id: number) => {
//     await fetch(`/api/ingredients/${id}`, { method: "DELETE" });
//     fetchIngredients();
//   };

//   // CRUD for Products
//   const handleProductSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const method = editingProductId ? "PUT" : "POST";
//     const url = editingProductId ? `/api/products/${editingProductId}` : "/api/products";
    
//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(productForm),
//     });

//     setProductForm({ name: "", ingredients: [] });
//     setEditingProductId(null);
//     fetchProducts();
//   };

//   const handleEditProduct = (product: Product) => {
//     setProductForm(product);
//     setEditingProductId(product.id);
//   };

//   const handleDeleteProduct = async (id: number) => {
//     await fetch(`/api/products/${id}`, { method: "DELETE" });
//     fetchProducts();
//   };

//   return (
//     <div className="container mx-auto p-4 space-y-10">
//       <h1 className="text-2xl font-bold text-center">Gestión de Ingredientes y Productos</h1>

//       <section className="grid gap-10 md:grid-cols-2">
//         {/* Ingredientes */}
//         <div className="p-6 border rounded-lg shadow-md bg-gray-50">
//           <h2 className="text-xl font-semibold">{editingIngredientId ? "Editar Ingrediente" : "Agregar Ingrediente"}</h2>
//           <form onSubmit={handleIngredientSubmit} className="space-y-4 mt-4">
//             <input
//               type="text"
//               placeholder="Nombre"
//               className="w-full px-3 py-2 border rounded"
//               value={ingredientForm.name || ""}
//               onChange={(e) => setIngredientForm({ ...ingredientForm, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Unidad"
//               className="w-full px-3 py-2 border rounded"
//               value={ingredientForm.unit || ""}
//               onChange={(e) => setIngredientForm({ ...ingredientForm, unit: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Precio"
//               className="w-full px-3 py-2 border rounded"
//               value={ingredientForm.price || 0}
//               onChange={(e) => setIngredientForm({ ...ingredientForm, price: parseFloat(e.target.value) })}
//             />
//             <input
//               type="number"
//               placeholder="Cantidad"
//               className="w-full px-3 py-2 border rounded"
//               value={ingredientForm.quantity || 0}
//               onChange={(e) => setIngredientForm({ ...ingredientForm, quantity: parseFloat(e.target.value) })}
//             />
//             <button className="px-4 py-2 text-white bg-blue-600 rounded" type="submit">
//               {editingIngredientId ? "Actualizar" : "Agregar"}
//             </button>
//           </form>

//           <h3 className="mt-6 text-lg font-semibold">Lista de Ingredientes</h3>
//           <ul className="mt-4 space-y-2">
//             {ingredients.map((ingredient) => (
//               <li key={ingredient.id} className="flex justify-between p-3 border rounded-md bg-white">
//                 <span>{ingredient.name} - {ingredient.unit} - ${ingredient.price} - {ingredient.quantity}</span>
//                 <div>
//                   <button
//                     className="px-2 py-1 text-sm text-white bg-yellow-500 rounded"
//                     onClick={() => handleEditIngredient(ingredient)}
//                   >
//                     Editar
//                   </button>
//                   <button
//                     className="px-2 py-1 text-sm text-white bg-red-500 rounded ml-2"
//                     onClick={() => handleDeleteIngredient(ingredient.id)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Productos */}
//         <div className="p-6 border rounded-lg shadow-md bg-gray-50">
//           <h2 className="text-xl font-semibold">{editingProductId ? "Editar Producto" : "Agregar Producto"}</h2>
//           <form onSubmit={handleProductSubmit} className="space-y-4 mt-4">
//             <input
//               type="text"
//               placeholder="Nombre del Producto"
//               className="w-full px-3 py-2 border rounded"
//               value={productForm.name || ""}
//               onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
//             />
//             <h3>Ingredientes</h3>
//             {productForm.ingredients.map((productIngredient, index) => (
//               <div key={index} className="flex space-x-2 mt-2">
//                 <select
//                   className="flex-1 px-3 py-2 border rounded"
//                   value={productIngredient.ingredientId || 0}
//                   onChange={(e) => {
//                     const newIngredients = [...productForm.ingredients];
//                     newIngredients[index].ingredientId = parseInt(e.target.value);
//                     setProductForm({ ...productForm, ingredients: newIngredients });
//                   }}
//                 >
//                   <option value={0}>Seleccionar Ingrediente</option>
//                   {ingredients.map((ingredient) => (
//                     <option key={ingredient.id} value={ingredient.id}>
//                       {ingredient.name}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Cantidad"
//                   className="w-20 px-3 py-2 border rounded"
//                   value={productIngredient.quantity || 0}
//                   onChange={(e) => {
//                     const newIngredients = [...productForm.ingredients];
//                     newIngredients[index].quantity = parseFloat(e.target.value);
//                     setProductForm({ ...productForm, ingredients: newIngredients });
//                   }}
//                 />
//                 <button type="button" onClick={() => {
//                   const newIngredients = productForm.ingredients.filter((_, i) => i !== index);
//                   setProductForm({ ...productForm, ingredients: newIngredients });
//                 }} className="px-2 py-1 text-sm text-white bg-red-500 rounded">
//                   Eliminar
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={() => setProductForm({
//               ...productForm,
//               ingredients: [...(productForm.ingredients || []), { ingredientId: 0, quantity: 0 }]
//             })} className="px-4 py-2 text-sm text-white bg-green-600 rounded mt-2">
//               Agregar Ingrediente
//             </button>
//             <button className="px-4 py-2 text-white bg-blue-600 rounded mt-4" type="submit">
//               {editingProductId ? "Actualizar" : "Agregar"}
//             </button>
//           </form>

//           <h3 className="mt-6 text-lg font-semibold">Lista de Productos</h3>
//           <ul className="mt-4 space-y-2">
//             {products.map((product) => (
//               <li key={product.id} className="p-3 border rounded-md bg-white">
//                 <strong>{product.name}</strong>
//                 <ul className="mt-2">
//                   {product.ingredients.map((ingredient) => (
//                     <li key={ingredient.ingredientId} className="text-sm">ID Ingrediente: {ingredient.ingredientId}, Cantidad: {ingredient.quantity}</li>
//                   ))}
//                 </ul>
//                 <div className="flex mt-2 space-x-2">
//                   <button
//                     className="px-2 py-1 text-sm text-white bg-yellow-500 rounded"
//                     onClick={() => handleEditProduct(product)}
//                   >
//                     Editar
//                   </button>
//                   <button
//                     className="px-2 py-1 text-sm text-white bg-red-500 rounded"
//                     onClick={() => handleDeleteProduct(product.id)}
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
}
export default CrudPage




// // // src/app/page.js
// // import IngredientList from '@/components/IngredientList'
// // import Dashboard from '../../components/Dashboard'
// // import ProductionPlanner from '@/components/ProductionPlanner'
// // import ProductList from '@/components/ProductList'

// // export default function Home() {
// //   return <>
// //   <Dashboard />
// //   <IngredientList/>
// //   <ProductList/>
// //   <ProductionPlanner/>
// //   </>

// // }