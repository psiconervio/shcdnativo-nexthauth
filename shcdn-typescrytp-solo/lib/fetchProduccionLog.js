export const fetchProduction = async () => {
  try {
    const response = await fetch("/api/stock/all");

    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchProduction:", error);
    throw error;
  }
};
