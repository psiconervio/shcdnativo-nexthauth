/*
  Warnings:

  - The values [GASTOUNICO,GASTOMENSUAL] on the enum `ExpenseType` will be removed. If these variants are still used in the database, this will fail.
  - The values [EFECTIVO,TRANSFERENCIA,POSNET_CUOTAS] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [DIARIO,SEMANAL,MENSUAL,ANUAL] on the enum `Recurrence` will be removed. If these variants are still used in the database, this will fail.
  - The values [PRODUCIDO,DEFECTUOSO,VENDIDO,AJUSTE] on the enum `StockType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseType_new" AS ENUM ('ONE_TIME', 'RECURRING');
ALTER TABLE "Expense" ALTER COLUMN "type" TYPE "ExpenseType_new" USING ("type"::text::"ExpenseType_new");
ALTER TYPE "ExpenseType" RENAME TO "ExpenseType_old";
ALTER TYPE "ExpenseType_new" RENAME TO "ExpenseType";
DROP TYPE "ExpenseType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'TRANSFER', 'POSNET', 'POSNET_INSTALLMENTS');
ALTER TABLE "Sale" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Recurrence_new" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');
ALTER TABLE "Expense" ALTER COLUMN "recurrence" TYPE "Recurrence_new" USING ("recurrence"::text::"Recurrence_new");
ALTER TYPE "Recurrence" RENAME TO "Recurrence_old";
ALTER TYPE "Recurrence_new" RENAME TO "Recurrence";
DROP TYPE "Recurrence_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StockType_new" AS ENUM ('PRODUCED', 'DEFECTIVE', 'SALE', 'ADJUSTMENT');
ALTER TABLE "ProductStockLog" ALTER COLUMN "type" TYPE "StockType_new" USING ("type"::text::"StockType_new");
ALTER TYPE "StockType" RENAME TO "StockType_old";
ALTER TYPE "StockType_new" RENAME TO "StockType";
DROP TYPE "StockType_old";
COMMIT;
