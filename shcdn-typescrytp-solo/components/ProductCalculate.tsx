import { useEffect, useState } from "react";

const ProductCalculate = ({ productId }: { productId: number }) => {
  const [cost, setCost] = useState<number | null>(null);

  const calculateCost = async () => {
    if (!productId) {
      console.error("ID de producto inválido.");
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}/calculate`);
      if (response.ok) {
        const data = await response.json();
        setCost(data.cost);
      } else {
        console.error("Error al calcular el costo:", response.statusText);
      }
    } catch (error) {
      console.error("Error al calcular el costo:", error);
    }
  };

  useEffect(() => {
    calculateCost();
  }, [productId]);

  return (
    <div>
      {cost !== null ? (
        <p>Costo calculado: ${cost}</p>
      ) : (
        <p>Calculando costo...</p>
      )}
    </div>
  );
};

export default ProductCalculate;
