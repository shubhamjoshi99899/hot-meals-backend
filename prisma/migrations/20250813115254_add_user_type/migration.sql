/*
  Warnings:

  - You are about to drop the column `address` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryFee` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryRadius` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedDeliveryTime` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `minOrderValue` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `currentOrderId` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNumber` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleNumber` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleType` on the `Driver` table. All the data in the column will be lost.
  - The `items` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BranchDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCoupon` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `latitude` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('ADMIN', 'DRIVER');

-- DropForeignKey
ALTER TABLE "public"."BranchDetails" DROP CONSTRAINT "BranchDetails_branchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Driver" DROP CONSTRAINT "Driver_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_couponId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_couponId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_userId_fkey";

-- DropIndex
DROP INDEX "public"."Driver_userId_key";

-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Branch" DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "deliveryFee",
DROP COLUMN "deliveryRadius",
DROP COLUMN "estimatedDeliveryTime",
DROP COLUMN "isActive",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "minOrderValue",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."Driver" DROP COLUMN "createdAt",
DROP COLUMN "currentOrderId",
DROP COLUMN "isAvailable",
DROP COLUMN "licenseNumber",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "vehicleNumber",
DROP COLUMN "vehicleType";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "items",
ADD COLUMN     "items" JSONB[],
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "public"."BranchDetails";

-- DropTable
DROP TABLE "public"."Coupon";

-- DropTable
DROP TABLE "public"."UserCoupon";

-- DropEnum
DROP TYPE "public"."DiscountType";

-- DropEnum
DROP TYPE "public"."DriverStatus";

-- DropEnum
DROP TYPE "public"."OrderStatus";

-- DropEnum
DROP TYPE "public"."TargetSegment";

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
