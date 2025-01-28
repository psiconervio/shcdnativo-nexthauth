// "use client";
// import React from "react";
// import { CalendarIcon, DownloadIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Grafico } from "@/components/grafico";
// import { ItemsDashboard } from "@/components/items-dashboard";
// import { RecentSales } from "@/components/ventas-recientes";
// import { RecentSaleslegacy } from "@/components/ventas-recientes-legacy";
// import { Resumenstock } from "@/components/resumen-stock";
// import { Produccionstock } from "@/components/produccion-stock";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen ">
//       <main className="container mx-auto p-4 sm:p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
//           <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" className="flex items-center">
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               <span className="hidden sm:inline">Jan 20, 2023 - Feb 09, 2023</span>
//             </Button>
//             <Button>
//               <DownloadIcon className="mr-2 h-4 w-4" />
//               <span className="hidden sm:inline">Download</span>
//             </Button>
//           </div>
//         </div>
//         {/* Items Dashboard */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <ItemsDashboard />
//         </div>
//         {/* Gráficos y Resumen de Stock */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mt-8">
//           {/* Gráficos ocupan más espacio en pantallas grandes */}
//           <div className="lg:col-span-5">
//             <Grafico />
//           </div>
//           <div className="lg:col-span-2">
//             <Resumenstock />
//           </div>
//         </div>
//         {/* Ventas y Producción */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mt-8">
//           <div className="lg:col-span-3">
//             <RecentSaleslegacy />
//           </div>
//           <div className="lg:col-span-2">
//             <Produccionstock />
//           </div>
//           <div className="lg:col-span-2">
//             <RecentSales />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import React from "react";
import useSWR from 'swr';
import {
  CalendarIcon,
  DownloadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentSales } from "@/components/ventas-recientes";
import { Resumenstock } from "@/components/resumen-stock";
import { Grafico } from "@/components/grafico";
import { RecentSaleslegacy } from "@/components/ventas-recientes-legacy";
import { Produccionstock } from "@/components/produccion-stock";
import { ItemsDashboard } from "@/components/items-dashboard";
import { AgregarStock } from "@/components/boton-agregar-stock";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  // const { data: stockDataa, error: stockError } = useSWR('/api/stock', fetcher);
  // const { data: stockall, error: stockErrorall } = useSWR('/api/all', fetcher);
  // const { data: salesData, error: salesError } = useSWR('/api/sales', fetcher);
  // const { data: defectiveData, error: defectiveError } = useSWR('/api/defective-products', fetcher);
  // console.log(stockall)

  // if (stockError || salesError || defectiveError) return <div>Error al cargar los datos</div>;
  // if (!stockData || !salesData || !defectiveData) return <div>Cargando...</div>;
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-2 sm:p-6">
        {/* modificando aqui el dashboard */}
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">
                  Jan 20, 2023 - Feb 09, 2023
                </span>
              </Button>
              <AgregarStock />
              {/* <Button>
                <DownloadIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ItemsDashboard />
          </div>

          <div className=" xl:gap-6 sm:grid md:grid-cols-2 lg:grid-cols-7 mb-8">
            <Grafico />
            <Resumenstock />
          </div>
          <div className="xl:gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
          <RecentSaleslegacy />
            <Produccionstock/>
            <RecentSales />
          </div>
        </div>
      </main>
    </div>
  );
}
