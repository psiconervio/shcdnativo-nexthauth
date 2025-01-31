// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
// import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

import useStock from "@/hooks/useStock";

interface StockItem {
  id: string;
  product: {
    name: string;
  };
  stock: number;
  createdAt: string;
  //PONER EL ACTUALIZADO
}
//resumen de la tabla stock disponible
export function ResumenStock() {
  
  const { dataStock, dataStockloading, stockerror } = useStock();

  if (stockerror) return <div>Error al cargar los datos</div>;
  if (dataStockloading) return <div>Cargando...</div>;

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Resumen de Porciones Disponible</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Disponible</TableHead>
              {/* <TableHead>Defectuosos</TableHead> */}
              <TableHead>Fecha Producción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataStock && dataStock.length > 0 ? (
              dataStock.map((item: StockItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  {/* <TableCell className="font-medium">{item.id}</TableCell> */}
                  <TableCell>
                    {new Date(item.createdAt).toISOString().replace('T', ' ').substring(0, 16)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}



// import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
// import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
// import useSWR from 'swr';
// import useStock from "@/hooks/useStock";

// interface StockItem {
//   id: string;
//   product: {
//     name: string;
//   };
//   stock: number;
//   createdAt: string;
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export function Resumenstock(){
//     const { data: stockData, error: stockError } = useSWR('/api/stock', fetcher);
//       const { dataStock, dataStockloading, stockerror } = useStock();


//     if (stockError) return <div>Error al cargar los datos</div>;
//     if (!stockData) return <div>Cargando...</div>;

//     return(
//         <Card className="col-span-full lg:col-span-3">
//         <CardHeader>
//           <CardTitle>Resumen de Stock</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Producto</TableHead>
//                 <TableHead>Disponible</TableHead>
//                 <TableHead>Defectuosos</TableHead>
//                 <TableHead>Fecha Produccion</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {stockData.map((item: StockItem) => (

//                 <TableRow key={item.id}>
//                   <TableCell>{item.product.name}</TableCell>
//                   <TableCell>{item.stock}</TableCell>
//                   <TableCell className="font-medium">{item.id}</TableCell>
//                   <TableCell>{new Date(item.createdAt).toISOString().replace('T', ' ').substring(0, 16)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     );
// }