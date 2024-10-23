import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalTrigger } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditIngredientModal = ({ ingredient, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: ingredient?.name || '',
    price: ingredient?.price || '',
    quantity: ingredient?.quantity || '',
  });

  const handleUpdateIngredient = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/ingredients/${ingredient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error updating ingredient');

      const updatedIngredient = await response.json();
      onUpdate(updatedIngredient); // Callback to update the ingredient in the parent component
    } catch (error) {
      console.error('Error updating ingredient:', error);
      alert('Failed to update ingredient.');
    }
  };

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Edit Ingredient</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Ingredient</ModalTitle>
          <ModalDescription>
            Modify the details of the ingredient below.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-6 p-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setFormData({ name: '', price: '', quantity: '' })}>
            Cancel
          </Button>
          <Button onClick={handleUpdateIngredient}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditIngredientModal;