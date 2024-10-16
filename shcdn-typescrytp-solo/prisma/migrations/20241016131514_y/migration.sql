/*
  Warnings:

  - You are about to drop the column `stock` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `unitType` on the `Ingredient` table. All the data in the column will be lost.
  - The primary key for the `ProductIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `price` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "stock",
DROP COLUMN "unitPrice",
DROP COLUMN "unitType",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("id");
