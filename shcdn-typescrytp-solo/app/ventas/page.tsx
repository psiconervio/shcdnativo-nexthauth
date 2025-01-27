"use client";
import { useState, useEffect } from "react";
import React from "react";
import { NewSaleModal } from "@/components/moda-ventav0";
import { RecentSales } from "@/components/ventas-recientes";
import { Resumenstock } from "@/components/resumen-stock";
import { ItemsDashboard } from "@/components/items-dashboard";
import { Botonesventa } from "@/components/botones-venta";


export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    unitPrice: "",
  });

  // Fetch products from the backend
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/api/products");
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("/api/sales", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create sale");
  //     }

  //     alert("Sale created successfully!");
  //     setIsOpen(false);
  //     setFormData({ productId: "", quantity: "", unitPrice: "" });
  //   } catch (error) {
  //     console.error("Error creating sale:", error);
  //     alert("Error creating sale");
  //   }
  // };


  return (
    <div className="">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* modificando aqui el dashboard */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold">Ventas</h1>
            <div className="flex items-center space-x-4">
              <Botonesventa />
              <NewSaleModal />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ItemsDashboard />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
            <RecentSales />
            <Resumenstock />
          </div>
        </div>
      </main>
    </div>
  );
}
