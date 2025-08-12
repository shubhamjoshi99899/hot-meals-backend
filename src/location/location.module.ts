import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
