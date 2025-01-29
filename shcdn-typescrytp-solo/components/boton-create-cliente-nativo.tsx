import { useState } from "react";

export function ClienteModal() {
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