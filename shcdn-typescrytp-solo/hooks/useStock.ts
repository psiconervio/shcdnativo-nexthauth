import { useState, useEffect } from 'react';
import { fetchstock } from '../lib/fetchStock';

interface StockItem {
  id: string;
  product: {
    name: string;
  };
  stock: number;
  createdAt: string;
}

const useStock = () => {
  const [dataStock, setData] = useState<StockItem[]>([]); // 👈 Ahora inicia como un array vacío
  const [dataStockloading, setLoading] = useState(true);
  const [stockerror, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchstock();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataStock, dataStockloading, stockerror };
};

export default useStock;

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