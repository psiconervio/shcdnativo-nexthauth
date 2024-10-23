import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EditIngredientDialog({ ingredient, onUpdate }) {
  const [name, setName] = useState(ingredient.name);
  const [price, setPrice] = useState(ingredient.price);
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, quantity }),
      });

      if (response.ok) {
        const updatedIngredient = await response.json();
        onUpdate(updatedIngredient); // Actualizar en la lista del frontend
        alert("Ingredient updated successfully!");
      } else {
        console.error("Error updating ingredient:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating ingredient:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ingredient</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <Input 
            placeholder="Price" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))} 
          />
          <Input 
            placeholder="Quantity" 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
          />
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
