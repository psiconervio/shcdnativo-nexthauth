import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
import useSWR from 'swr';

interface StockItem {
  id: string;
  product: {
    name: string;
  };
  stock: number;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Resumenstock(){
    const { data: stockData, error: stockError } = useSWR('/api/stock', fetcher);

    if (stockError) return <div>Error al cargar los datos</div>;
    if (!stockData) return <div>Cargando...</div>;

    return(
        <Card className="col-span-full lg:col-span-3">
        <CardHeader>
          <CardTitle>Resumen de Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Disponible</TableHead>
                <TableHead>Defectuosos</TableHead>
                <TableHead>Fecha Produccion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((item: StockItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
}