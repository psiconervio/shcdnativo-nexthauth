import { useState, useEffect } from "react";

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  portionSize: number;
  portionsPerBatch: number;
  margin: number;
  tax: number;
  ingredients: Ingredient[];
}

interface EditProductFormProps {
  productId: number;
  onSubmit: () => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ productId, onSubmit, onCancel }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the product data by ID
    fetch(`/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (product) {
      setProduct({ ...product, [field]: value });
    }
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    if (product) {
      const updatedIngredients = product.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      );
      setProduct({ ...product, ingredients: updatedIngredients });
    }
  };

  const addIngredient = () => {
    if (product) {
      const newIngredient: Ingredient = { id: Date.now(), name: "", quantity: 0 };
      setProduct({ ...product, ingredients: [...product.ingredients, newIngredient] });
    }
  };

  const removeIngredient = (index: number) => {
    if (product) {
      const updatedIngredients = product.ingredients.filter((_, i) => i !== index);
      setProduct({ ...product, ingredients: updatedIngredients });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }).then(onSubmit);
    }
  };

  if (loading) {
    return <p>Cargando datos del producto...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Editar Producto</h3>
      
      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-gray-700">Nombre del Producto</label>
        <input
          type="text"
          value={product?.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nombre del producto"
        />
      </div>

      {/* Tamaño de Porción */}
      <div className="mb-4">
        <label className="block text-gray-700">Tamaño de Porción</label>
        <input
          type="number"
          value={product?.portionSize || 0}
          onChange={(e) => handleInputChange("portionSize", parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Tamaño de porción"
        />
      </div>

      {/* Porciones por Lote */}
      <div className="mb-4">
        <label className="block text-gray-700">Porciones por Lote</label>
        <input
          type="number"
          value={product?.portionsPerBatch || 0}
          onChange={(e) => handleInputChange("portionsPerBatch", parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Porciones por lote"
        />
      </div>

      {/* Margen */}
      <div className="mb-4">
        <label className="block text-gray-700">Margen (%)</label>
        <input
          type="number"
          value={product?.margin || 0}
          onChange={(e) => handleInputChange("margin", parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Margen"
        />
      </div>

      {/* Impuesto */}
      <div className="mb-4">
        <label className="block text-gray-700">Impuesto (%)</label>
        <input
          type="number"
          value={product?.tax || 0}
          onChange={(e) => handleInputChange("tax", parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Impuesto"
        />
      </div>

      {/* Ingredientes */}
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Ingredientes</h4>
        {product?.ingredients.map((ingredient, index) => (
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
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
