import { useEffect, useState } from "react";

const useSalesByDay = (apiUrl) => {
  const [salesByDay, setSalesByDay] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Error al obtener ventas");
        
        const sales = await response.json();

        // Procesar datos
        const groupedSales = sales.reduce((acc, sale) => {
          const date = sale.date.split("T")[0];
          if (!acc[date]) acc[date] = 0;
          acc[date] += sale.products.reduce((sum, product) => sum + product.quantity, 0);
          return acc;
        }, {});

        setSalesByDay(groupedSales);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [apiUrl]); // Se ejecuta cuando cambia la URL

  return { salesByDay, loading, error };
};

export default useSalesByDay;
