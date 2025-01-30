"use client";
import { useState, useEffect } from "react";
import React from "react";
import NewClientModal from "@/components/boton-create-cliente";
import { RecentSales } from "@/components/ventas-recientes";
import { ResumenStock } from "@/components/resumen-stock";
import { ItemsDashboard } from "@/components/items-dashboard";
import { Botonesventa } from "@/components/botones-venta";


export default function Ventas() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    unitPrice: "",
  });
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-4 sm:p-6">
        {/* modificando aqui el dashboard */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold">Ventaas</h1>
            <div className="flex items-center space-x-4">
              <Botonesventa />
              {/* <ClienteModal /> */}
              <NewClientModal />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ItemsDashboard />
          </div>
          <div className="sm:grid gap-6 md:grid-cols-2  sm:grid-cols-2  lg:grid-cols-7 mb-8">
          <ResumenStock />
            <RecentSales />
          </div>
        </div>
      </main>
    </div>
  );
}
