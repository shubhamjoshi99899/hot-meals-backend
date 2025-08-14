/*
  Warnings:

  - Added the required column `address` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryFee` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryRadius` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedDeliveryTime` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minOrderValue` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "deliveryFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deliveryRadius" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "estimatedDeliveryTime" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "minOrderValue" DOUBLE PRECISION NOT NULL;
