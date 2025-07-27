import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDriverDto } from './driver.dto';
import { UpdateDriverDto } from './update-driver.dto';

@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDriverDto) {
    return this.prisma.driver.upsert({
      where: { phoneNumber: data.phoneNumber },
      update: {
        name: data.name,
        vehicleNumber: data.vehicleNumber,
        vehicleType: data.vehicleType,
        licenseNumber: data.licenseNumber,
      },
      create: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        vehicleNumber: data.vehicleNumber,
        vehicleType: data.vehicleType,
        licenseNumber: data.licenseNumber,
        userId: data.userId, // ✅ required for foreign key
      },
    });
  }

  async updateStatus(driverId: string, dto: UpdateDriverDto) {
    return this.prisma.driver.update({
      where: { id: driverId },
      data: { status: dto.status },
    });
  }

  async getAvailableDrivers() {
    return this.prisma.driver.findMany({
      where: {
        isAvailable: true,
        status: 'IDLE',
      },
    });
  }

  async getDriverById(id: string) {
    return this.prisma.driver.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateDriver(id: string, data: any) {
    return this.prisma.driver.update({
      where: { id: id },
      data: data,
    });
  }
}
