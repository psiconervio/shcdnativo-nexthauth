
// src/app/page.js
import IngredientList from '@/components/IngredientList'
import Dashboard from '../../components/Dashboard'
import ProductionPlanner from '@/components/ProductionPlanner'
import ProductList from '@/components/ProductList'

export default function Home() {
  return <>
  <Dashboard />
  <IngredientList/>
  <ProductList/>
  <ProductionPlanner/>
  </>

}