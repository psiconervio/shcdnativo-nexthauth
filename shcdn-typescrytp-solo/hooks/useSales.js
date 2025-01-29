import { useState, useEffect } from "react";
import { fetchSales } from "@/lib/apisales";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0); // 🔹 Nuevo estado para el total de ventas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      try {
        const rawSales = await fetchSales();

        let totalQuantity = 0; // 🔹 Acumulador de todas las cantidades vendidas

        const salesByDay = rawSales.reduce((acc, sale) => {
          const date = sale.date.split("T")[0]; // YYYY-MM-DD

          if (!acc[date]) acc[date] = { date, totalQuantity: 0 };

          const dayQuantity = sale.products.reduce(
            (sum, product) => sum + product.quantity,
            0
          );

          acc[date].totalQuantity += dayQuantity;
          totalQuantity += dayQuantity; // 🔹 Sumar al total general

          return acc;
        }, {});

        setSales(Object.values(salesByDay)); // Convertir a array
        setTotalSales(totalQuantity); // Guardar el total de ventas
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  return { sales, totalSales, loading, error };
};
