// src/components/ProductionPlanner.js
'use client'
import { useState, useEffect } from 'react'

export default function ProductionPlanner() {
  const [availableProduction, setAvailableProduction] = useState([])
  const [plannedProduction, setPlannedProduction] = useState({})

  useEffect(() => {
    fetchAvailableProduction()
  }, [])

  const fetchAvailableProduction = async () => {
    const res = await fetch('/api/production/available')
    const data = await res.json()
    setAvailableProduction(data)
    const initialPlanned = {}
    data.forEach(prod => {
      initialPlanned[prod.productId] = 0
    })
    setPlannedProduction(initialPlanned)
  }

  const handleInputChange = (productId, value) => {
    setPlannedProduction({
      ...plannedProduction,
      [productId]: parseInt(value) || 0
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Aquí podrías agregar la lógica para enviar la producción planificada al backend
    console.log('Producción planificada:', plannedProduction)
    // Refresca la producción disponible después de planificar
    fetchAvailableProduction()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Planificador de Producción</h1>
      <form onSubmit={handleSubmit}>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Disponible</th>
              <th>Planificado</th>
            </tr>
          </thead>
          <tbody>
            {availableProduction.map(prod => (
              <tr key={prod.productId}>
                <td>{prod.productName}</td>
                <td>{prod.availablePortions}</td>
                <td>
                  <input
                    type="number"
                    value={plannedProduction[prod.productId] || 0}
                    onChange={(e) => handleInputChange(prod.productId, e.target.value)}
                    max={prod.availablePortions}
                    className="border p-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Planificar Producción</button>
      </form>
    </div>
  )
}