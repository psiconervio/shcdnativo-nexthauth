/*
  Warnings:

  - You are about to drop the `IngredienteProducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MateriaPrima` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IngredienteProducto" DROP CONSTRAINT "IngredienteProducto_materiaPrimaId_fkey";

-- DropForeignKey
ALTER TABLE "IngredienteProducto" DROP CONSTRAINT "IngredienteProducto_productoId_fkey";

-- DropTable
DROP TABLE "IngredienteProducto";

-- DropTable
DROP TABLE "MateriaPrima";

-- DropTable
DROP TABLE "Producto";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "portionSize" DOUBLE PRECISION NOT NULL,
    "portionsPerBatch" INTEGER NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
