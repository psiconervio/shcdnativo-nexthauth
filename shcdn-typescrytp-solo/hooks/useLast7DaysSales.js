import { useState, useEffect } from "react";
import { fetchSales } from "@/lib/apisales";

export const useLast7DaysSales = () => {
  const [sales, setSales] = useState([]);
  const [totalLast7Days, setTotalLast7Days] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLast7DaysSales = async () => {
      try {
        const rawSales = await fetchSales();
        console.log("📊 Todas las ventas:", rawSales);

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7); // Restamos 7 días

        let totalQuantity = 0;

        const salesLast7Days = rawSales
          .filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate >= sevenDaysAgo && saleDate <= today;
          })
          .reduce((acc, sale) => {
            const date = sale.date.split("T")[0];

            if (!acc[date]) acc[date] = { date, totalQuantity: 0 };

            const dayQuantity = sale.products.reduce(
              (sum, product) => sum + product.quantity,
              0
            );

            acc[date].totalQuantity += dayQuantity;
            totalQuantity += dayQuantity;

            return acc;
          }, {});

        setSales(Object.values(salesLast7Days));
        setTotalLast7Days(totalQuantity);
        console.log("✅ Total últimos 7 días:", totalQuantity);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLast7DaysSales();
  }, []);

  return { sales, totalLast7Days, loading, error };
};
