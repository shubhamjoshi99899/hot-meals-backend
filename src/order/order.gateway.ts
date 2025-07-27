import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  // Method to broadcast updates
  broadcastOrderStatusUpdate(orderId: string, status: string) {
    this.server.emit(`order-status-${orderId}`, { orderId, status });
  }

  @SubscribeMessage('driver-location-update')
  handleLocationUpdate(
    @MessageBody()
    data: {
      orderId: string;
      location: { lat: number; lng: number };
    },
  ) {
    this.server.emit(`driver-location-${data.orderId}`, data.location);
  }
}
