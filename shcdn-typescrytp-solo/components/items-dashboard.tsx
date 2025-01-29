import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import useSWR from 'swr';
// import { fetchSales } from "../lib/fetchsales";
import { useSales } from "../hooks/useSales";
import { useRecentSales } from "../hooks/useRecentSales";
import { useTotalLastDaySales } from "@/hooks/useTotalLastDaySales";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ItemsDashboard() {
  const { sales,totalSales, loading, error } = useSales();
  const { recentSales, totalRecentQuantity, loadingRecent, errorRecent } = useRecentSales();
  const { totalLastDaySales, isLoading, fetchError } = useTotalLastDaySales();


    const { data: stockall, error: _stockErrorall } = useSWR('/api/stock/all', fetcher);
    // const { data: ventas, error: _salesErrorall } = useSWR('/api/sales', fetcher);
    
    // Check if data is still loading or if there's an error
    // if (!stockall) return <div>Loading...</div>;
    // if (_stockErrorall) return <div>Error loading data</div>;
    //sacar cantidad
    // const totalQuantity = sales.reduce((sum, sale) => {
    //   return sum + sale.products.reduce((subSum, product) => subSum + product.quantity, 0);
    // }, 0);
    
    // console.log(totalQuantity);
// sacar ventas dia
    // const salesByDay = sales.reduce((acc, sale) => {
    //   // Obtener la fecha en formato YYYY-MM-DD (ignorando la hora)
    //   const date = sale.date.split("T")[0];
    
    //   // Si la fecha no existe en el acumulador, la inicializamos en 0
    //   if (!acc[date]) acc[date] = 0;
    
    //   // Sumar las cantidades de los productos vendidos ese día
    //   acc[date] += sale.products.reduce((sum, product) => sum + product.quantity, 0);
    
    //   return acc;
    // }, {});
    
    // console.log(salesByDay);  

    return (
       <>
        <Card>
        {/* <ul>
        {sales.map(({ date, totalQuantity }) => (
          <li key={date}>
            <strong>📅 {date}</strong> - Cantidad vendida: {totalQuantity}
          </li>
        ))}
      </ul> */}
         {/* <h2>📅 Ventas de los Últimos 7 Días</h2>
      <ul>
        {sales.map(({ date, totalQuantity }) => (
          <li key={date}>
            <strong>{date}</strong> - Cantidad vendida: {totalQuantity}
          </li>
        ))}
      </ul>
      <ul>
        {recentSales.map(({ date, totalQuantity }) => (
          <li key={date}>
            <strong>{date}</strong> - Cantidad vendida: {totalQuantity}
          </li>
        ))}
      </ul> */}
      <h3> </h3>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Porciones Disponibles</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </CardHeader>
            <CardContent>
                {/* <div className="text-2xl font-bold">{stockall.totalStock}</div> */}
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos Defectuosos</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </CardHeader>
            <CardContent>
                {/* <div className="text-2xl font-bold">{stockall.defectiveProductsTotal}</div> */}
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+
                {totalRecentQuantity}
                  </div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Producido hoy</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+573{totalLastDaySales}</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
        </Card>
       </>
    );
}
// Compare this snippet from shcdn-typescrytp-solo/components/ventas-recientes.tsx:
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export function ItemsDashboard() {
//     const { data: stockall, error: _stockErrorall } = useSWR('/api/stock/all', fetcher);
//     // const { data: stockall, error: stockErrorall } = useSWR('/api/stock/log', fetcher);
// console.log(stockall)
//     return (
//        <>
//         <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Porciones Disponibles
//           </CardTitle>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//           </svg>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stockall?.totalStock}</div>
//           <p className="text-xs text-muted-foreground">
//             +20.1% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Productos Defectuosos
//           </CardTitle>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//             <circle cx="9" cy="7" r="4" />
//             <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//           </svg>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">+2350
//             {stockall?.defectiveStock}
//             </div>
//           <p className="text-xs text-muted-foreground">
//             +180.1% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Ventas</CardTitle>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <rect width="20" height="14" x="2" y="5" rx="2" />
//             <path d="M2 10h20" />
//           </svg>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">+12,234</div>
//           <p className="text-xs text-muted-foreground">
//             +19% from last month
//           </p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Active Now
//           </CardTitle>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             className="h-4 w-4 text-muted-foreground"
//           >
//             <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//           </svg>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">+573</div>
//           <p className="text-xs text-muted-foreground">
//             +201 since last hour
//           </p>
//         </CardContent>
//       </Card>
//        </>
//     )
// }