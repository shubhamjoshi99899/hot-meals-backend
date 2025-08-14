-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "deliveryFee" DROP NOT NULL,
ALTER COLUMN "deliveryRadius" DROP NOT NULL,
ALTER COLUMN "estimatedDeliveryTime" DROP NOT NULL,
ALTER COLUMN "isActive" DROP NOT NULL,
ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "lng" DROP NOT NULL,
ALTER COLUMN "minOrderValue" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BranchDetails" (
    "branchId" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "specialties" TEXT[],
    "offers" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "deliveryTime" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "menuCount" INTEGER NOT NULL,
    "isPopular" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchDetails_pkey" PRIMARY KEY ("branchId")
);

-- AddForeignKey
ALTER TABLE "BranchDetails" ADD CONSTRAINT "BranchDetails_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
