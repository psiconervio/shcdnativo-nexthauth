"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
}

interface Client {
  id: string
  name: string
  phone: string
}

interface SaleFormData {
  clientId: string
  paymentMethod: string
  products: { productId: string; quantity: string }[]
}

export function BotonesVenta() {
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState<SaleFormData>({
    clientId: "",
    paymentMethod: "EFECTIVO",
    products: [{ productId: "", quantity: "1" }],
  })

  const paymentMethods = ["EFECTIVO", "TRANSFERENCIA", "POSNET", "POSNET_CUOTAS"]

  // Fetch de productos y clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, clientResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/clients"),
        ])

        if (!productResponse.ok || !clientResponse.ok) throw new Error("Error en la carga de datos")

        const productsData = await productResponse.json()
        const clientsData = await clientResponse.json()

        setProducts(productsData)
        setClients(clientsData)
        setFilteredClients(clientsData) // Inicialmente, la lista filtrada es igual a todos los clientes
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  // Manejo de búsqueda con debounce (300ms)
  const handleClientSearch = useCallback((search: string) => {
    setSearchTerm(search)
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const searchLower = searchTerm.toLowerCase()
      setFilteredClients(clients.filter((client) => client.name.toLowerCase().includes(searchLower)))
    }, 300)

    return () => clearTimeout(timeoutId) // Limpia el timeout si el usuario sigue escribiendo
  }, [searchTerm, clients])

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: "1" }],
    }))
  }

  const handleRemoveProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const saleData = {
      clientId: parseInt(formData.clientId, 10),
      paymentMethod: formData.paymentMethod,
      products: formData.products.map((product) => ({
        productId: parseInt(product.productId, 10),
        quantity: parseInt(product.quantity, 10),
      })),
    }

    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      })

      if (!response.ok) throw new Error("Failed to create sale")

      alert("Venta creada con éxito")
      setIsOpen(false)
      setFormData({ clientId: "", paymentMethod: "EFECTIVO", products: [{ productId: "", quantity: "1" }] })
    } catch (error) {
      console.error("Error creating sale:", error)
      alert("Error al crear la venta")
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogTrigger asChild>
          <Button>Nueva Venta</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle>Nueva Venta</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              {/* Búsqueda y Selección de Cliente */}
              <div className="grid gap-2">
                <Label htmlFor="clientSearch">Cliente</Label>
                <p>Escribir nombre cliente y buscarlo en la seleccion</p>
                <Input
                  id="clientSearch"
                  placeholder="Buscar cliente por nombre..."
                  value={searchTerm}
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

              {/* Selección de Productos */}
              <div className="grid gap-4">
                <Label>Añadir productos y cantidad al la venta</Label>
                {formData.products.map((product, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Select
                      value={product.productId}
                      onValueChange={(value) => {
                        const updatedProducts = [...formData.products]
                        updatedProducts[index].productId = value
                        setFormData({ ...formData, products: updatedProducts })
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
                        const updatedProducts = [...formData.products]
                        updatedProducts[index].quantity = e.target.value
                        setFormData({ ...formData, products: updatedProducts })
                      }}
                      className="w-20"
                    />

                    <Button type="button" variant="outline" onClick={() => handleRemoveProduct(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={handleAddProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Producto
                </Button>
              </div>

              {/* Método de Pago */}
              <div className="grid gap-2">
                <Label>Método de Pago</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un método" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear Venta</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Plus, Trash2 } from "lucide-react"

// export function BotonesVenta() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [products, setProducts] = useState<{ id: string; name: string }[]>([])
//   const [clients, setClients] = useState<{ id: string; name: string; phone: string }[]>([])
//   const [filteredClients, setFilteredClients] = useState(clients)

//   const [formData, setFormData] = useState({
//     clientId: "",
//     paymentMethod: "EFECTIVO",
//     products: [{ productId: "", quantity: "1" }],
//   })

//   const paymentMethods = ["EFECTIVO", "TRANSFERENCIA", "POSNET", "POSNET_CUOTAS"]

//   // Cargar productos y clientes desde la API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productResponse, clientResponse] = await Promise.all([
//           fetch("/api/products"),
//           fetch("/api/clients"),
//         ])

//         const productsData = await productResponse.json()
//         const clientsData = await clientResponse.json()

//         // Asegurar que los IDs sean strings
//         setProducts(productsData.map((p: { id: number; name: string }) => ({ id: String(p.id), name: p.name })))
//         const formattedClients = clientsData.map((c: { id: number; name: string; phone: string }) => ({
//           id: String(c.id),
//           name: c.name,
//           phone: c.phone,
//         }))

//         setClients(formattedClients)
//         setFilteredClients(formattedClients) // Inicializar correctamente
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       }
//     }
//     fetchData()
//   }, [])

//   // Filtrar clientes según la búsqueda
//   const handleClientSearch = (search: string) => {
//     const searchLower = search.toLowerCase()
//     setFilteredClients(clients.filter((client) => client.name.toLowerCase().includes(searchLower)))
//   }

//   // Agregar un nuevo producto al formulario
//   const handleAddProduct = () => {
//     setFormData((prev) => ({
//       ...prev,
//       products: [...prev.products, { productId: "", quantity: "1" }],
//     }))
//   }

//   // Eliminar un producto del formulario
//   const handleRemoveProduct = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       products: prev.products.filter((_, i) => i !== index),
//     }))
//   }

//   // Enviar formulario
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const saleData = {
//       clientId: Number.parseInt(formData.clientId, 10),
//       paymentMethod: formData.paymentMethod,
//       products: formData.products.map((product) => ({
//         productId: Number.parseInt(product.productId, 10),
//         quantity: Number.parseInt(product.quantity, 10),
//       })),
//     }

//     try {
//       const response = await fetch("/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(saleData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create sale")
//       }

//       alert("Venta creada con éxito")
//       setIsOpen(false)
//       setFormData({
//         clientId: "",
//         paymentMethod: "EFECTIVO",
//         products: [{ productId: "", quantity: "1" }],
//       })
//     } catch (error) {
//       console.error("Error creating sale:", error)
//       alert("Error al crear la venta")
//     }
//   }

//   return (
//     <>
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogTrigger asChild>
//           <Button>Nueva Venta</Button>
//         </DialogTrigger>

//         <DialogContent className="sm:max-w-[600px] w-full">
//           <DialogHeader>
//             <DialogTitle>Nueva Venta</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Cliente */}
//             <div className="grid gap-4">
//               <Label htmlFor="clientSearch">Cliente</Label>
//               <Input
//                 id="clientSearch"
//                 placeholder="Buscar cliente por nombre..."
//                 onChange={(e) => handleClientSearch(e.target.value)}
//               />
//               <Select
//                 value={formData.clientId}
//                 onValueChange={(value) => setFormData({ ...formData, clientId: String(value) })}
//               >
//                 <SelectTrigger>
//                   <SelectValue>{clients.find((c) => c.id === formData.clientId)?.name || "Selecciona un cliente"}</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {filteredClients.map((client) => (
//                     <SelectItem key={client.id} value={client.id}>
//                       {client.name} ({client.phone})
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Productos */}
//             <div className="grid gap-4">
//               <Label>Productos</Label>
//               {formData.products.map((product, index) => (
//                 <div key={index} className="flex items-center gap-4">
//                   <Select
//                     value={product.productId}
//                     onValueChange={(value) => {
//                       const updatedProducts = [...formData.products]
//                       updatedProducts[index].productId = value
//                       setFormData({ ...formData, products: updatedProducts })
//                     }}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue>
//                         {products.find((p) => p.id === product.productId)?.name || "Selecciona un producto"}
//                       </SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       {products.map((prod) => (
//                         <SelectItem key={prod.id} value={prod.id}>
//                           {prod.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Input
//                     type="number"
//                     min="1"
//                     value={product.quantity}
//                     onChange={(e) => {
//                       const updatedProducts = [...formData.products]
//                       updatedProducts[index].quantity = e.target.value
//                       setFormData({ ...formData, products: updatedProducts })
//                     }}
//                     className="w-20"
//                   />

//                   <Button type="button" variant="outline" onClick={() => handleRemoveProduct(index)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//               <Button type="button" variant="secondary" onClick={handleAddProduct}>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Agregar Producto
//               </Button>
//             </div>

//             {/* Método de Pago */}
//             <div className="grid gap-2">
//               <Label htmlFor="paymentMethod">Método de Pago</Label>
//               <Select
//                 value={formData.paymentMethod}
//                 onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
//               >
//                 <SelectTrigger id="paymentMethod">
//                   <SelectValue>{formData.paymentMethod}</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {paymentMethods.map((method) => (
//                     <SelectItem key={method} value={method}>
//                       {method}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex justify-end gap-4">
//               <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
//                 Cancelar
//               </Button>
//               <Button type="submit">Crear Venta</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { DownloadIcon, Plus, Trash2 } from "lucide-react"
// export function Botonesventa() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [products, setProducts] = useState<{ id: string; name: string }[]>([])
//   const [clients, setClients] = useState<{ id: string; name: string; phone: string }[]>([])
//   const [filteredClients, setFilteredClients] = useState(clients)

//   const [formData, setFormData] = useState({
//     clientId: "",
//     paymentMethod: "EFECTIVO",
//     products: [{ productId: "", quantity: "1" }],
//   })

//   const paymentMethods = ["EFECTIVO", "TRANSFERENCIA", "POSNET", "POSNET_CUOTAS"]

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productResponse, clientResponse] = await Promise.all([
//           fetch("/api/products"),
//           fetch("/api/clients"),
//         ])
//         const productsData = await productResponse.json()
//         const clientsData = await clientResponse.json()

//         // Convertir IDs a string para evitar problemas en el Select
//         setProducts(productsData.map((prod: { id: number; name: string }) => ({
//           id: String(prod.id),
//           name: prod.name,
//         })))

//         setClients(clientsData.map((client: { id: number; name: string; phone: string }) => ({
//           id: String(client.id),
//           name: client.name,
//           phone: client.phone,
//         })))

//         setFilteredClients(clientsData)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       }
//     }
//     fetchData()
//   }, [])

//   const handleAddProduct = () => {
//     setFormData({
//       ...formData,
//       products: [...formData.products, { productId: "", quantity: "1" }],
//     })
//   }

//   const handleRemoveProduct = (index: number) => {
//     const updatedProducts = [...formData.products]
//     updatedProducts.splice(index, 1)
//     setFormData({ ...formData, products: updatedProducts })
//   }

//   const handleClientSearch = (search: string) => {
//     const searchLower = search.toLowerCase()
//     const filtered = clients.filter((client) => client.name.toLowerCase().includes(searchLower))
//     setFilteredClients(filtered)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const saleData = {
//       clientId: Number(formData.clientId), // Convertir a número antes de enviar
//       paymentMethod: formData.paymentMethod,
//       products: formData.products.map((product) => ({
//         productId: Number(product.productId), // Convertir a número antes de enviar
//         quantity: Number(product.quantity),
//       })),
//     }

//     try {
//       const response = await fetch("/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(saleData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create sale")
//       }

//       alert("Venta creada con éxito")
//       setIsOpen(false)
//       setFormData({
//         clientId: "",
//         paymentMethod: "EFECTIVO",
//         products: [{ productId: "", quantity: "1" }],
//       })
//     } catch (error) {
//       console.error("Error creating sale:", error)
//       alert("Error al crear la venta")
//     }
//   }

//   return (
//     <>
//       <Button>
//         <DownloadIcon className="mr-2 h-4 w-4" />
//         <span className="hidden sm:inline">Download</span>
//       </Button>
//       <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
//         <DialogTrigger asChild>
//           <Button>Nueva Venta</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[600px] w-full">
//           <DialogHeader>
//             <DialogTitle>Nueva Venta</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="clientSearch">Cliente</Label>
//                 <Input
//                   id="clientSearch"
//                   placeholder="Buscar cliente por nombre..."
//                   onChange={(e) => handleClientSearch(e.target.value)}
//                 />
//                 <Select
//                   value={formData.clientId}
//                   onValueChange={(value) => setFormData({ ...formData, clientId: String(value) })} // Guardamos como string
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Selecciona un cliente" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {filteredClients.map((client) => (
//                       <SelectItem key={client.id} value={client.id}>
//                         {client.name} ({client.phone})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="grid gap-4">
//                 <Label>Productos</Label>
//                 {formData.products.map((product, index) => (
//                   <div key={index} className="flex items-center gap-4">
//                     <Select
//                       value={product.productId}
//                       onValueChange={(value) => {
//                         const updatedProducts = [...formData.products]
//                         updatedProducts[index].productId = String(value) // Asegurar que sea string
//                         setFormData({ ...formData, products: updatedProducts })
//                       }}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue>
//                           {products.find((p) => p.id === product.productId)?.name || "Selecciona un producto"}
//                         </SelectValue>
//                       </SelectTrigger>
//                       <SelectContent>
//                         {products.map((prod) => (
//                           <SelectItem key={prod.id} value={prod.id}>
//                             {prod.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Input
//                       type="number"
//                       step="1"
//                       min="1"
//                       value={product.quantity}
//                       onChange={(e) => {
//                         const updatedProducts = [...formData.products]
//                         updatedProducts[index].quantity = e.target.value
//                         setFormData({ ...formData, products: updatedProducts })
//                       }}
//                       className="w-20"
//                     />
//                     <Button type="button" variant="outline" onClick={() => handleRemoveProduct(index)}>
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button type="button" variant="secondary" onClick={handleAddProduct}>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Agregar Producto
//                 </Button>
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="paymentMethod">Método de Pago</Label>
//                 <Select
//                   value={formData.paymentMethod}
//                   onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
//                 >
//                   <SelectTrigger id="paymentMethod">
//                     <SelectValue placeholder="Selecciona un método" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {paymentMethods.map((method) => (
//                       <SelectItem key={method} value={method}>
//                         {method}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="flex justify-end gap-4">
//               <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
//                 Cancelar
//               </Button>
//               <Button type="submit">Crear Venta</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

// export function Botonesventa() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [products, setProducts] = useState<{ id: string; name: string }[]>([])
//   const [clients, setClients] = useState<{ id: string; name: string; phone: string }[]>([])
//   const [filteredClients, setFilteredClients] = useState(clients)

//   const [formData, setFormData] = useState({
//     clientId: "",
//     paymentMethod: "EFECTIVO",
//     products: [{ productId: "", quantity: "1" }],
//   })

//   const paymentMethods = ["EFECTIVO", "TRANSFERENCIA", "POSNET", "POSNET_CUOTAS"]

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productResponse, clientResponse] = await Promise.all([fetch("/api/products"), fetch("/api/clients")])
//         const productsData = await productResponse.json()
//         const clientsData = await clientResponse.json()
//         setProducts(productsData)
//         setClients(clientsData)
//         setFilteredClients(clientsData)
//       } catch (error) {
//         console.error("Error fetching data:", error)
//       }
//     }
//     fetchData()
//   }, [])

//   const handleAddProduct = () => {
//     setFormData({
//       ...formData,
//       products: [...formData.products, { productId: "", quantity: "1" }],
//     })
//   }

//   const handleRemoveProduct = (index: number) => {
//     const updatedProducts = [...formData.products]
//     updatedProducts.splice(index, 1)
//     setFormData({ ...formData, products: updatedProducts })
//   }

//   const handleClientSearch = (search: string) => {
//     const searchLower = search.toLowerCase()
//     const filtered = clients.filter((client) => client.name.toLowerCase().includes(searchLower))
//     setFilteredClients(filtered)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const saleData = {
//       clientId: Number.parseInt(formData.clientId, 10),
//       paymentMethod: formData.paymentMethod,
//       products: formData.products.map((product) => ({
//         productId: Number.parseInt(product.productId, 10),
//         quantity: Number.parseInt(product.quantity, 10),
//       })),
//     }

//     try {
//       const response = await fetch("/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(saleData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to create sale")
//       }

//       alert("Venta creada con éxito")
//       setIsOpen(false)
//       setFormData({
//         clientId: "",
//         paymentMethod: "EFECTIVO",
//         products: [{ productId: "", quantity: "1" }],
//       })
//     } catch (error) {
//       console.error("Error creating sale:", error)
//       alert("Error al crear la venta")
//     }
//   }

//   return (
//     <>
//       <Button>
//         <DownloadIcon className="mr-2 h-4 w-4" />
//         <span className="hidden sm:inline">Download</span>
//       </Button>
//       <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
//         <DialogTrigger asChild>
//           <Button>Nueva Venta</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[600px] w-full">
//           <DialogHeader>
//             <DialogTitle>Nueva Venta</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="clientSearch">Cliente</Label>
//                 <Input
//                   id="clientSearch"
//                   placeholder="Buscar cliente por nombre..."
//                   onChange={(e) => handleClientSearch(e.target.value)}
//                 />
//                 <Select
//                   value={formData.clientId}
//                   onValueChange={(value) => setFormData({ ...formData, clientId: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Selecciona un cliente" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {filteredClients.map((client) => (
//                       <SelectItem key={client.id} value={client.id}>
//                         {client.name} ({client.phone})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="grid gap-4">
//                 <Label>Productos</Label>
//                 {formData.products.map((product, index) => (
//                   <div key={index} className="flex items-center gap-4">
//                     <Select
//                       value={product.productId}
//                       onValueChange={(value) => {
//                         const updatedProducts = [...formData.products]
//                         updatedProducts[index].productId = value
//                         setFormData({ ...formData, products: updatedProducts })
//                       }}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue>
//                           {products.find((p) => p.id === product.productId)?.name || "Selecciona un producto"}
//                         </SelectValue>
//                       </SelectTrigger>
//                       <SelectContent>
//                         {products.map((prod) => (
//                           <SelectItem key={prod.id} value={prod.id}>
//                             {prod.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Input
//                       type="number"
//                       step="1"
//                       min="1"
//                       value={product.quantity}
//                       onChange={(e) => {
//                         const updatedProducts = [...formData.products]
//                         updatedProducts[index].quantity = e.target.value
//                         setFormData({ ...formData, products: updatedProducts })
//                       }}
//                       className="w-20"
//                     />
//                     <Button type="button" variant="outline" onClick={() => handleRemoveProduct(index)}>
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button type="button" variant="secondary" onClick={handleAddProduct}>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Agregar Producto
//                 </Button>
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="paymentMethod">Método de Pago</Label>
//                 <Select
//                   value={formData.paymentMethod}
//                   onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
//                 >
//                   <SelectTrigger id="paymentMethod">
//                     <SelectValue placeholder="Selecciona un método" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {paymentMethods.map((method) => (
//                       <SelectItem key={method} value={method}>
//                         {method}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="flex justify-end gap-4">
//               <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
//                 Cancelar
//               </Button>
//               <Button type="submit">Crear Venta</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }


// import { DownloadIcon, Plus, Trash2 } from "lucide-react";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { useEffect, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// export function Botonesventa() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
//   const [clients, setClients] = useState<
//     { id: string; name: string; phone: string }[]
//   >([]);
//   const [filteredClients, setFilteredClients] = useState(clients); // Clientes filtrados por búsqueda

//   const [formData, setFormData] = useState({
//     clientId: "",
//     paymentMethod: "EFECTIVO",
//     products: [{ productId: "", quantity: "1" }], // Lista de productos
//   });

//   const paymentMethods = [
//     "EFECTIVO",
//     "TRANSFERENCIA",
//     "POSNET",
//     "POSNET_CUOTAS",
//   ];

//   // Fetch products and clients from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productResponse, clientResponse] = await Promise.all([
//           fetch("/api/products"),
//           fetch("/api/clients"),
//         ]);
//         const productsData = await productResponse.json();
//         const clientsData = await clientResponse.json();
//         setProducts(productsData);
//         setClients(clientsData);
//         setFilteredClients(clientsData); // Inicialmente mostrar todos los clientes
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddProduct = () => {
//     setFormData({
//       ...formData,
//       products: [...formData.products, { productId: "", quantity: "1" }],
//     });
//   };

//   const handleRemoveProduct = (index: number) => {
//     const updatedProducts = [...formData.products];
//     updatedProducts.splice(index, 1);
//     setFormData({ ...formData, products: updatedProducts });
//   };

//   const handleClientSearch = (search: string) => {
//     const searchLower = search.toLowerCase();
//     const filtered = clients.filter((client) =>
//       client.name.toLowerCase().includes(searchLower)
//     );
//     setFilteredClients(filtered);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const saleData = {
//       clientId: parseInt(formData.clientId, 10), // Convertir a Int
//       paymentMethod: formData.paymentMethod,
//       products: formData.products.map((product) => ({
//         productId: parseInt(product.productId, 10), // Convertir a Int
//         quantity: parseInt(product.quantity, 10),
//       })),
//     };
//     // const saleData = {
//     //   clientId: formData.clientId,
//     //   paymentMethod: formData.paymentMethod,
//     //   products: formData.products.map((product) => ({
//     //     productId: product.productId,
//     //     quantity: parseInt(product.quantity, 10),
//     //   })),
//     // };

//     try {
//       const response = await fetch("/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(saleData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create sale");
//       }

//       alert("Venta creada con éxito");
//       setIsOpen(false);
//       setFormData({
//         clientId: "",
//         paymentMethod: "EFECTIVO",
//         products: [{ productId: "", quantity: "1" }],
//       });
//     } catch (error) {
//       console.error("Error creating sale:", error);
//       alert("Error al crear la venta");
//     }
//   };

//   return (
//     <>
//       <Button>
//         <DownloadIcon className="mr-2 h-4 w-4" />
//         <span className="hidden sm:inline">Download</span>
//       </Button>
//       <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
//         <DialogTrigger asChild>
//           <Button>Nueva Venta</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[600px] w-full">
//           <DialogHeader>
//             <DialogTitle>Nueva Venta</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid gap-4">
//               {/* Client Search */}
//               <div className="grid gap-2">
//                 <Label htmlFor="clientSearch">Cliente</Label>
//                 <Input
//                   id="clientSearch"
//                   placeholder="Buscar cliente por nombre..."
//                   onChange={(e) => handleClientSearch(e.target.value)}
//                 />
//                 <Select
//                   value={formData.clientId}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, clientId: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Selecciona un cliente" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {filteredClients.map((client) => (
//                       <SelectItem key={client.id} value={client.id}>
//                         {client.name} ({client.phone})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Products Section */}
//               <div className="grid gap-4">
//                 <Label>Productos</Label>
//                 {formData.products.map((product, index) => (
//                   <div key={index} className="flex items-center gap-4">
//                     <Select
//                       value={product.productId} // El valor del producto seleccionado
//                       onValueChange={(value) => {
//                         const updatedProducts = [...formData.products];
//                         updatedProducts[index].productId = value; // Aquí actualizas el ID del producto
//                         setFormData({ ...formData, products: updatedProducts });
//                       }}
//                     >
//                       {/* <Select
//                       value={product.productId}
//                       onValueChange={(value) => {
//                         const updatedProducts = [...formData.products];
//                         updatedProducts[index].productId = value;
//                         setFormData({ ...formData, products: updatedProducts });
//                       }}
//                     > */}
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Selecciona un producto" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {products.map((prod) => (
//                           <SelectItem key={prod.id} value={prod.id}>
//                             {prod.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Input
//                       type="number"
//                       step="1"
//                       min="1"
//                       value={product.quantity}
//                       onChange={(e) => {
//                         const updatedProducts = [...formData.products];
//                         updatedProducts[index].quantity = e.target.value;
//                         setFormData({ ...formData, products: updatedProducts });
//                       }}
//                       className="w-20"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => handleRemoveProduct(index)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={handleAddProduct}
//                 >
//                   <Plus className="mr-2 h-4 w-4" />
//                   Agregar Producto
//                 </Button>
//               </div>

//               {/* Payment Method */}
//               <div className="grid gap-2">
//                 <Label htmlFor="paymentMethod">Método de Pago</Label>
//                 <Select
//                   value={formData.paymentMethod}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, paymentMethod: value })
//                   }
//                 >
//                   <SelectTrigger id="paymentMethod">
//                     <SelectValue placeholder="Selecciona un método" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {paymentMethods.map((method) => (
//                       <SelectItem key={method} value={method}>
//                         {method}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="flex justify-end gap-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Cancelar
//               </Button>
//               <Button type="submit">Crear Venta</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// import { DownloadIcon } from "lucide-react";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { useEffect, useState } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

// export function Botonesventa() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
//   const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
//   const [newClient, setNewClient] = useState({ name: "", email: "" });
//   const [formData, setFormData] = useState({
//     clientId: "",
//     paymentMethod: "EFECTIVO",
//     products: [{ productId: "", quantity: 1 }],
//   });

//   // Fetch products and clients
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsResponse, clientsResponse] = await Promise.all([
//           fetch("/api/products"),
//           fetch("/api/clients"),
//         ]);
//         const productsData = await productsResponse.json();
//         const clientsData = await clientsResponse.json();
//         setProducts(productsData);
//         setClients(clientsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create sale");
//       }

//       alert("Sale created successfully!");
//       setIsOpen(false);
//       setFormData({
//         clientId: "",
//         paymentMethod: "EFECTIVO",
//         products: [{ productId: "", quantity: 1 }],
//       });
//     } catch (error) {
//       console.error("Error creating sale:", error);
//       alert("Error creating sale");
//     }
//   };

//   const handleAddClient = async () => {
//     try {
//       const response = await fetch("/api/clients", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newClient),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add client");
//       }

//       const addedClient = await response.json();
//       setClients((prev) => [...prev, addedClient]);
//       setNewClient({ name: "", email: "" });
//       alert("Client added successfully!");
//     } catch (error) {
//       console.error("Error adding client:", error);
//       alert("Error adding client");
//     }
//   };

//   const addProductField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       products: [...prev.products, { productId: "", quantity: 1 }],
//     }));
//   };

//   return (
//     <>
//       <Button>
//         <DownloadIcon className="mr-2 h-4 w-4" />
//         <span className="hidden sm:inline">Download</span>
//       </Button>
//       <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
//         <DialogTrigger asChild>
//           <Button>Nueva Venta</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] w-full">
//           <DialogHeader>
//             <DialogTitle>Nueva Venta</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Cliente */}
//             <div className="grid gap-2">
//               <Label htmlFor="client">Cliente</Label>
//               <Select
//                 value={formData.clientId}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, clientId: value })
//                 }
//               >
//                 <SelectTrigger id="client">
//                   Selecciona un cliente
//                 </SelectTrigger>
//                 <SelectContent>
//                   {clients.map((client) => (
//                     <SelectItem key={client.id} value={client.id}>
//                       {client.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Agregar cliente */}
//             <div className="grid gap-2">
//               <Label>Nuevo Cliente</Label>
//               <Input
//                 placeholder="Nombre del cliente"
//                 value={newClient.name}
//                 onChange={(e) =>
//                   setNewClient({ ...newClient, name: e.target.value })
//                 }
//               />
//               <Input
//                 placeholder="Email del cliente"
//                 value={newClient.email}
//                 onChange={(e) =>
//                   setNewClient({ ...newClient, email: e.target.value })
//                 }
//               />
//               <Button type="button" onClick={handleAddClient}>
//                 Agregar Cliente
//               </Button>
//             </div>

//             {/* Productos */}
//             {formData.products.map((product, index) => (
//               <div key={index} className="grid gap-2">
//                 <Label htmlFor={`product-${index}`}>Producto</Label>
//                 <Select
//                   value={product.productId}
//                   onValueChange={(value) => {
//                     const updatedProducts = [...formData.products];
//                     updatedProducts[index].productId = value;
//                     setFormData({ ...formData, products: updatedProducts });
//                   }}
//                 >
//                   <SelectTrigger id={`product-${index}`}>
//                     Selecciona un producto
//                   </SelectTrigger>
//                   <SelectContent>
//                     {products.map((prod) => (
//                       <SelectItem key={prod.id} value={prod.id}>
//                         {prod.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Input
//                   type="number"
//                   placeholder="Cantidad"
//                   value={product.quantity.toString()}
//                   onChange={(e) => {
//                     const updatedProducts = [...formData.products];
//                     updatedProducts[index].quantity = parseInt(
//                       e.target.value,
//                       10
//                     );
//                     setFormData({ ...formData, products: updatedProducts });
//                   }}
//                 />
//               </div>
//             ))}
//             <Button type="button" onClick={addProductField}>
//               Agregar Producto
//             </Button>

//             {/* Método de pago */}
//             <div className="grid gap-2">
//               <Label htmlFor="paymentMethod">Método de Pago</Label>
//               <Select
//                 value={formData.paymentMethod}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, paymentMethod: value })
//                 }
//               >
//                 <SelectTrigger id="paymentMethod">
//                   Selecciona método de pago
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="EFECTIVO">Efectivo</SelectItem>
//                   <SelectItem value="TARJETA">Tarjeta</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex justify-end gap-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Cancelar
//               </Button>
//               <Button type="submit">Crear Venta</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// // import { DownloadIcon } from "lucide-react";
// // import { Input } from "./ui/input";
// // import { Label } from "./ui/label";
// // import { Button } from "./ui/button";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// // import { useEffect, useState } from "react";
// // import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

// // export function Botonesventa() {
// //       const [isOpen, setIsOpen] = useState(false);
// //       const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
// //       const [formData, setFormData] = useState({
// //         productId: "",
// //         quantity: "",
// //         unitPrice: "",
// //       });

// //       // Fetch products from the backend
// //       useEffect(() => {
// //         const fetchProducts = async () => {
// //           try {
// //             const response = await fetch("/api/products");
// //             const data = await response.json();
// //             setProducts(data);
// //           } catch (error) {
// //             console.error("Error fetching products:", error);
// //           }
// //         };
// //         fetchProducts();
// //       }, []);

// //       const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //           const response = await fetch("/api/sales", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(formData),
// //           });

// //           if (!response.ok) {
// //             throw new Error("Failed to create sale");
// //           }

// //           alert("Sale created successfully!");
// //           setIsOpen(false);
// //           setFormData({ productId: "", quantity: "", unitPrice: "" });
// //         } catch (error) {
// //           console.error("Error creating sale:", error);
// //           alert("Error creating sale");
// //         }
// //       };

// //       const resetForm = () => {
// //         setFormData({
// //           productId: "",
// //           quantity: "",
// //           unitPrice: "",
// //         });
// //       };
// //   return (
// //     <>
// //       <Button>
// //         <DownloadIcon className="mr-2 h-4 w-4" />
// //         <span className="hidden sm:inline">Download</span>
// //       </Button>
// //       {/* <NewSaleModal /> */}
// //       <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
// //         <DialogTrigger asChild>
// //           <Button

// //           >
// //             Nueva Venta
// //           </Button>
// //         </DialogTrigger>
// //         <DialogContent className="sm:max-w-[425px] w-full">
// //           <DialogHeader>
// //             <DialogTitle>Nueva Venta</DialogTitle>
// //           </DialogHeader>
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="grid gap-4">
// //               {/* Product Select */}
// //               <div className="grid gap-2">
// //                 <Label htmlFor="product">Producto</Label>
// //                 <Select
// //                   value={formData.productId}
// //                   onValueChange={(value) =>
// //                     setFormData({ ...formData, productId: value })
// //                   }
// //                 >
// //                   <SelectTrigger id="product">
// //                     Selecciona un producto
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {products.map((product) => (
// //                       <SelectItem key={product.id} value={product.id}>
// //                         {product.name}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               {/* Quantity Input */}
// //             <div className="grid gap-2">
// //                 <Label htmlFor="quantity">Cantidad</Label>
// //                 <Input
// //                     id="quantity"
// //                     type="number"
// //                     step="1"
// //                     min="1"
// //                     value={formData.quantity}
// //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                         setFormData({
// //                             ...formData,
// //                             quantity: (parseInt(e.target.value, 10) || 1).toString(),
// //                         })
// //                     }
// //                     required
// //                 />
// //             </div>

// //               {/* Unit Price Input */}
// //             <div className="grid gap-2">
// //                 <Label htmlFor="unitPrice">Precio por Unidad</Label>
// //                 <Input
// //                     id="unitPrice"
// //                     type="number"
// //                     step="0.01"
// //                     min="0"
// //                     value={formData.unitPrice}
// //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// //                         setFormData({
// //                             ...formData,
// //                             unitPrice: e.target.value,
// //                         })
// //                     }
// //                     required
// //                 />
// //             </div>
// //             </div>
// //             <div className="flex justify-end gap-4">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 onClick={() => setIsOpen(false)}
// //               >
// //                 Cancelar
// //               </Button>
// //               <Button type="submit">Crear Venta</Button>
// //             </div>
// //           </form>
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }
