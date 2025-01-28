/*
  Warnings:

  - You are about to drop the column `amount` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `monto` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "amount",
DROP COLUMN "date",
DROP COLUMN "name",
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "fecha" TIMESTAMP(3),
ADD COLUMN     "monto" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;
