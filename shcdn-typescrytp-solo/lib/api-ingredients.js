export async function fetchIngredients() {
    try {
      const response = await fetch('/api/ingredients');
      return response.json();
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      return [];
    }
  }
  
  export async function updateIngredient(id, data) {
    try {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update ingredient');
      return response.json();
    } catch (error) {
      console.error('Error updating ingredient:', error);
      return null;
    }
  }
  