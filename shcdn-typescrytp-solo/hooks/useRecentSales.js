import { useState, useEffect } from "react";
import { fetchSales } from "@/lib/apisales";

export const useRecentSales = () => {
  const [recentSales, setRecentSales] = useState([]);
  const [totalRecentQuantity, setTotalRecentQuantity] = useState(0);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [errorRecent, setErrorRecent] = useState(null);

  useEffect(() => {
    const getRecentSales = async () => {
      try {
        const rawSales = await fetchSales();
        console.log("📊 Todas las ventas:", rawSales);

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        let totalQuantity = 0;

        const recentSalesByDay = rawSales
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

        setRecentSales(Object.values(recentSalesByDay));
        setTotalRecentQuantity(totalQuantity);
        console.log("✅ Total últimos 7 días:", totalQuantity);
      } catch (err) {
        setErrorRecent(err.message);
      } finally {
        setLoadingRecent(false);
      }
    };

    getRecentSales();
  }, []);

  return { recentSales, totalRecentQuantity, loadingRecent, errorRecent };
};
