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
    <div className="">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* modificando aqui el dashboard */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">
                  Jan 20, 2023 - Feb 09, 2023
                </span>
              </Button>
              <Button>
                <DownloadIcon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ItemsDashboard />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <Grafico />
            <Resumenstock />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
          <RecentSaleslegacy />
            <Produccionstock/>
            <RecentSales />
          </div>
        </div>
      </main>
    </div>
  );
}
