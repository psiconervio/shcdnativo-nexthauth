// 'use client'
// import { useEffect, useState } from "react";
// import ProductForm from "./ProductForm";

// interface Product {
//   id: number;
//   name: string;
//   ingredients: { ingredient: { name: string }; quantity: number }[];
// }

// const ProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then(setProducts);
//   }, []);

//   const deleteProduct = (id: number) => {
//     fetch(`/api/products/${id}`, { method: "DELETE" }).then(() => {
//       setProducts((prev) => prev.filter((prod) => prod.id !== id));
//     });
//   };

//   const handleSave = () => {
//     setEditingProduct(null);
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then(setProducts);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Productos</h2>
//       <div className="grid gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="p-4 border rounded-lg shadow-md bg-white">
//             <p className="font-semibold">{product.name}</p>
//             <p>Ingredientes:</p>
//             <ul className="list-disc pl-5">
//               {product.ingredients.map((ing, idx) => (
//                 <li key={idx}>
//                   {ing.ingredient.name} ({ing.quantity})
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-2 mt-3">
//               <button
//                 onClick={() => setEditingProduct(product)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
//               >
//                 Editar
//               </button>
//               <button
//                 onClick={() => deleteProduct(product.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//               >
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal para editar producto */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <h3 className="text-lg font-semibold mb-4">Editar Producto</h3>
//             <ProductForm
//               product={editingProduct}
//               onSubmit={handleSave}
//               onCancel={() => setEditingProduct(null)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;
