// 📂 lib/api.js
export const fetchSales = async () => {
    try {
      const response = await fetch("/api/sales");
      if (!response.ok) throw new Error("Error al obtener ventas");
      return await response.json();
    } catch (err) {
      console.error("Fetch Error:", err);
      throw err;
    }
  };
  