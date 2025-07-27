// src/order/order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { OrderGateway } from './order.gateway';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private gateway: OrderGateway,
  ) {}

  async createOrder(data: {
    userId: string;
    branchId: string;
    addressId: string;
    items: any[];
    totalAmount: number;
    notes?: string;
  }) {
    return this.prisma.order.create({
      data: {
        ...data,
        items: data.items,
      },
    });
  }

  async getOrdersByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { placedAt: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      orderBy: { placedAt: 'desc' },
    });
  }

  async getOrdersByBranch(branchId: string) {
    return this.prisma.order.findMany({
      where: { branchId },
      orderBy: { placedAt: 'desc' },
    });
  }

  async updateOrderStatus(orderId: string, status: any) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    await this.gateway.broadcastOrderStatusUpdate(orderId, status);
    return order;
  }

  async assignDriver(orderId: string, driverId: string) {
    // update driver
    await this.prisma.driver.update({
      where: { id: driverId },
      data: { status: 'ASSIGNED', isAvailable: false },
    });

    // update order
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        driverId,
        status: 'ASSIGNED',
      },
      include: { driver: true },
    });
    await this.gateway.broadcastOrderStatusUpdate(orderId, 'ASSIGNED');
    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async cancelOrder(orderId: string, dto: CancelOrderDto) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        cancelledBy: dto.cancelledBy,
        cancellationReason: dto.reason,
      },
    });

    await this.gateway.broadcastOrderStatusUpdate(orderId, 'CANCELLED');
    return order;
  }
}
