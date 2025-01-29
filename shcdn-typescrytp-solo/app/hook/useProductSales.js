// 📂 hooks/useProductSales.js
import { useState, useEffect } from "react";
import { fetchSales } from "@/lib/api";

export const useProductSales = () => {
  const [productSales, setProductSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      try {
        const rawSales = await fetchSales();

        // 🔹 Transformar los datos: Agrupar por `productId` y sumar cantidades
        const salesByProduct = rawSales.reduce((acc, sale) => {
          sale.products.forEach(({ productId, quantity, product }) => {
            if (!acc[productId]) {
              acc[productId] = {
                productId,
                name: product.name,
                totalQuantity: 0
              };
            }
            acc[productId].totalQuantity += quantity;
          });

          return acc;
        }, {});

        setProductSales(Object.values(salesByProduct)); // Convertir a array para mapearlo en el componente
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  return { productSales, loading, error };
};
