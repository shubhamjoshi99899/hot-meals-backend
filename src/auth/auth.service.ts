// src/auth/auth.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { otpStore } from './otp.store';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async sendOtp(phoneNumber: string) {
    const normalizedPhone = phoneNumber.trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[normalizedPhone] = otp;
    console.log(`OTP for ${normalizedPhone}: ${otp}`); // Simulate SMS

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(phoneNumber: string, otp: string) {
    const normalizedPhone = phoneNumber.trim();
    const expectedOtp = otpStore[normalizedPhone];

    if (!expectedOtp) {
      throw new BadRequestException('No OTP requested for this number');
    }

    if (expectedOtp !== otp.toString().trim()) {
      throw new BadRequestException('Invalid OTP');
    }

    delete otpStore[normalizedPhone];

    let user = await this.prisma.user.findUnique({
      where: { phoneNumber: normalizedPhone },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { phoneNumber: normalizedPhone },
      });
    }

    const token = this.jwt.sign({ sub: user.id });

    const welcomeCouponCode = 'WELCOME100';

    const coupon = await this.prisma.coupon.findUnique({
      where: { code: welcomeCouponCode },
    });

    if (coupon) {
      await this.prisma.userCoupon.create({
        data: {
          userId: user.id,
          couponId: coupon.id,
          usageCount: 0,
        },
      });
    }

    return {
      accessToken: token,
      user,
    };
  }
}
