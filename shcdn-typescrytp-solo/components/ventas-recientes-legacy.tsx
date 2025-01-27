import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import useSWR from 'swr';



const fetcher = (url: string) => fetch(url).then((res) => res.json());
const recentSales = [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
    },
    { id: 2, name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
    {
      id: 3,
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
    },
    { id: 4, name: "William Kim", email: "will@email.com", amount: "+$99.00" },
    { id: 5, name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
  ];
  export function RecentSaleslegacy() {
    const { data: ventas, error: stockError } = useSWR('/api/sales', fetcher);
    console.log(ventas)
    if (stockError) return <div>Error al cargar los datos</div>;
    if (!ventas) return <div>Cargando...</div>;

    return (
        <Card className="col-span-full lg:col-span-4">
        <CardHeader>
          <CardTitle>Ventas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="flex items-center">
                    <Avatar>
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                      <AvatarImage
                        src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`}
                        alt={item.name}
                      />
                    </Avatar>
                    <span className="ml-2">{item.name}</span>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
}