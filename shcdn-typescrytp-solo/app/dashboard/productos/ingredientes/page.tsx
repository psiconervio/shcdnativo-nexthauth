"use client";

import { useState, useEffect } from "react";
import { Plus, PencilIcon, Trash2Icon } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";

interface Ingredient {
  id: number;
  name: string;
  unit: string;
  price: number;
  quantity: number;
}

 function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ingredients");
      if (!response.ok) throw new Error("Failed to fetch ingredients");
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch ingredients",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingIngredient
        ? `/api/ingredients/${editingIngredient.id}`
        : "/api/ingredients";

      const response = await fetch(url, {
        method: editingIngredient ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save ingredient");

      toast({
        title: `Ingredient ${editingIngredient ? "updated" : "created"} successfully`,
        variant: "default",
      });

      setIsOpen(false);
      resetForm();
      fetchIngredients();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save ingredient",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      unit: "",
      price: 0,
      quantity: 0,
    });
    setEditingIngredient(null);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete ingredient");

      toast({
        title: "Ingredient deleted successfully",
        variant: "default",
      });

      fetchIngredients();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete ingredient",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-0">Gestion de Ingredientes  </h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Nuevo Ingrediente
            </Button>
          </DialogTrigger>
          <p className="mt-5 text-center justify-center items-center ">Al actualiza un ingrediente, se actualizan los productos relacionados con el ingrediente.</p>
          <DialogContent className="sm:max-w-[425px] w-full">
            <DialogHeader>
              <DialogTitle>
                {editingIngredient ? "Edit Ingredient" : "Add New Ingredient"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unidad (Ingresar kg, ml, unidad)</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Precio por Unidad</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingIngredient ? "Update" : "Create"} Ingredient
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ingredientes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell>{ingredient.unit}</TableCell>
                      <TableCell>${ingredient.price.toFixed(2)}</TableCell>
                      <TableCell>{ingredient.quantity}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingIngredient(ingredient);
                              setFormData({
                                name: ingredient.name,
                                unit: ingredient.unit,
                                price: ingredient.price,
                                quantity: ingredient.quantity,
                              });
                              setIsOpen(true);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(ingredient.id)}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default IngredientsPage
// "use client";

// import { useState, useEffect } from "react";
// import { Plus, PencilIcon, Trash2Icon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// interface Ingredient {
//   id: number;
//   name: string;
//   unit: string;
//   price: number;
//   quantity: number;
// }

// export default function IngredientsPage() {
//   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
//   const { toast } = useToast();

//   const [formData, setFormData] = useState({
//     name: "",
//     unit: "",
//     price: 0,
//     quantity: 0,
//   });

//   useEffect(() => {
//     fetchIngredients();
//   }, []);

//   const fetchIngredients = async () => {
//     try {
//       const response = await fetch("/api/ingredients");
//       if (!response.ok) throw new Error("Failed to fetch ingredients");
//       const data = await response.json();
//       setIngredients(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch ingredients",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const url = editingIngredient 
//         ? `/api/ingredients/${editingIngredient.id}` 
//         : "/api/ingredients";
      
//       const response = await fetch(url, {
//         method: editingIngredient ? "PATCH" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Failed to save ingredient");

//       toast({
//         title: `Ingredient ${editingIngredient ? "updated" : "created"} successfully`,
//         variant: "default",
//       });

//       setIsOpen(false);
//       resetForm();
//       fetchIngredients();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to save ingredient",
//         variant: "destructive",
//       });
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       unit: "",
//       price: 0,
//       quantity: 0,
//     });
//     setEditingIngredient(null);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const response = await fetch(`/api/ingredients/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Failed to delete ingredient");

//       toast({
//         title: "Ingredient deleted successfully",
//         variant: "default",
//       });

//       fetchIngredients();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete ingredient",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold">Ingredients Management</h1>
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogTrigger asChild>
//             <Button onClick={resetForm}>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Ingredient
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>
//                 {editingIngredient ? "Edit Ingredient" : "Add New Ingredient"}
//               </DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="unit">Unit</Label>
//                   <Input
//                     id="unit"
//                     value={formData.unit}
//                     onChange={(e) =>
//                       setFormData({ ...formData, unit: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="price">Price per Unit</Label>
//                   <Input
//                     id="price"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: parseFloat(e.target.value) })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="quantity">Quantity</Label>
//                   <Input
//                     id="quantity"
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.quantity}
//                     onChange={(e) =>
//                       setFormData({ ...formData, quantity: parseFloat(e.target.value) })
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => {
//                     setIsOpen(false);
//                     resetForm();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit">
//                   {editingIngredient ? "Update" : "Create"} Ingredient
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Ingredients List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Unit</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {ingredients.map((ingredient) => (
//                 <TableRow key={ingredient.id}>
//                   <TableCell>{ingredient.name}</TableCell>
//                   <TableCell>{ingredient.unit}</TableCell>
//                   <TableCell>${ingredient.price.toFixed(2)}</TableCell>
//                   <TableCell>{ingredient.quantity}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-2">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => {
//                           setEditingIngredient(ingredient);
//                           setFormData({
//                             name: ingredient.name,
//                             unit: ingredient.unit,
//                             price: ingredient.price,
//                             quantity: ingredient.quantity,
//                           });
//                           setIsOpen(true);
//                         }}
//                       >
//                         <PencilIcon className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => handleDelete(ingredient.id)}
//                       >
//                         <Trash2Icon className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }