// src/components/Dashboard.js
'use client'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [ingredients, setIngredients] = useState([])
  const [products, setProducts] = useState([])
  const [production, setProduction] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [ingredientsRes, productsRes, productionRes] = await Promise.all([
      fetch('/api/ingredients'),
      fetch('/api/products'),
      fetch('/api/production/available')
    ])
    setIngredients(await ingredientsRes.json())
    setProducts(await productsRes.json())
    setProduction(await productionRes.json())
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
          <ul>
            {ingredients.map(ing => (
              <li key={ing.id}>{ing.name}: {ing.quantity} {ing.unit}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Productos</h2>
          <ul>
            {products.map(prod => (
              <li key={prod.id}>{prod.name}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Producción Disponible</h2>
          <ul>
            {production.map(prod => (
              <li key={prod.productId}>{prod.productName}: {prod.availablePortions} unidades</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}