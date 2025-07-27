// src/order/order.controller.ts
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: any) {
    return this.orderService.createOrder(body);
  }

  @Get('all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('user/:userId')
  getUserOrders(@Param('userId') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @Get('branch/:branchId')
  getBranchOrders(@Param('branchId') branchId: string) {
    return this.orderService.getOrdersByBranch(branchId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.orderService.updateOrderStatus(id, body.status);
  }

  @Patch(':orderId/assign-driver/:driverId')
  assignDriver(
    @Param('orderId') orderId: string,
    @Param('driverId') driverId: string,
  ) {
    return this.orderService.assignDriver(orderId, driverId);
  }

  @Patch(':orderId/status')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(orderId, dto.status);
  }

  @Patch(':orderId/cancel')
  cancelOrder(@Param('orderId') orderId: string, @Body() dto: CancelOrderDto) {
    return this.orderService.cancelOrder(orderId, dto);
  }
}
