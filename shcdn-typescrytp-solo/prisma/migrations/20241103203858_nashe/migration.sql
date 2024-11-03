/*
  Warnings:

  - Added the required column `costPerPortion` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portions` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceWithoutTax` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundedPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "costPerPortion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "portions" INTEGER NOT NULL,
ADD COLUMN     "priceWithoutTax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roundedPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL;
