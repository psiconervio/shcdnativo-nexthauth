/*
  Warnings:

  - Added the required column `finalPrice` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerUnit` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductIngredient" ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pricePerUnit" DOUBLE PRECISION NOT NULL;
