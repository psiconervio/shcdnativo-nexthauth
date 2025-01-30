
//produccion 
export const fetchProductionLog = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/stock/log?type=DEFECTUOSO');
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