'use client';

import { useState } from 'react';

export default function IngredientStock({ ingredient }) {
  const [stock, setStock] = useState(ingredient.stock);
  const [adjustment, setAdjustment] = useState(0);

  const adjustStock = async () => {
    const res = await fetch(`/api/ingredients/${ingredient.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockAdjustment: adjustment }),
    });
    const data = await res.json();
    setStock(data.stock);
  };

  return (
    <div>
      <h2>{ingredient.name}</h2>
      <p>Stock actual: {stock}</p>
      <input
        type="number"
        value={adjustment}
        onChange={(e) => setAdjustment(Number(e.target.value))}
        placeholder="Ajustar stock"
      />
      <button onClick={adjustStock}>Actualizar Stock</button>
    </div>
  );
}
