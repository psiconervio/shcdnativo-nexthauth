"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewSaleModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Nueva Venta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Venta</DialogTitle>
          <DialogDescription>Ingrese los detalles de la nueva venta.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Producto
            </Label>
            <Input id="product" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Cantidad
            </Label>
            <Input id="quantity" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input id="price" type="number" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            Registrar Venta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

