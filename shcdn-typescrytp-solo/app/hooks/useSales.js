// 📂 hooks/useSales.js
import { useState, useEffect } from "react";
import { fetchSales } from "@/lib/apisales";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      try {
        const rawSales = await fetchSales();

        // 🔹 Transformar los datos: Agrupar ventas por fecha y sumar cantidades
        const salesByDay = rawSales.reduce((acc, sale) => {
          const date = sale.date.split("T")[0]; // YYYY-MM-DD

          if (!acc[date]) acc[date] = { date, totalQuantity: 0 };

          acc[date].totalQuantity += sale.products.reduce(
            (sum, product) => sum + product.quantity,
            0
          );

          return acc;
        }, {});

        setSales(Object.values(salesByDay)); // Convertir a array para mapearlo en el componente
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  return { sales, loading, error };
};
