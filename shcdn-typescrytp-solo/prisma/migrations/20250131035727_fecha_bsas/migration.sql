-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires';

-- AlterTable
ALTER TABLE "ProductStock" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires',
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires';

-- AlterTable
ALTER TABLE "ProductStockLog" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires';

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires';
