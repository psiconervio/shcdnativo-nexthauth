import { useState, useEffect } from "react";
import { Product, Client, SaleFormData, fetchProductsAndClients, submitSale } from "@/models/sale";

export const useSaleController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState<SaleFormData>({
    clientId: "",
    paymentMethod: "EFECTIVO",
    products: [{ productId: "", quantity: "1" }],
  });

  useEffect(() => {
    const loadData = async () => {
      const { products, clients } = await fetchProductsAndClients();
      setProducts(products);
      setClients(clients);
      setFilteredClients(clients);
    };
    loadData();
  }, []);

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: "1" }],
    }));
  };

  const handleRemoveProduct = (index: number) => {
    setFormData((prev) => {
      const updatedProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: updatedProducts };
    });
  };

  const handleClientSearch = (search: string) => {
    setFilteredClients(
      clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitSale(formData);
    if (result.success) {
      alert("Venta creada con éxito");
      setIsOpen(false);
      setFormData({
        clientId: "",
        paymentMethod: "EFECTIVO",
        products: [{ productId: "", quantity: "1" }],
      });
    } else {
      alert("Error al crear la venta");
    }
  };

  return {
    isOpen,
    setIsOpen,
    products,
    clients,
    filteredClients,
    formData,
    setFormData,
    handleAddProduct,
    handleRemoveProduct,
    handleClientSearch,
    handleSubmit,
  };
};
