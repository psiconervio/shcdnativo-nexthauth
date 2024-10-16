// src/components/IngredientList.js
'use client'
import { useState, useEffect } from 'react'

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState({ name: '', unit: '', price: 0, quantity: 0 })

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    const res = await fetch('/api/ingredients')
    setIngredients(await res.json())
  }

  const handleInputChange = (e) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/ingredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIngredient)
    })
    setNewIngredient({ name: '', unit: '', price: 0, quantity: 0 })
    fetchIngredients()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/ingredients/${id}`, { method: 'DELETE' })
    fetchIngredients()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Ingredientes</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={newIngredient.name}
          onChange={handleInputChange}
          placeholder="Nombre"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="unit"
          value={newIngredient.unit}
          onChange={handleInputChange}
          placeholder="Unidad"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="price"
          value={newIngredient.price}
          onChange={handleInputChange}
          placeholder="Precio"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="quantity"
          value={newIngredient.quantity}
          onChange={handleInputChange}
          placeholder="Cantidad"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar</button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Unidad</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id}>
              <td>{ing.name}</td>
              <td>{ing.unit}</td>
              <td>{ing.price}</td>
              <td>{ing.quantity}</td>
              <td>
                <button onClick={() => handleDelete(ing.id)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
