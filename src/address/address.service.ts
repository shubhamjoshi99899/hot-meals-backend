import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async addAddress(data: {
    userId: string;
    label: string;
    address: string;
    latitude?: number;
    longitude?: number;
  }) {
    return this.prisma.address.create({
      data,
    });
  }

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
