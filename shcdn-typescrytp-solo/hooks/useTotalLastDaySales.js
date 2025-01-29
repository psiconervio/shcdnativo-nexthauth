import { useState, useEffect } from "react";
import { fetchSales } from "@/lib/apisales";

export const useTotalLastDaySales = () => {
  const [totalLastDaySales, setTotalLastDaySales] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getTotalLastDaySales = async () => {
      try {
        const rawSales = await fetchSales();

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const lastDayStr = yesterday.toISOString().split("T")[0];

        // 🔹 Sumar todas las cantidades de ventas del último día
        const total = rawSales
          .filter(sale => sale.date.split("T")[0] === lastDayStr)
          .reduce((sum, sale) => 
            sum + sale.products.reduce((subSum, product) => subSum + product.quantity, 0)
          , 0);

        setTotalLastDaySales(total);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalLastDaySales();
  }, []);

  return { totalLastDaySales, isLoading, fetchError };
};
