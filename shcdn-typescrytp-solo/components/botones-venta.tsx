
import { DownloadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

export function Botonesventa() {
      const [isOpen, setIsOpen] = useState(false);
      const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
      const [formData, setFormData] = useState({
        productId: "",
        quantity: "",
        unitPrice: "",
      });
    
      // Fetch products from the backend
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchProducts();
      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("/api/sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error("Failed to create sale");
          }
    
          alert("Sale created successfully!");
          setIsOpen(false);
          setFormData({ productId: "", quantity: "", unitPrice: "" });
        } catch (error) {
          console.error("Error creating sale:", error);
          alert("Error creating sale");
        }
      };
    
      const resetForm = () => {
        setFormData({
          productId: "",
          quantity: "",
          unitPrice: "",
        });
      };
  return (
    <>
      <Button>
        <DownloadIcon className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Download</span>
      </Button>
      {/* <NewSaleModal /> */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger asChild>
          <Button

          >
            Nueva Venta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-full">
          <DialogHeader>
            <DialogTitle>Nueva Venta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              {/* Product Select */}
              <div className="grid gap-2">
                <Label htmlFor="product">Producto</Label>
                <Select
                  value={formData.productId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, productId: value })
                  }
                >
                  <SelectTrigger id="product">
                    Selecciona un producto
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

              {/* Quantity Input */}
            <div className="grid gap-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                    id="quantity"
                    type="number"
                    step="1"
                    min="1"
                    value={formData.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                            ...formData,
                            quantity: (parseInt(e.target.value, 10) || 1).toString(),
                        })
                    }
                    required
                />
            </div>

              {/* Unit Price Input */}
            <div className="grid gap-2">
                <Label htmlFor="unitPrice">Precio por Unidad</Label>
                <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.unitPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({
                            ...formData,
                            unitPrice: e.target.value,
                        })
                    }
                    required
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
              <Button type="submit">Crear Venta</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
