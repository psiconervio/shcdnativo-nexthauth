import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"; // Reemplaza con tu configuración de Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const productId = parseInt(id as string, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "ID de producto inválido." });
    }

    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { ingredients: true },
      });

      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado." });
      }

      // Lógica para calcular el costo
      const cost = product.ingredients.reduce((total, ingredient) => {
        return total + ingredient.quantity * ingredient.ingredient.price;
      }, 0);

      res.status(200).json({ cost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al calcular el costo." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
