import { PartialType } from '@nestjs/graphql';

// src/branch/dto/create-branch.dto.ts
export class CreateBranchDto {
  name: string;
  address: string;
  location: string;
  lat: number;
  lng: number;
  isActive: boolean;
  deliveryRadius: number;
  minOrderValue: number;
  deliveryFee: number;
  estimatedDeliveryTime: number;
}

// src/branch/dto/update-branch.dto.ts
