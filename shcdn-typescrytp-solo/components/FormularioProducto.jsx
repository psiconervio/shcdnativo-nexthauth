import React, { useState, useEffect } from 'react';

function ProductEditor({ productId }) {
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    portions: 0,
    costPerPortion: 0,
    priceWithoutTax: 0,
    tax: 0,
    finalPrice: 0,
    roundedPrice: 0,
  });

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
      setUpdatedProduct({
        name: data.name,
        portions: data.portions,
        costPerPortion: data.costPerPortion,
        priceWithoutTax: data.priceWithoutTax,
        tax: data.tax,
        finalPrice: data.finalPrice,
        roundedPrice: data.roundedPrice,
      });
    }
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    alert('Producto actualizado');
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Porciones:</label>
          <input
            type="number"
            name="portions"
            value={updatedProduct.portions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Costo por Porción:</label>
          <input
            type="number"
            name="costPerPortion"
            value={updatedProduct.costPerPortion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Precio sin Impuestos:</label>
          <input
            type="number"
            name="priceWithoutTax"
            value={updatedProduct.priceWithoutTax}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Impuesto:</label>
          <input
            type="number"
            name="tax"
            value={updatedProduct.tax}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Precio Final:</label>
          <input
            type="number"
            name="finalPrice"
            value={updatedProduct.finalPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Precio Redondeado:</label>
          <input
            type="number"
            name="roundedPrice"
            value={updatedProduct.roundedPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6 mb-4">Ingredientes</h2>
      <ul className="space-y-2">
        {product.ingredients.map((prodIngredient) => (
          <li
            key={prodIngredient.id}
            className="flex justify-between p-2 border-b"
          >
            <span>{prodIngredient.ingredient.name}</span>
            <span>Cantidad: {prodIngredient.quantity}</span>
            <span>precio: {prodIngredient.ingredient.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductEditor;
// import React, { useState, useEffect } from 'react';

// function ProductEditor({ productId }) {
//   const [product, setProduct] = useState(null);
//   const [updatedProduct, setUpdatedProduct] = useState({
//     name: '',
//     portions: 0,
//     costPerPortion: 0,
//     priceWithoutTax: 0,
//     tax: 0,
//     finalPrice: 0,
//     roundedPrice: 0,
//   });

//   useEffect(() => {
//     async function fetchProduct() {
//       const response = await fetch(`/api/products/${productId}`);
//       const data = await response.json();
//       setProduct(data);
//       setUpdatedProduct({
//         name: data.name,
//         portions: data.portions,
//         costPerPortion: data.costPerPortion,
//         priceWithoutTax: data.priceWithoutTax,
//         tax: data.tax,
//         finalPrice: data.finalPrice,
//         roundedPrice: data.roundedPrice,
//       });
//     }
//     fetchProduct();
//   }, [productId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch(`/api/products/${productId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedProduct),
//     });
//     alert('Producto actualizado');
//   };

//   if (!product) return <div>Cargando...</div>;

//   return (
//     <div>
//       <h1>Editar Producto</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Nombre:
//           <input
//             type="text"
//             name="name"
//             value={updatedProduct.name}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Porciones:
//           <input
//             type="number"
//             name="portions"
//             value={updatedProduct.portions}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Costo por Porción:
//           <input
//             type="number"
//             name="costPerPortion"
//             value={updatedProduct.costPerPortion}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Precio sin Impuestos:
//           <input
//             type="number"
//             name="priceWithoutTax"
//             value={updatedProduct.priceWithoutTax}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Impuesto:
//           <input
//             type="number"
//             name="tax"
//             value={updatedProduct.tax}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Precio Final:
//           <input
//             type="number"
//             name="finalPrice"
//             value={updatedProduct.finalPrice}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Precio Redondeado:
//           <input
//             type="number"
//             name="roundedPrice"
//             value={updatedProduct.roundedPrice}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Guardar Cambios</button>
//       </form>

//       <h2>Ingredientes</h2>
//       <ul>
//         {product.ingredients.map((prodIngredient) => (
//           <li key={prodIngredient.id}>
//             {prodIngredient.ingredient.name} - Cantidad: {prodIngredient.quantity}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductEditor;