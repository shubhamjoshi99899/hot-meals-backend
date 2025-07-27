import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async add(@Body() body, @Req() req: Request) {
    const userId = req.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.addressService.addAddress({ userId, ...body });
  }

  @Get()
  async getMyAddresses(@Req() req: Request) {
    const userId = req.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.addressService.getAddresses(userId);
  }
}
