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


// // import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
// // import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";

// // import useSWR from 'swr';

// // interface ExpenseItem {
// //   id: number;
// //   name: string;
// //   amount: number;
// //   date: string;
// //   type: string;
// //   recurrence: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // const fetcher = (url: string) => fetch(url).then((res) => res.json());

// // export function TablaExpensas() {
// //   const { data: expenseData, error: expenseError } = useSWR('/api/expensas', fetcher);

// //   if (expenseError) return <div>Error al cargar los datos</div>;
// //   if (!expenseData) return <div>Cargando...</div>;

// //   return (
// //     <Card className="col-span-full lg:col-span-3">
// //       <CardHeader>
// //         <CardTitle>Resumen de Gastos</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <Table>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead>Nombre</TableHead>
// //               <TableHead>Monto</TableHead>
// //               <TableHead>Tipo</TableHead>
// //               <TableHead>Recurrencia</TableHead>
// //               <TableHead>Fecha</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {expenseData.map((item: ExpenseItem) => (
// //               <TableRow key={item.id}>
// //                 <TableCell>{item.name}</TableCell>
// //                 <TableCell>{item.amount.toFixed(2)}</TableCell>
// //                 <TableCell>{item.type}</TableCell>
// //                 <TableCell>{item.recurrence}</TableCell>
// //                 <TableCell>{new Date(item.date).toISOString().replace('T', ' ').substring(0, 16)}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </CardContent>
// //     </Card>
// //   );
// // }
