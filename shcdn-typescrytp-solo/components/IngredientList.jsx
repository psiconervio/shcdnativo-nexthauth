'use client'
import { useState, useEffect } from 'react'

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState({ name: '', unit: '', price: 0, quantity: 0 })
  const [editing, setEditing] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState(null)

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

  const handleEditInputChange = (e) => {
    setCurrentIngredient({ ...currentIngredient, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formattedIngredient = {
      ...newIngredient,
      price: parseFloat(newIngredient.price),
      quantity: parseFloat(newIngredient.quantity),
    }

    try {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedIngredient)
      })
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      setNewIngredient({ name: '', unit: '', price: 0, quantity: 0 })
      fetchIngredients()
    } catch (error) {
      console.error('Error al agregar ingrediente:', error)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    const updatedIngredient = {
      ...currentIngredient,
      price: parseFloat(currentIngredient.price),
      quantity: parseFloat(currentIngredient.quantity),
    };
  
    try {
      const response = await fetch(`/api/ingredients/${currentIngredient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedIngredient),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      setEditing(false);
      setCurrentIngredient(null);
      fetchIngredients();
    } catch (error) {
      console.error('Error al editar ingrediente:', error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/ingredients/${id}`, { method: 'DELETE' })
    fetchIngredients()
  }

  const startEditing = (ingredient) => {
    setEditing(true)
    setCurrentIngredient(ingredient)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Ingredientes</h1>
      {editing ? (
        <form onSubmit={handleEditSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={currentIngredient.name}
            onChange={handleEditInputChange}
            placeholder="Nombre"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="unit"
            value={currentIngredient.unit}
            onChange={handleEditInputChange}
            placeholder="Unidad de medida"
            className="border p-2 mr-2"
          />
          <input
            type="number"
            name="price"
            value={currentIngredient.price}
            onChange={handleEditInputChange}
            placeholder="Precio"
            className="border p-2 mr-2"
          />
          <input
            type="number"
            name="quantity"
            value={currentIngredient.quantity}
            onChange={handleEditInputChange}
            placeholder="Cantidad"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded mr-2">Guardar Cambios</button>
          <button onClick={() => setEditing(false)} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
        </form>
      ) : (
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
            placeholder="Unidad de medida"
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
      )}
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
                <button onClick={() => startEditing(ing)} className="bg-yellow-500 text-white p-1 rounded mr-2">Editar</button>
                <button onClick={() => handleDelete(ing.id)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}