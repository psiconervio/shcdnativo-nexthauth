// src/components/ProductList.js
'use client'
import { useState, useEffect } from 'react'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [newProduct, setNewProduct] = useState({ name: '', ingredients: [] })

  useEffect(() => {
    fetchProducts()
    fetchIngredients()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    setProducts(await res.json())
  }

  const fetchIngredients = async () => {
    const res = await fetch('/api/ingredients')
    setIngredients(await res.json())
  }

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...newProduct.ingredients]
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [e.target.name]: e.target.value
    }
    setNewProduct({ ...newProduct, ingredients: updatedIngredients })
  }

  const addIngredientToProduct = () => {
    setNewProduct({
      ...newProduct,
      ingredients: [...newProduct.ingredients, { ingredientId: '', quantity: 0 }]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    setNewProduct({ name: '', ingredients: [] })
    fetchProducts()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchProducts()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nombre del Producto"
          className="border p-2 mr-2"
        />
        {newProduct.ingredients.map((ing, index) => (
          <div key={index} className="mb-2">
            <select
              name="ingredientId"
              value={ing.ingredientId}
              onChange={(e) => handleIngredientChange(e, index)}
              className="border p-2 mr-2"
            >
              <option value="">Seleccionar Ingrediente</option>
              {ingredients.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(e, index)}
              placeholder="Cantidad"
              className="border p-2 mr-2"
            />
          </div>
        ))}
        <button type="button" onClick={addIngredientToProduct} className="bg-green-500 text-white p-2 rounded mr-2">
          Agregar Ingrediente
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear Producto</button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ingredientes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>
              <ul>
    {prod.ingredients.map(ing => (
      <li key={ing.id}>
        {ing.ingredient ? `${ing.ingredient.name}: ${ing.quantity} ${ing.ingredient.unit}` : 'Ingrediente no definido'}
      </li>
    ))}
  </ul>
              </td>
              <td>
                <button onClick={() => handleDelete(prod.id)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}