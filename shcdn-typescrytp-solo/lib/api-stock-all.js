
//produccion 
export const fetchProductionLog = async () => {
    try {
      const response = await fetch('api/stock/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };