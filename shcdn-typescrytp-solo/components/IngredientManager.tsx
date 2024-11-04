// app/components/IngredientManager.tsx
import { useEffect, useState } from 'react';

export default function IngredientManager() {
  const [view, setView] = useState<'list' | 'form' | 'details'>('list');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [formData, setFormData] = useState({ name: '', unit: '', price: 0, quantity: 0 });

  // Fetch ingredientes
  useEffect(() => {
    if (view === 'list') {
      fetch('/api/ingredients')
        .then((res) => res.json())
        .then(setIngredients);
    }
  }, [view]);

  // Seleccionar un ingrediente para ver detalles o editar
  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setView('details');
  };

  // Crear un nuevo ingrediente o editar el seleccionado
  const handleSaveIngredient = async () => {
    const method = selectedIngredient ? 'PUT' : 'POST';
    const url = selectedIngredient
      ? `/api/ingredients/${selectedIngredient.id}`
      : '/api/ingredients';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({ name: '', unit: '', price: 0, quantity: 0 });
    setSelectedIngredient(null);
    setView('list');
  };

  // Eliminar un ingrediente
  const handleDeleteIngredient = async () => {
    if (selectedIngredient) {
      await fetch(`/api/ingredients/${selectedIngredient.id}`, { method: 'DELETE' });
      setSelectedIngredient(null);
      setView('list');
    }
  };

  // Cambiar a vista de formulario para agregar o editar
  const handleEditIngredient = (ingredient = null) => {
    setSelectedIngredient(ingredient);
    setFormData(ingredient || { name: '', unit: '', price: 0, quantity: 0 });
    setView('form');
  };

  // Cambiar a la vista de lista
  const handleCancel = () => {
    setFormData({ name: '', unit: '', price: 0, quantity: 0 });
    setSelectedIngredient(null);
    setView('list');
  };

  return (
    <div>
      {view === 'list' && (
        <div>
          <h2>Ingredientes</h2>
          <button onClick={() => handleEditIngredient()}>Agregar Ingrediente</button>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.unit}
                <button onClick={() => handleSelectIngredient(ingredient)}>Detalles</button>
                <button onClick={() => handleEditIngredient(ingredient)}>Editar</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === 'details' && selectedIngredient && (
        <div>
          <h2>Detalles de {selectedIngredient.name}</h2>
          <p>Unidad: {selectedIngredient.unit}</p>
          <p>Precio: {selectedIngredient.price}</p>
          <p>Cantidad: {selectedIngredient.quantity}</p>
          <button onClick={() => handleEditIngredient(selectedIngredient)}>Editar</button>
          <button onClick={handleDeleteIngredient}>Eliminar</button>
          <button onClick={handleCancel}>Volver</button>
        </div>
      )}

      {view === 'form' && (
        <form onSubmit={(e) => { e.preventDefault(); handleSaveIngredient(); }}>
          <h2>{selectedIngredient ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}</h2>
          <input
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre"
          />
          <input
            name="unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="Unidad"
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            placeholder="Precio"
          />
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
            placeholder="Cantidad"
          />
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
      )}
    </div>
  );
}
