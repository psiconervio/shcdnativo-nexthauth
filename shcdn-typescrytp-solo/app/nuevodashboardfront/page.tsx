'use client'
import { useState, useEffect } from 'react';

interface Ingredient {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  portions: number;
  tax: number;
  profitPercentage: number;
  ingredients: { quantity: number; ingredient: Ingredient }[];
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
};

const calculateProductData = (product: Product) => {
  const totalIngredientsCost = product.ingredients.reduce((acc, item) => {
    return acc + item.quantity * item.ingredient.price;
  }, 0);

  const costPerPortion = totalIngredientsCost / product.portions;
  const profitAmount = costPerPortion * (product.profitPercentage / 100);
  const basePrice = totalIngredientsCost + profitAmount * product.portions;
  const finalPrice = basePrice * (1 + product.tax / 100);

  return {
    costPerPortion,
    finalPrice,
    roundedPrice: Math.round(finalPrice),
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      {products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        products.map((product) => {
          const { costPerPortion, finalPrice, roundedPrice } = calculateProductData(product);

          return (
            <div key={product.id} style={{ marginBottom: '20px' }}>
              <h2>{product.name}</h2>
              <p><strong>Costo por porción:</strong> ${costPerPortion.toFixed(2)}</p>
              <p><strong>Precio final:</strong> ${finalPrice.toFixed(2)}</p>
              <p><strong>Precio redondeado:</strong> ${roundedPrice}</p>
              <h3>Ingredientes</h3>
              <ul>
                {product.ingredients.map((ingredientItem, idx) => (
                  <li key={idx}>
                    {ingredientItem.quantity} x {ingredientItem.ingredient.name} (Precio: ${ingredientItem.ingredient.price})
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
