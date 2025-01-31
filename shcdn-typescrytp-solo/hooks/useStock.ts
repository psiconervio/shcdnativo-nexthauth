// import { useState, useEffect } from "react";
// import { fetchstock } from "../lib/fetchStock";

// interface StockItem {
//   id: string;
//   product: {
//     name: string;
//   };
//   stock: number;
//   date: string; // 👈 Aseguramos que incluya la fecha de producción
//   createdAt: string;
// }

// const useStock = () => {
//   const [dataStock, setData] = useState<StockItem[]>([]);
//   const [dataStockloading, setLoading] = useState(true);
//   const [stockerror, setError] = useState<Error | null>(null);
//   const [totalStock, setTotalStock] = useState<number>(0);
//   const [todayStock, setTodayStock] = useState<number>(0); // 👈 Stock producido hoy
//   const [argDateTime, setArgDateTime] = useState<string>(""); // 👈 Fecha y hora de Argentina

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchstock();
//         setData(result);

//         // Calcular la suma total del stock
//         const stockSum = result.reduce((sum: number, item: StockItem) => sum + item.stock, 0);
//         setTotalStock(stockSum);

//         // Obtener la fecha y hora de Argentina (UTC-3)
//         const argDate = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
//         setArgDateTime(argDate);

//         // Extraer la fecha en formato YYYY-MM-DD
//         const today = new Date().toLocaleDateString("es-AR", {
//           timeZone: "America/Argentina/Buenos_Aires",
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//         }).split("/").reverse().join("-"); // Convierte a YYYY-MM-DD

//         // Filtrar productos creados hoy
//         const todayItems = result.filter((item: StockItem) => item.date.startsWith(today));

//         // Sumar la cantidad de stock producido hoy
//         const todayStockSum = todayItems.reduce((sum: number, item: StockItem) => sum + item.stock, 0);
//         setTodayStock(todayStockSum);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { dataStock, dataStockloading, stockerror, totalStock, todayStock, argDateTime }; // 👈 Retornamos argDateTime
// };

// export default useStock;


import { useState, useEffect } from "react";
import { fetchstock } from "../lib/fetchStock";

interface StockItem {
  id: string;
  product: {
    name: string;
  };
  stock: number;
  date: string; // 👈 Aseguramos que incluya la fecha de producción
  createdAt: string;
}

const useStock = () => {
  const [dataStock, setData] = useState<StockItem[]>([]);
  const [dataStockloading, setLoading] = useState(true);
  const [stockerror, setError] = useState<Error | null>(null);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [todayStock, setTodayStock] = useState<number>(0); // 👈 Agregamos el estado para stock del día

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchstock();
        setData(result);

        // Calcular la suma total del stock
        const stockSum = result.reduce((sum: number, item: StockItem) => sum + item.stock, 0);
        setTotalStock(stockSum);

        // Obtener la fecha de hoy en formato YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];

        // Filtrar productos creados hoy
        const todayItems = result.filter((item: StockItem) => item.date.startsWith(today));

        // Sumar la cantidad de stock producido hoy
        const todayStockSum = todayItems.reduce((sum: number, item: StockItem) => sum + item.stock, 0);
        setTodayStock(todayStockSum);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataStock, dataStockloading, stockerror, totalStock, todayStock }; // 👈 Retornamos todayStock también
};

export default useStock;

// import { useState, useEffect } from 'react';
// import { fetchstock } from '../lib/fetchStock';

// interface StockItem {
//   id: string;
//   product: {
//     name: string;
//   };
//   stock: number;
//   createdAt: string;
// }

// const useStock = () => {
//   const [dataStock, setData] = useState<StockItem[]>([]);
//   const [dataStockloading, setLoading] = useState(true);
//   const [stockerror, setError] = useState<Error | null>(null);
//   const [totalStock, setTotalStock] = useState<number>(0); // 👈 Agregamos el estado para la suma total

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchstock();
//         setData(result);

//         // Calcular la suma total del stock
//         const stockSum = result.reduce((sum: number, item: StockItem) => sum + item.stock, 0);
//         setTotalStock(stockSum);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { dataStock, dataStockloading, stockerror, totalStock }; // 👈 Retorna totalStock también
// };

// export default useStock;

// import { useState, useEffect } from 'react';
// import { fetchstock } from '../lib/fetchStock';

// interface StockItem {
//   id: string;
//   product: {
//     name: string;
//   };
//   stock: number;
//   createdAt: string;
// }

// const useStock = () => {
//   const [dataStock, setData] = useState<StockItem[]>([]); // 👈 Ahora inicia como un array vacío
//   const [dataStockloading, setLoading] = useState(true);
//   const [stockerror, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchstock();
//         setData(result);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { dataStock, dataStockloading, stockerror };
// };

// export default useStock;

// import { useState, useEffect } from 'react';
// import { fetchstock } from '../lib/fetchStock';

// const useStock = () => {
//   const [dataStock, setData] = useState(null);
//   const [dataStockloading, setLoading] = useState(true);
//   const [stockerror, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await fetchstock();
//         setData(result);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { dataStock, dataStockloading, stockerror };
// };

// export default useStock;