"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface ExpenseItem {
  id: number;
  nombre: string;
  monto: number;
  fecha: string;
  type: "GASTOUNICO" | "GASTOMENSUAL";
  recurrence?: "DIARIO" | "SEMANAL" | "MENSUAL" | "ANUAL";
  createdAt: string;
  updatedAt: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TablaExpensas() {
  const { data: expenses, error, isLoading, mutate } = useSWR("/api/expensas", fetcher);
  const [isOpen, setIsOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<{
    nombre: string;
    monto: string;
    fecha: string;
    type: "GASTOUNICO" | "GASTOMENSUAL";
    recurrence?: "DIARIO" | "SEMANAL" | "MENSUAL" | "ANUAL";
  }>({
    nombre: "",
    monto: "",
    fecha: "",
    type: "GASTOUNICO",
  });

  const handleCreateExpense = async () => {
    try {
      const payload = { ...newExpense, monto: parseFloat(newExpense.monto) };
      if (payload.type !== "GASTOMENSUAL") delete payload.recurrence;

      await axios.post("/api/expensas", payload);
      mutate(); // Actualizar la lista de expensas
      setIsOpen(false); // Cerrar modal
      setNewExpense({ nombre: "", monto: "", fecha: "", type: "GASTOUNICO", recurrence: undefined }); // Reset form
    } catch (err) {
      console.error("Error al crear la expensa", err);
    }
  };

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Resumen de Gastos</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Gasto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Nuevo Gasto</DialogTitle>
            <DialogDescription>Completa los detalles de la nueva expensa</DialogDescription>
            <div className="grid gap-2">
              <Label>Nombre</Label>
              <Input value={newExpense.nombre} onChange={(e) => setNewExpense({ ...newExpense, nombre: e.target.value })} />

              <Label>Monto</Label>
              <Input type="number" value={newExpense.monto} onChange={(e) => setNewExpense({ ...newExpense, monto: e.target.value })} />

              <Label>Fecha</Label>
              <Input type="date" value={newExpense.fecha} onChange={(e) => setNewExpense({ ...newExpense, fecha: e.target.value })} />

              <Label>Tipo</Label>
              <Select value={newExpense.type} onValueChange={(value) => setNewExpense({ ...newExpense, type: value as "GASTOUNICO" | "GASTOMENSUAL" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GASTOUNICO">Gasto Único</SelectItem>
                  <SelectItem value="GASTOMENSUAL">Gasto Mensual</SelectItem>
                </SelectContent>
              </Select>

              {newExpense.type === "GASTOMENSUAL" && (
                <>
                  <Label>Recurrencia</Label>
                  <Select value={newExpense.recurrence} onValueChange={(value) => setNewExpense({ ...newExpense, recurrence: value as "DIARIO" | "SEMANAL" | "MENSUAL" | "ANUAL" })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DIARIO">Diario</SelectItem>
                      <SelectItem value="SEMANAL">Semanal</SelectItem>
                      <SelectItem value="MENSUAL">Mensual</SelectItem>
                      <SelectItem value="ANUAL">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
            <Button onClick={handleCreateExpense}>Guardar</Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>No se pudieron cargar los gastos.</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Recurrencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead>Actualizado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((item: ExpenseItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>${item.monto.toFixed(2)}</TableCell>
                  <TableCell>{item.type === "GASTOUNICO" ? "Único" : "Mensual"}</TableCell>
                  <TableCell>{item.recurrence ? item.recurrence : "-"}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(item.fecha))}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(item.createdAt))}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(item.updatedAt))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

// "use client";

// import { useState } from "react";
// import useSWR from "swr";
// import axios from "axios";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface ExpenseItem {
//   id: number;
//   nombre: string;
//   monto: number;
//   fecha: string;
//   type: string;
//   recurrence: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// export function TablaExpensas() {
//   const { data: expenses, error, isLoading, mutate } = useSWR("/api/expensas", fetcher);
//   const [newExpense, setNewExpense] = useState({ nombre: "", monto: "", fecha: "", type: "", recurrence: "" });
//   const [isOpen, setIsOpen] = useState(false);

//   const handleCreateExpense = async () => {
//     try {
//       await axios.post("/api/expensas", newExpense);
//       mutate(); // Actualizar la lista de expensas
//       setIsOpen(false); // Cerrar modal
//     } catch (err) {
//       console.error("Error al crear la expensa", err);
//     }
//   };

//   return (
//     <Card className="col-span-full lg:col-span-3">
//       <CardHeader className="flex justify-between items-center">
//         <CardTitle>Resumen de Gastos</CardTitle>
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//           <DialogTrigger asChild>
//             <Button>Agregar Gasto</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogTitle>Nuevo Gasto</DialogTitle>
//             <DialogDescription>Completa los detalles de la nueva expensa</DialogDescription>
//             <div className="grid gap-2">
//               <Label>Nombre</Label>
//               <Input value={newExpense.nombre} onChange={(e) => setNewExpense({ ...newExpense, nombre: e.target.value })} />
//               <Label>Monto</Label>
//               <Input type="number" value={newExpense.monto} onChange={(e) => setNewExpense({ ...newExpense, monto: e.target.value })} />
//               <Label>Fecha</Label>
//               <Input type="date" value={newExpense.fecha} onChange={(e) => setNewExpense({ ...newExpense, fecha: e.target.value })} />
//               <Label>Tipo</Label>
//               <Input value={newExpense.type} onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })} />
//               <Label>Recurrencia</Label>
//               <Input value={newExpense.recurrence} onChange={(e) => setNewExpense({ ...newExpense, recurrence: e.target.value })} />
//             </div>
//             <Button onClick={handleCreateExpense}>Guardar</Button>
//           </DialogContent>
//         </Dialog>
//       </CardHeader>
//       <CardContent>
//         {error ? (
//           <Alert variant="destructive">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>No se pudieron cargar los gastos.</AlertDescription>
//           </Alert>
//         ) : isLoading ? (
//           <Skeleton className="h-40 w-full" />
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Nombre</TableHead>
//                 <TableHead>Monto</TableHead>
//                 <TableHead>Tipo</TableHead>
//                 <TableHead>Recurrencia</TableHead>
//                 <TableHead>Fecha</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {expenses.map((item: ExpenseItem) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{item.nombre}</TableCell>
//                   <TableCell>${item.monto.toFixed(2)}</TableCell>
//                   <TableCell>{item.type}</TableCell>
//                   <TableCell>{item.recurrence}</TableCell>
//                   <TableCell>
//                     {new Intl.DateTimeFormat("es-ES", {
//                       year: "numeric",
//                       month: "2-digit",
//                       day: "2-digit",
//                     }).format(new Date(item.fecha))}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
// import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
// import useSWR from 'swr';
// import axios from 'axios';

// interface ExpenseItem {
//   id: number;
//   nombre: string;  // Cambiado a 'nombre'
//   monto: number;   // Cambiado a 'monto'
//   fecha: string;   // Cambiado a 'fecha'
//   type: string;
//   recurrence: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// export function TablaExpensas() {
//   const { data: expenseData, error: expenseError } = useSWR('/api/expensas/', fetcher);
//   console.log(expenseData);

//   if (expenseError) return <div>Error al cargar los datos</div>;
//   if (!expenseData) return <div>Cargando...</div>;

//   return (
//     <Card className="col-span-full lg:col-span-3">
//       <CardHeader>
//         <CardTitle>Resumen de Gastos</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Nombre</TableHead>
//               <TableHead>Monto</TableHead>
//               <TableHead>Tipo</TableHead>
//               <TableHead>Recurrencia</TableHead>
//               <TableHead>Fecha</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {expenseData.map((item: ExpenseItem) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.nombre}</TableCell>  
//                 <TableCell>{item.monto.toFixed(2)}</TableCell> 
//                 <TableCell>{item.type}</TableCell>
//                 <TableCell>{item.recurrence}</TableCell>
//                 <TableCell>{new Date(item.fecha).toISOString().replace('T', ' ').substring(0, 16)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }


// import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
// import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";

// import useSWR from 'swr';

// interface ExpenseItem {
//   id: number;
//   name: string;
//   amount: number;
//   date: string;
//   type: string;
//   recurrence: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export function TablaExpensas() {
//   const { data: expenseData, error: expenseError } = useSWR('/api/expensas', fetcher);

//   if (expenseError) return <div>Error al cargar los datos</div>;
//   if (!expenseData) return <div>Cargando...</div>;

//   return (
//     <Card className="col-span-full lg:col-span-3">
//       <CardHeader>
//         <CardTitle>Resumen de Gastos</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Nombre</TableHead>
//               <TableHead>Monto</TableHead>
//               <TableHead>Tipo</TableHead>
//               <TableHead>Recurrencia</TableHead>
//               <TableHead>Fecha</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {expenseData.map((item: ExpenseItem) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.amount.toFixed(2)}</TableCell>
//                 <TableCell>{item.type}</TableCell>
//                 <TableCell>{item.recurrence}</TableCell>
//                 <TableCell>{new Date(item.date).toISOString().replace('T', ' ').substring(0, 16)}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }
