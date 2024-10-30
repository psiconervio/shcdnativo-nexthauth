'use client'
// src/app/ingredients/page.js
import ProductCalculate from '@/components/ProductCalculate';
import IngredientList from '../../components/IngredientList'
import ProductForm from '@/components/ProductForm';
import IngredientForm from '@/components/IngredientForm';
import Reports from '@/components/Reports';
import EditProductForm from '@/components/EditProductForm';

export default function IngredientsPage() {
  return <>
  <h1  className='text-sky-400 my-10'>calcular producto</h1>
  <ProductCalculate productId={0}/>
  <h1  className='text-sky-400 my-10'>productform</h1>
  <ProductForm />
    <h1  className='text-sky-400 my-10'>lista de ingredientes</h1>
  <IngredientList/>
  <h1  className='text-sky-400 my-10'>formulario de ingredientes</h1>
  <IngredientForm />
    <h1 className='text-sky-400 my-10'>Reportes</h1>
  <Reports/>
  <h1 className='text-sky-400 my-10'>Product Calculate</h1>

 <ProductCalculate productId={0}/>
 <h1 className='text-sky-400 my-10'>Editar Producto</h1>
 <EditProductForm/>

  </>
}