import AjustarProductos from "@/components/AjustarProductos";
import AjustarStock from "@/components/AjustarStock";

export default function IngredientStock() {

  return (
    <div>
        <AjustarProductos productId={undefined}/>
        <AjustarStock ingredient={undefined}/>
    </div>
  );
}

