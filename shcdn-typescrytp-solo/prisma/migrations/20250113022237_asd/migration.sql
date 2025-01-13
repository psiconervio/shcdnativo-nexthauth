-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('PRODUCED', 'DEFECTIVE', 'SALE', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "ProductStockLog" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "type" "StockType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductStockLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductStockLog_productId_createdAt_idx" ON "ProductStockLog"("productId", "createdAt");

-- AddForeignKey
ALTER TABLE "ProductStockLog" ADD CONSTRAINT "ProductStockLog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
