import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Asegúrate de que estos componentes existen
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

export function AgregarStock() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    type: "PRODUCIDO",
    comment: "",
  });

  const stockTypes = [
    "PRODUCIDO",
    ,
    //  "VENDIDO"
    "DEFECTUOSO",
    "AJUSTE",
  ];

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const productsData = await response.json();

        // Asegurar que el id sea string
        const formattedProducts = productsData.map(
          (product: { id: number; name: string }) => ({
            id: String(product.id),
            name: product.name,
          })
        );

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stockData = {
      productId: parseInt(formData.productId, 10),
      quantity: parseInt(formData.quantity, 10),
      type: formData.type,
      comment: formData.comment,
    };

    try {
      const response = await fetch("/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      alert("Stock actualizado con éxito");
      setIsOpen(false);
      setFormData({
        productId: "",
        quantity: "",
        type: "PRODUCIDO",
        comment: "",
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Error al actualizar el stock");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger asChild>
          <Button>Añadir Stock</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] w-full max-h-[95dvh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Añadir Stock</DialogTitle>
          </DialogHeader>

          {/* Contenedor scrollable */}
          <div className="flex-1 overflow-y-auto px-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4">
                {/* Selección de Producto */}
                <div className="grid gap-2">
                  <Label htmlFor="product">Producto</Label>
                  <Select
                    value={formData.productId}
                    onValueChange={
                      (value) =>
                        setFormData({ ...formData, productId: String(value) }) // Convertimos a string
                    }
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cantidad */}
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Cantidad De Porciones Producidas</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    placeholder="Ingresa la cantidad"
                    className="text-[16px]" // Previene zoom en iOS
                  />
                </div>

                {/* Tipo de Movimiento */}
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de Movimiento</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {stockTypes.map((type) => (
                        <SelectItem key={type} value={type || ""}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Comentario */}
                <div className="grid gap-2">
                  <Label htmlFor="comment">Comentario</Label>
                  <Input
                    id="comment"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    placeholder="Agrega un comentario "
                    className="text-[16px]"
                  />
                </div>

              </div>

              {/* Botones Fijos */}
              <p>*Al añadir esperar confirmacion*</p>

              <div className="sticky bottom-0 bg-background border-t pt-4 -mx-1 px-2">
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="min-w-[100px]"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="min-w-[100px]">
                    Añadir Stock
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {/* <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger asChild>
          <Button>Añadir Stock</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle>Añadir Stock</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product">Producto</Label>
                <Select
                  value={formData.productId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, productId: value })
                  }
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  placeholder="Ingresa la cantidad"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Movimiento</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockTypes.map((type) => (
                      <SelectItem key={type} value={type || ""}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Comentario</Label>
                <Input
                  id="comment"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  placeholder="Agrega un comentario"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Añadir Stock</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
