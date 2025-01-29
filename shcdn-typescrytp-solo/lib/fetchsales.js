
url='/api/sales';
export const fetchSales = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener ventas");
      return await response.json();
    } catch (err) {
      throw err;
    }
  };
  