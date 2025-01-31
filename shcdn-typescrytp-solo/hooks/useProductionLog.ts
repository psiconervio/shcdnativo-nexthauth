import { useState, useEffect } from "react";
//fetch a api/stock/all
import { fetchstocklog } from "../lib/fetchStock";

interface StockItem {
  id: number;
  productId: number;
  stock: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
  };
}

interface StockLogItem {
  id: number;
  productId: number;
  type: "PRODUCIDO" | "DEFECTUOSO";
  quantity: number;
  comment: string;
  createdAt: string;
  product: {
    id: number;
    name: string;
  };
}

interface ProductionData {
  totalStock: number;
  stock: StockItem[];
  stockLog: StockLogItem[];
  defectiveProductsTotal: number;
  producedProductsTotal: number;
}

const useProductionLog = () => {
  const [data, setData] = useState<ProductionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [producedToday, setProducedToday] = useState<number>(0);
  const [producedCurrentHour, setProducedCurrentHour] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchstocklog();
        setData(result);

        // Calcular producción del día actual
        const todayProduced = calculateTodayProduced(result.stockLog);
        setProducedToday(todayProduced);

        // Calcular producción de la hora actual
        const currentHourProduced = calculateCurrentHourProduced(result.stockLog);
        setProducedCurrentHour(currentHourProduced);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, producedToday, producedCurrentHour };
};
const calculateTodayProduced = (stockLog: StockLogItem[]): number => {
  const today = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" en formato Canadá

  return stockLog
    .filter((item) => {
      const itemDate = new Date(item.createdAt).toLocaleDateString("en-CA");
      return item.type === "PRODUCIDO" && itemDate === today;
    })
    .reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Calcula la cantidad total producida en la fecha actual.
 */
// const calculateTodayProduced = (stockLog: StockLogItem[]): number => {
//   const today = new Date().toISOString().split("T")[0]; // Formato "YYYY-MM-DD"

//   return stockLog
//     .filter((item) => item.type === "PRODUCIDO" && item.createdAt.startsWith(today))
//     .reduce((sum, item) => sum + item.quantity, 0);
// };

/**
 * Calcula la cantidad producida en la hora actual.
 */
const calculateCurrentHourProduced = (stockLog: StockLogItem[]): number => {
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const currentHour = now.getHours(); // Obtiene la hora actual (0-23)

  return stockLog
    .filter((item) => {
      const itemDate = new Date(item.createdAt);
      return item.type === "PRODUCIDO" &&
        itemDate.toISOString().split("T")[0] === today &&
        itemDate.getHours() === currentHour;
    })
    .reduce((sum, item) => sum + item.quantity, 0);
};

export default useProductionLog;
