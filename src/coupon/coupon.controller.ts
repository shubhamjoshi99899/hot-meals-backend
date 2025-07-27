import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async create(@Body() dto: CreateCouponDto) {
    return this.couponService.createCoupon(dto);
  }

  @Get('active')
  async getActive() {
    return this.couponService.getActiveCoupons();
  }

  @Get('validate')
  async validate(
    @Query('code') code: string,
    @Query('userType') userType: 'NEW_USER' | 'EXISTING_USER',
    @Query('userId') userId: string,
  ) {
    return this.couponService.validateCoupon(code, userType, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-usage')
  async getUserUsage(@Req() req) {
    const userId = req.user.sub;
    return this.couponService.getUserCouponUsage(userId);
  }
}
