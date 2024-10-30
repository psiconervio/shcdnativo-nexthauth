import { useState } from "react";

interface IngredientFormProps {
  ingredient?: {
    id: number;
    name: string;
    unit: string;
    price: number;
  };
  onSubmit: () => void;
  onCancel: () => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ ingredient, onSubmit, onCancel }) => {
  const [name, setName] = useState(ingredient?.name || "");
  const [unit, setUnit] = useState(ingredient?.unit || "");
  const [price, setPrice] = useState(ingredient?.price || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = ingredient ? "PUT" : "POST";
    const url = ingredient ? `/api/ingredients/${ingredient.id}` : "/api/ingredients";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, unit, price }),
    }).then(onSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nombre"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Unidad</label>
        <input
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Unidad"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Precio"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded-lg">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg">
          {ingredient ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
};

export default IngredientForm;
