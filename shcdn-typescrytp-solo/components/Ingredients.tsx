import { useState, useEffect } from 'react';
import { Modal, Button, Input } from "@/components/ui"; // Asegúrate de tener un componente de modal adecuado
import { useRouter } from 'next/router';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: 0, quantity: 0 });
  const router = useRouter();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/ingredients');
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleEditClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setFormData(ingredient);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedIngredient(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/ingredients/${selectedIngredient.name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedIngredient = await response.json();
        setIngredients(ingredients.map(ing => 
          ing.id === updatedIngredient.id ? updatedIngredient : ing
        ));
        handleCloseModal();
      } else {
        console.error('Error updating ingredient');
      }
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  return (
    <div>
      {/* Código anterior de la tabla */}
      {ingredients.map((ingredient) => (
        <TableRow key={ingredient.id}>
          {/* ...otras celdas */}
          <TableCell>
            <Button onClick={() => handleEditClick(ingredient)}>Edit</Button>
          </TableCell>
        </TableRow>
      ))}

      {/* Modal para editar ingrediente */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <h3>Edit Ingredient</h3>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <Input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
            />
            <Button onClick={handleSaveChanges}>Save Changes</Button>
            <Button onClick={handleCloseModal} variant="outline">Cancel</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
