/*
  Warnings:

  - You are about to drop the column `date` on the `ProductStock` table. All the data in the column will be lost.
  - You are about to drop the column `quantityDefective` on the `ProductStock` table. All the data in the column will be lost.
  - You are about to drop the column `quantityProduced` on the `ProductStock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductStock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `ProductStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductStock" DROP COLUMN "date",
DROP COLUMN "quantityDefective",
DROP COLUMN "quantityProduced",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_productId_key" ON "ProductStock"("productId");
