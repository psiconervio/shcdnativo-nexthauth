import { useState } from "react";

export default function ClienteModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Cliente registrado con éxito");
        setFormData({ name: "", email: "", phone: "" });
        setOpen(false);
      } else {
        alert("Error al registrar el cliente.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al registrar el cliente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Nuevo Cliente
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">Registrar Nuevo Cliente</h2>
            <p className="text-gray-600 mb-4">Ingrese los detalles del cliente.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium">Nombre</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block font-medium">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Registrar Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//v0
// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function NewClientModal() {
//   const [open, setOpen] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   })

//   useEffect(() => {
//     const handleResize = () => {
//       if (open) {
//         window.scrollTo(0, 0)
//       }
//     }

//     window.addEventListener("resize", handleResize)

//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [open])

//   // Maneja cambios en los campos del formulario
//   const handleChange = (e) => {
//     const { id, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }))
//   }

//   // Envía los datos a la API
//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("/api/clients", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         alert("Cliente registrado con éxito")
//         setFormData({ name: "", email: "", phone: "" }) // Limpia el formulario
//         setOpen(false) // Cierra el modal
//       } else {
//         alert("Error al registrar el cliente.")
//       }
//     } catch (error) {
//       console.error("Error al enviar los datos:", error)
//       alert("Ocurrió un error al registrar el cliente.")
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Nuevo Cliente</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[80vh]">
//         <DialogHeader>
//           <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
//           <DialogDescription>Ingrese los detalles del cliente.</DialogDescription>
//         </DialogHeader>
//         <div className="flex flex-col gap-4 py-4">
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="name">Nombre</Label>
//             <Input id="name" value={formData.name} onChange={handleChange} />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" value={formData.email} onChange={handleChange} />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label htmlFor="phone">Teléfono</Label>
//             <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" onClick={handleSubmit}>
//             Registrar Cliente
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default NewClientModal




// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function NewClientModal() {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   // Maneja cambios en los campos del formulario
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   // Envía los datos a la API
//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("/api/clients", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Cliente registrado con éxito");
//         setFormData({ name: "", email: "", phone: "" }); // Limpia el formulario
//         setOpen(false); // Cierra el modal
//       } else {
//         alert("Error al registrar el cliente.");
//       }
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//       alert("Ocurrió un error al registrar el cliente.");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Nuevo Cliente</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
//           <DialogDescription>Ingrese los detalles del cliente.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Nombre
//             </Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="email" className="text-right">
//               Email
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="phone" className="text-right">
//               Teléfono
//             </Label>
//             <Input
//               id="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" onClick={handleSubmit}>
//             Registrar Cliente
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default NewClientModal;
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function NewSaleModal() {
//   const [open, setOpen] = useState(false)

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Nueva Venta</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Registrar Nueva Venta</DialogTitle>
//           <DialogDescription>Ingrese los detalles de la nueva venta.</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="product" className="text-right">
//               Producto
//             </Label>
//             <Input id="product" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="quantity" className="text-right">
//               Cantidad
//             </Label>
//             <Input id="quantity" type="number" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="price" className="text-right">
//               Precio
//             </Label>
//             <Input id="price" type="number" className="col-span-3" />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit" onClick={() => setOpen(false)}>
//             Registrar Venta
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

