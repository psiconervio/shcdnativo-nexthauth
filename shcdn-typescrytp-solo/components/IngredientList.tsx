import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState, useEffect } from "react";
import IngredientForm from "./IngredientForm";

interface Ingredient {
  id: number;
  name: string;
  unit: string;
  price: number;
}

const IngredientList = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  useEffect(() => {
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then(setIngredients);
  }, []);

  const deleteIngredient = async (id: number) => {
    try {
      const response = await fetch(`/api/ingredients/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error('Error deleting ingredient');
      }
      setIngredients(prev => prev.filter(ing => ing.id !== id));
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías manejar el error de manera más sofisticada, como mostrando una notificación al usuario
    }
  };
  
  // const deleteIngredient = (id: number) => {
  //   fetch(`/api/ingredients/${id}`, { method: "DELETE" }).then(() => {
  //     setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  //   });
  // };

  const handleSave = () => {
    setEditingIngredient(null);
    fetch("/api/ingredients")
      .then((res) => res.json())
      .then(setIngredients);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Archived
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Precio
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Cantidad
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/*aca empieza la cuestion  */}
                    {ingredients.map((ingredient) => (

                    <TableRow key={ingredient.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {ingredient.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {ingredient.price}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {ingredient.unit}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {ingredient.id}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem >Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteIngredient(ingredient.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
        ))}

                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                  products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
    // <div className="p-4">
    //   <h2 className="text-xl font-semibold mb-4">Ingredientes</h2>
    //   <div className="grid gap-4">
    //     {ingredients.map((ingredient) => (
    //       <div key={ingredient.id} className="p-4 border rounded-lg shadow-md bg-white">
    //         <p className="font-semibold">{ingredient.name}</p>
    //         <p>Unidad: {ingredient.unit}</p>
    //         <p>Precio: ${ingredient.price}</p>
    //         <div className="flex space-x-2 mt-3">
    //           <button
    //             onClick={() => setEditingIngredient(ingredient)}
    //             className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
    //           >
    //             Editar
    //           </button>
    //           <button
    //             onClick={() => deleteIngredient(ingredient.id)}
    //             className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
    //           >
    //             Eliminar
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Modal para editar ingrediente */}
    //   {editingIngredient && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    //       <div className="bg-white p-6 rounded-lg w-full max-w-md">
    //         <h3 className="text-lg font-semibold mb-4">Editar Ingrediente</h3>
    //         <IngredientForm
    //           ingredient={editingIngredient}
    //           onSubmit={handleSave}
    //           onCancel={() => setEditingIngredient(null)}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default IngredientList;
