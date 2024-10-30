import { useState, useEffect } from "react";

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
}

interface ProductFormProps {
  product?: {
    id: number;
    name: string;
    portionSize: number;
    portionsPerBatch: number;
    margin: number;
    tax: number;
    ingredients: Ingredient[];
  };
  onSubmit: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product?.name || "");
  const [portionSize, setPortionSize] = useState(product?.portionSize || 0);
  const [portionsPerBatch, setPortionsPerBatch] = useState(product?.portionsPerBatch || 0);
  const [margin, setMargin] = useState(product?.margin || 0);
  const [tax, setTax] = useState(product?.tax || 0);
  const [ingredients, setIngredients] = useState<Ingredient[]>(product?.ingredients || []);

  useEffect(() => {
    if (product) {
      setIngredients(product.ingredients || []);
    }
  }, [product]);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now(), name: "", quantity: 0 }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    setIngredients(
      ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = product ? "PUT" : "POST";
    const url = product ? `/api/products/${product.id}` : "/api/products";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, portionSize, portionsPerBatch, margin, tax, ingredients }),
    }).then(onSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{product ? "Editar Producto" : "Crear Producto"}</h3>
      
      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-gray-700">Nombre del Producto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nombre del producto"
        />
      </div>

      {/* Tamaño de Porción */}
      <div className="mb-4">
        <label className="block text-gray-700">Tamaño de Porción</label>
        <input
          type="number"
          value={portionSize}
          onChange={(e) => setPortionSize(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Tamaño de porción"
        />
      </div>

      {/* Porciones por Lote */}
      <div className="mb-4">
        <label className="block text-gray-700">Porciones por Lote</label>
        <input
          type="number"
          value={portionsPerBatch}
          onChange={(e) => setPortionsPerBatch(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Porciones por lote"
        />
      </div>

      {/* Margen */}
      <div className="mb-4">
        <label className="block text-gray-700">Margen (%)</label>
        <input
          type="number"
          value={margin}
          onChange={(e) => setMargin(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Margen"
        />
      </div>

      {/* Impuesto */}
      <div className="mb-4">
        <label className="block text-gray-700">Impuesto (%)</label>
        <input
          type="number"
          value={tax}
          onChange={(e) => setTax(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Impuesto"
        />
      </div>

      {/* Ingredientes */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Ingredientes</h4>
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className="mb-2 flex items-center space-x-3">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              className="flex-grow px-3 py-2 border rounded-lg"
              placeholder="Nombre del ingrediente"
            />
            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, "quantity", parseFloat(e.target.value))}
              className="w-24 px-3 py-2 border rounded-lg"
              placeholder="Cantidad"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
        >
          Añadir Ingrediente
        </button>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded-lg">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg">
          {product ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
