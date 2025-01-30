import { useSaleController } from "@/controllers/saleController";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function SaleForm() {
  const {
    isOpen,
    setIsOpen,
    products,
    filteredClients,
    formData,
    setFormData,
    handleAddProduct,
    handleRemoveProduct,
    handleClientSearch,
    handleSubmit,
  } = useSaleController();

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Nueva Venta</Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle>Nueva Venta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              {/* Client Search */}
              <div className="grid gap-2">
                <Label>Cliente</Label>
                <Input
                  placeholder="Buscar cliente por nombre..."
                  onChange={(e) => handleClientSearch(e.target.value)}
                />
                <Select
                  value={formData.clientId}
                  onValueChange={(value) => setFormData({ ...formData, clientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} ({client.phone})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Products Section */}
              <div className="grid gap-4">
                <Label>Productos</Label>
                {formData.products.map((product, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Select
                      value={product.productId}
                      onValueChange={(value) => {
                        const updatedProducts = [...formData.products];
                        updatedProducts[index].productId = value;
                        setFormData({ ...formData, products: updatedProducts });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((prod) => (
                          <SelectItem key={prod.id} value={prod.id}>
                            {prod.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => {
                        const updatedProducts = [...formData.products];
                        updatedProducts[index].quantity = e.target.value;
                        setFormData({ ...formData, products: updatedProducts });
                      }}
                      className="w-20"
                    />
                    <Button type="button" variant="outline" onClick={() => handleRemoveProduct(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={handleAddProduct}>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Producto
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button type="submit">Crear Venta</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
