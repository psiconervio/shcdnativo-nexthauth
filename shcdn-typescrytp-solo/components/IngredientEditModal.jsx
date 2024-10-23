import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IngredientEditModal({ isOpen, onClose, onSave, editedData, setEditedData }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ingredient</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Name"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Price"
            value={editedData.price}
            onChange={(e) => setEditedData({ ...editedData, price: parseFloat(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={editedData.quantity}
            onChange={(e) => setEditedData({ ...editedData, quantity: parseInt(e.target.value) })}
          />
        </div>
        <DialogFooter>
          <Button onClick={onSave}>Save Changes</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
