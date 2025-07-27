import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'prisma/prisma.service';
import { OrderGateway } from './order.gateway';

@Module({
  providers: [PrismaService, OrderService, OrderGateway],
  controllers: [OrderController],
})
export class OrderModule {}
