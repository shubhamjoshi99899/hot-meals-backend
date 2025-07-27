import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CouponModule } from './coupon/coupon.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [AuthModule, BranchModule, MenuModule, OrderModule, UserModule, AddressModule, CouponModule, DriverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
