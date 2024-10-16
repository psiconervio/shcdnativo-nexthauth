'use client';

import { useState, useEffect } from 'react';

export default function AvailablePortions({ productId }) {
  const [maxPortions, setMaxPortions] = useState(0);

  useEffect(() => {
    const fetchPortions = async () => {
      const res = await fetch(`/api/products/${productId}/available-portions`);
      const data = await res.json();
      setMaxPortions(data.maxPortions);
    };

    fetchPortions();
  }, [productId]);

  return (
    <div>
      <h2>Porciones Disponibles</h2>
      <p>Puedes hacer {maxPortions} porciones con el stock actual.</p>
    </div>
  );
}
