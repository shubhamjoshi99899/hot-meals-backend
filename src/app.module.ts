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
import { FileModule } from './file/file.module';
import { LocationModule } from './location/location.module';
import { ConfigModule } from '@nestjs/config';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    AuthModule,
    BranchModule,
    MenuModule,
    OrderModule,
    UserModule,
    AddressModule,
    CouponModule,
    DriverModule,
    FileModule,
    LocationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
