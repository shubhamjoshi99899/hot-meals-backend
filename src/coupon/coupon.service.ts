import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async createCoupon(data: CreateCouponDto) {
    return this.prisma.coupon.create({ data });
  }

  async getActiveCoupons() {
    const now = new Date();
    return this.prisma.coupon.findMany({
      where: {
        isActive: true,
        // validFrom: { lte: now },
        // validUntil: { gte: now },
      },
    });
  }

  async validateCoupon(
    code: string,
    userType: 'NEW_USER' | 'EXISTING_USER',
    userId: string,
  ) {
    const now = new Date();
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });

    if (
      !coupon ||
      !coupon.isActive ||
      coupon.validFrom > now ||
      coupon.validUntil < now
    ) {
      throw new Error('Invalid or expired coupon');
    }

    const usage = await this.prisma.userCoupon.findUnique({
      where: { userId_couponId: { userId, couponId: coupon.id } },
    });

    if (
      usage &&
      coupon.perUserLimit &&
      usage.usageCount >= coupon.perUserLimit
    ) {
      throw new Error('Coupon usage limit reached for this user');
    }

    if (coupon.targetSegment === 'NEW_USERS' && userType !== 'NEW_USER') {
      throw new Error('Coupon valid only for new users');
    }

    return coupon;
  }

  async getUserCouponUsage(userId: string) {
    return this.prisma.userCoupon.findMany({
      where: { userId },
      include: {
        coupon: true,
      },
    });
  }

  async incrementUserCouponUsage(userId: string, couponId: string) {
    const existing = await this.prisma.userCoupon.findUnique({
      where: { userId_couponId: { userId, couponId } },
    });

    if (existing) {
      return this.prisma.userCoupon.update({
        where: { userId_couponId: { userId, couponId } },
        data: { usageCount: { increment: 1 } },
      });
    }

    return this.prisma.userCoupon.create({
      data: { userId, couponId, usageCount: 1 },
    });
  }
}
