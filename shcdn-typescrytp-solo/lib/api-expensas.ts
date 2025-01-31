export async function getExpenses() {
    const res = await fetch('/api/expensas');
    if (!res.ok) throw new Error('Error al obtener las expensas');
    return res.json();
  }
  
  export async function getExpenseById(id: number) {
    const res = await fetch(`/api/expensas/${id}`);
    if (!res.ok) throw new Error('Error al obtener la expensa');
    return res.json();
  }
  
  export async function createExpense(data: any) {
    const res = await fetch('/api/expensas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear la expensa');
    return res.json();
  }
  
  export async function updateExpense(id: number, data: any) {
    const res = await fetch(`/api/expensas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar la expensa');
    return res.json();
  }
  
  export async function deleteExpense(id: number) {
    const res = await fetch(`/api/expensas/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar la expensa');
    return res.json();
  }
  