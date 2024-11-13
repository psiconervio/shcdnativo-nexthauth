"use client";
import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from "react";
import { Plus, PencilIcon, Trash2Icon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface Ingredient {
  id: number;
  name: string;
  price: number;
}

interface ProductIngredient {
  ingredientId: number;
  quantity: number;
  ingredient: Ingredient;
}

interface Product {
  id: number;
  name: string;
  portions: number;
  costPerPortion: number;
  priceWithoutTax: number;
  tax: number;
  finalPrice: number;
  roundedPrice: number;
  profitPercentage : number;
  profitAmount: number;
  ingredients: ProductIngredient[];
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    portions: 1,
    tax: 19,
    profitPercentage: 100,
    profitAmount: 0, // Agregar esta línea

    ingredients: [{ ingredientId: 0, quantity: 1 }],
  });

  useEffect(() => {
    fetchProducts();
    fetchIngredients();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchIngredients = async () => {
    const response = await fetch("/api/ingredients");
    const data = await response.json();
    setIngredients(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save product");

      toast({
        title: `Product ${editingProduct ? "updated" : "created"} successfully`,
        variant: "default",
      });

      setIsOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      portions: 1,
      tax: 19,
      profitPercentage: 0, // Agrega un valor inicial para profitPercentage
      profitAmount: 0, // Agrega un valor inicial para profitAmount
      ingredients: [{ ingredientId: 0, quantity: 1 }],
    });
    setEditingProduct(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      toast({
        title: "Product deleted successfully",
        variant: "default",
      });

      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return (
<div className="container mx-auto py-10 px-4 sm:px-0">
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
    <h1 className="text-3xl sm:text-4xl font-bold">Product Management</h1>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={resetForm} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="portions">Portions</Label>
                <Input
                  id="portions"
                  type="number"
                  min="1"
                  value={formData.portions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      portions: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tax">Impuesto (%)</Label>
                <Input
                  id="tax"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.tax}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tax: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tax">GanaciaPorcentaje (%)</Label>
                <Input
                  id="tax"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.profitPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profitPercentage: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Ingredients</Label>
              {formData.ingredients.map((ing, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
  <Select
    value={ing.ingredientId.toString()}
    onValueChange={(value) => {
      const newIngredients = [...formData.ingredients];
      newIngredients[index].ingredientId = parseInt(value);
      setFormData({ ...formData, ingredients: newIngredients });
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select ingredient" />
    </SelectTrigger>
    <SelectContent>
      {ingredients.map((ingredient) => (
        <SelectItem
          key={ingredient.id}
          value={ingredient.id.toString()}
        >
          {ingredient.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
{/*                 
                  <Select se comento el select porque daba error
                    value={ing.ingredientId.toString()}
                    onValueChange={(value) => {
                      const newIngredients = [...formData.ingredients];
                      newIngredients[index].ingredientId = parseInt(value);
                      setFormData({ ...formData, ingredients: newIngredients });
                    }}
                    className="flex-grow"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ingredient" />
                    </SelectTrigger>
                    <SelectContent>
                      {ingredients.map((ingredient) => (
                        <SelectItem
                          key={ingredient.id}
                          value={ingredient.id.toString()}
                        >
                          {ingredient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
              <Label>Cantidad(kg/unidad)</Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={ing.quantity}
                    onChange={(e) => {
                      const newIngredients = [...formData.ingredients];
                      newIngredients[index].quantity = parseFloat(
                        e.target.value
                      );
                      setFormData({
                        ...formData,
                        ingredients: newIngredients,
                      });
                    }}
                    placeholder="Quantity"
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const newIngredients = formData.ingredients.filter(
                        (_, i) => i !== index
                      );
                      setFormData({
                        ...formData,
                        ingredients: newIngredients,
                      });
                    }}
                    className="w-full sm:w-auto"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    ...formData,
                    ingredients: [
                      ...formData.ingredients,
                      { ingredientId: 0, quantity: 1 },
                    ],
                  })
                }
                className="w-full sm:w-auto"
              >
                Add Ingredient
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {editingProduct ? "Update" : "Create"} Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>

  <div className="grid gap-6">
    {products.map((product) => (
      <Card key={product.id}>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setEditingProduct(product);
                setFormData({
                  name: product.name,
                  portions: product.portions,
                  tax: product.tax,
                  profitPercentage: product.profitPercentage,
                  profitAmount: product.profitAmount,
                  ingredients: product.ingredients.map((ing) => ({
                    ingredientId: ing.ingredient.id,
                    quantity: ing.quantity,
                  })),
                });
                setIsOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(product.id)}
              className="w-full sm:w-auto"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-7 sm:gap-7 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Portions</p>
              <p className="text-lg sm:text-2xl font-bold">
                {product.portions}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cost/Portion</p>
              <p className="text-lg sm:text-2xl font-bold">
                ${product.costPerPortion.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Impuesto(%)</p>
              <p className="text-lg sm:text-2xl font-bold">
                {product.tax} %
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ganancia Esperada(%)</p>
              <p className="text-lg sm:text-2xl font-bold">
                {product.profitPercentage} %
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ganancia($)</p>
              <p className="text-lg sm:text-2xl font-bold relative group">
  $ {product.profitAmount ? product.profitAmount.toFixed(1) : '0.0'}
  <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    Más información sobre la ganancia
  </span>
</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Final Price</p>
              <p className="text-lg sm:text-2xl font-bold relative group">
  $ {product.finalPrice ? product.finalPrice.toFixed(1) : '0.0'}
  <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
    Impuesto+Precio sin impuesto
  </span>
</p>
              {/* <p className="text-lg sm:text-2xl font-bold">
                ${product.finalPrice.toFixed(1)}
              </p> */}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Redondeo</p>
              <p className="text-lg sm:text-2xl font-bold">
                ${product.roundedPrice.toFixed(1)}
              </p>
            </div>

          </div>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronDown className="h-4 w-4 mr-1" />
              Ingredients
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price/Unit</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.ingredients.map((ing) => (
                    <TableRow key={ing.ingredient.id}>
                      <TableCell>{ing.ingredient.name}</TableCell>
                      <TableCell>{ing.quantity}</TableCell>
                      <TableCell>${ing.ingredient.price.toFixed(1)}</TableCell>
                      <TableCell>
                        ${(ing.quantity * ing.ingredient.price).toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

  );
}