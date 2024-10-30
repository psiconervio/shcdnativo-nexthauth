"use client";

import { useState, useEffect } from "react";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", tipo: "", ingredientes: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch de productos al cargar la página
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await fetch("/api/producto");
    const data = await res.json();
    setProductos(data);
  };

  // Crear un nuevo producto
  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch("/api/producto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombre: "", tipo: "", ingredientes: [] });
    fetchProductos();
  };

  // Actualizar un producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/producto/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ nombre: "", tipo: "", ingredientes: [] });
    setIsEditing(false);
    setEditingId(null);
    fetchProductos();
  };

  // Eliminar un producto
  const handleDelete = async (id) => {
    await fetch(`/api/producto/${id}`, {
      method: "DELETE",
    });
    fetchProductos();
  };

  // Preparar el formulario para editar un producto
  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre,
      tipo: producto.tipo,
      ingredientes: producto.ingredientes.map((ing) => ({
        cantidad: ing.cantidad,
        materiaPrimaId: ing.materiaPrimaId,
      })),
    });
    setIsEditing(true);
    setEditingId(producto.id);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      
      <form onSubmit={isEditing ? handleUpdate : handleCreate}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del Producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de Producto"
          value={form.tipo}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
      </form>

      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h2>{producto.nombre}</h2>
            <p>Tipo: {producto.tipo}</p>
            <p>Ingredientes:</p>
            <ul>
              {producto.ingredientes.map((ing) => (
                <li key={ing.id}>
                  Materia Prima ID: {ing.materiaPrimaId} - Cantidad: {ing.cantidad}
                </li>
              ))}
            </ul>
            <button onClick={() => handleEdit(producto)}>Editar</button>
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
