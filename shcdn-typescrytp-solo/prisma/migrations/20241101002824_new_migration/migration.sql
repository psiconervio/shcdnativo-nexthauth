/*
  Warnings:

  - You are about to drop the column `margin` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `portionSize` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `portionsPerBatch` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "margin",
DROP COLUMN "portionSize",
DROP COLUMN "portionsPerBatch",
DROP COLUMN "tax";
