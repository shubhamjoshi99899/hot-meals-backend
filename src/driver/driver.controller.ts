import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { RegisterDriverDto } from './driver.dto';
import { UpdateDriverDto } from './update-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  // ✅ Register or update driver by phone number
  @Post('register')
  async registerDriver(@Body() dto: RegisterDriverDto) {
    return this.driverService.register(dto);
  }

  // ✅ Update driver profile (name, vehicle, status, etc.)
  @Patch(':id')
  async updateDriver(@Param('id') id: string, @Body() dto: UpdateDriverDto) {
    return this.driverService.updateDriver(id, dto);
  }

  // ✅ Get all available & IDLE drivers
  @Get('available')
  async getAvailableDrivers() {
    return this.driverService.getAvailableDrivers();
  }

  @Patch(':id/status')
  async updateDriverStatus(
    @Param('id') id: string,
    @Body() dto: UpdateDriverDto,
  ) {
    return this.driverService.updateStatus(id, dto);
  }

  // ✅ Get a specific driver's profile (optional)
  @Get(':id')
  async getDriver(@Param('id') id: string) {
    return this.driverService.getDriverById(id);
  }
}
