/*
  Warnings:

  - You are about to drop the column `quantityAvailable` on the `ProductStock` table. All the data in the column will be lost.
  - You are about to drop the column `waste` on the `ProductStock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductStock" DROP COLUMN "quantityAvailable",
DROP COLUMN "waste";
