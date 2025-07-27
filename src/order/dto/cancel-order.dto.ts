// dto/cancel-order.dto.ts
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CancelOrderDto {
  @IsIn(['ADMIN', 'USER', 'DRIVER'])
  cancelledBy: 'ADMIN' | 'USER' | 'DRIVER';

  @IsOptional()
  @IsString()
  reason?: string;
}
