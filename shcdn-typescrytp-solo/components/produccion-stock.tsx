import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "./ui/table";
import useSWR from 'swr';

interface StockItem {
  date: string | number | Date;
  id: string;
  product: {
    name: string;
  };
  stock: number;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function Produccionstock(){
    const { data: produccion, error: stockError } = useSWR('/api/stock/all', fetcher);
  console.log(produccion)
    if (stockError) return <div>Error al cargar los datos</div>;
    if (!produccion) return <div>Cargando...</div>;
    const formattedDate = new Date(item.createdAt).toISOString().replace('T', ' ').substring(0, 16);

    return(
        <Card className="col-span-full lg:col-span-3">
        <CardHeader>
          <CardTitle>Historial de produccion Stock</CardTitle>
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
            {produccion.stock.map((item: StockItem) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{/* Aquí puedes agregar la lógica para mostrar los defectuosos */}</TableCell>
                <TableCell>{new Date(item.createdAt).toISOString().replace('T', ' ').substring(0, 16)}</TableCell>              </TableRow>
            ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
}