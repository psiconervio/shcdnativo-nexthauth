/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from "next/image"
import { useEffect, useState } from 'react';
import Link from "next/link"
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/ingredients');
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    
    fetchIngredients();
  }, []);

  // Abre el modal y establece el ingrediente seleccionado para editar
  const handleEditClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditedData({
      name: ingredient.name,
      price: ingredient.price,
      quantity: ingredient.quantity,
    });
    setIsEditModalOpen(true);
  };

  // Lógica para manejar el guardado de cambios en la API
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/ingredients/${selectedIngredient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedIngredient = await response.json();

        // Actualizar la lista de ingredientes localmente sin hacer otro fetch a la lista completa
        const updatedList = ingredients.map((ingredient) =>
          ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
        );
        setIngredients(updatedList);
        setIsEditModalOpen(false); // Cierra el modal
      } else {
        console.error('Error updating ingredient');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Ingredient
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                  <CardDescription>
                    Manage your ingredients here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                          <TableCell className="font-medium">
                            {ingredient.name ?? 'N/A'}
                          </TableCell>
                          <TableCell>
                            ${ingredient.price?.toFixed(2) ?? 'N/A'}
                          </TableCell>
                          <TableCell>
                            {ingredient.quantity ?? 'N/A'}
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
                                <DropdownMenuItem onClick={() => handleEditClick(ingredient)}>Edit</DropdownMenuItem>
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
                    Showing all ingredients
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Modal para editar ingredientes */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Ingredient</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>Nombre </p>
              <Input
                placeholder="Name"
                value={editedData.name}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
              <p>precio </p>
              <Input
                type="number"
                placeholder="Price"
                value={editedData.price}
                onChange={(e) => setEditedData({ ...editedData, price: parseFloat(e.target.value) })}
              />
              <p>Cantidad </p>
              <Input
                type="number"
                placeholder="Quantity"
                value={editedData.quantity}
                onChange={(e) => setEditedData({ ...editedData, quantity: parseInt(e.target.value) })}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
//CODIGO MODULADO
// 'use client'
// import { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from "lucide-react"
// import IngredientsTable from '@/components/IngredientsTable';
// import IngredientEditModal from '@/components/IngredientEditModal';
// import { fetchIngredients, updateIngredient } from '@/lib/api';

// export default function IngredientsPage() {
//   const [ingredients, setIngredients] = useState([]);
//   const [selectedIngredient, setSelectedIngredient] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editedData, setEditedData] = useState({
//     name: '',
//     price: '',
//     quantity: '',
//   });

//   useEffect(() => {
//     const getIngredients = async () => {
//       const data = await fetchIngredients();
//       setIngredients(data);
//     };
//     getIngredients();
//   }, []);

//   const handleEditClick = (ingredient) => {
//     setSelectedIngredient(ingredient);
//     setEditedData({
//       name: ingredient.name,
//       price: ingredient.price,
//       quantity: ingredient.quantity,
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleSaveChanges = async () => {
//     const updatedIngredient = await updateIngredient(selectedIngredient.id, editedData);
//     if (updatedIngredient) {
//       const updatedList = ingredients.map((ingredient) =>
//         ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
//       );
//       setIngredients(updatedList);
//       setIsEditModalOpen(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <div className="ml-auto p-4">
//         <Button size="sm" className="h-8 gap-1">
//           <PlusCircle className="h-3.5 w-3.5" />
//           <span>Add Ingredient</span>
//         </Button>
//       </div>
//       <IngredientsTable ingredients={ingredients} onEdit={handleEditClick} />
//       <IngredientEditModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveChanges}
//         editedData={editedData}
//         setEditedData={setEditedData}
//       />
//     </div>
//   );
// }



// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client'
// import Image from "next/image"
// import { useEffect, useState } from 'react';

// import Link from "next/link"
// import {
//   File,
//   Home,
//   LineChart,
//   ListFilter,
//   MoreHorizontal,
//   Package,
//   Package2,
//   PanelLeft,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Users2,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { TooltipProvider } from "@radix-ui/react-tooltip"

// // export const description =
// //   "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

// export default function Ingredients() {
//   const [ingredients, setIngredients] = useState([]);

//   useEffect(() => {
//     const fetchIngredients = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/ingredients');
//         const data = await response.json();
//         // console.log(data)
//         setIngredients(data);
//       } catch (error) {
//         console.error('Error fetching ingredients:', error);
//       }
//     };
    
//     fetchIngredients();
//   }, []);
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//           <Tabs defaultValue="all">
//             <div className="flex items-center">
//               <TabsList>
//                 <TabsTrigger value="all">All</TabsTrigger>
//                 <TabsTrigger value="active">Active</TabsTrigger>
//                 <TabsTrigger value="draft">Draft</TabsTrigger>
//                 <TabsTrigger value="archived" className="hidden sm:flex">
//                   Archived
//                 </TabsTrigger>
//               </TabsList>
//               <div className="ml-auto flex items-center gap-2">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" size="sm" className="h-8 gap-1">
//                       <ListFilter className="h-3.5 w-3.5" />
//                       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                         Filter
//                       </span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuCheckboxItem checked>
//                       Active
//                     </DropdownMenuCheckboxItem>
//                     <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
//                     <DropdownMenuCheckboxItem>
//                       Archived
//                     </DropdownMenuCheckboxItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//                 <Button size="sm" variant="outline" className="h-8 gap-1">
//                   <File className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                     Export
//                   </span>
//                 </Button>
//                 <Button size="sm" className="h-8 gap-1">
//                   <PlusCircle className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                     Add Product
//                   </span>
//                 </Button>
//               </div>
//             </div>
//             <TabsContent value="all">
//               <Card x-chunk="dashboard-06-chunk-0">
//                 <CardHeader>
//                   <CardTitle>Products</CardTitle>
//                   <CardDescription>
//                     Manage your products and view their sales performance.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="hidden w-[100px] sm:table-cell">
//                           <span className="sr-only">Image</span>
//                         </TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Status</TableHead>
//                         <TableHead className="hidden md:table-cell">
//                           Price
//                         </TableHead>
//                         <TableHead className="hidden md:table-cell">
//                           Stock
//                         </TableHead>
//                         <TableHead className="hidden md:table-cell">
//                           Created at
//                         </TableHead>
//                         <TableHead>
//                           <span className="sr-only">Actions</span>
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>
//                 {/* Contenedor principal  */}
//                     <TableBody>
//                     {ingredients.map((ingredient) => (

//                       <TableRow key={ingredient.id}>
//                         <TableCell className="hidden sm:table-cell">
//                           <Image
//                             alt="Product image"
//                             className="aspect-square rounded-md object-cover"
//                             height="64"
//                             src="/placeholder.svg"
//                             width="64" />
//                         </TableCell>
//                         <TableCell className="font-medium">
//                         {ingredient.name ?? 'N/A'}
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline">Draft</Badge>
//                         </TableCell>
//                         <TableCell className="hidden md:table-cell">
//                         ${ingredient.price?.toFixed(2) ?? 'N/A'}
//                         </TableCell>
//                         <TableCell className="hidden md:table-cell">
//                         {ingredient.quantity ?? 'N/A'}
//                         </TableCell>
//                         <TableCell className="hidden md:table-cell">
//                         {new Date().toLocaleString()}
//                         </TableCell>
//                         <TableCell>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button
//                                 aria-haspopup="true"
//                                 size="icon"
//                                 variant="ghost"
//                               >
//                                 <MoreHorizontal className="h-4 w-4" />
//                                 <span className="sr-only">Toggle menu</span>
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                               <Link href='dashboard/ingredients/editingredient'> 
//                               <DropdownMenuItem >Edit</DropdownMenuItem>
//                               </Link>
//                               <DropdownMenuItem>Delete</DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </TableCell>
//                       </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//                 <CardFooter>
//                   <div className="text-xs text-muted-foreground">
//                     Showing <strong>1-10</strong> of <strong>32</strong>{" "}
//                     products
//                   </div>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>
//     </div>
//   )
// }
