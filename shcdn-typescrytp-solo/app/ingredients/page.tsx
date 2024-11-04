'use client'
// src/app/ingredients/page.js
import ProductCalculate from '@/components/ProductCalculate';
import IngredientList from '../../components/IngredientList'
import ProductForm from '@/components/ProductForm';
import IngredientForm from '@/components/IngredientForm';
import Reports from '@/components/Reports';
import EditProductForm from '@/components/EditProductForm';
import IngredientManager from '@/components/IngredientManager';
import ProductManager from '@/components/ProductManager';

export default function IngredientsPage() {
  return <>
  {/* <IngredientManager className="mb-10" /> */}
  <br></br>
  <ProductManager/>

  </>
}