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
  quantity:number;
  type: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Produccionstock() {
  const { data: produccion, error: stockError } = useSWR('/api/stock/all', fetcher);
  console.log(produccion?.stockLog);
  
  if (stockError) return <div>Error al cargar los datos</div>;
  if (!produccion) return <div>Cargando...</div>;

  // Verifica si produccion.stock es un array
  if (!Array.isArray(produccion.stock)) return <div>Datos inválidos</div>;

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Historial de produccion Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Porciones</TableHead>
              <TableHead>Defectuosos</TableHead>
              <TableHead>Fecha Produccion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produccion.stockLog.map((item: StockItem) => {
              // console.log(produccion.stock);
              const formattedDate = new Date(item.createdAt).toISOString().replace('T', ' ').substring(0, 16);
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{/* Aquí puedes agregar la lógica para mostrar los defectuosos */}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}