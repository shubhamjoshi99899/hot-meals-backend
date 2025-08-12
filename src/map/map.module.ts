import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],

  providers: [MapService],
  controllers: [MapController],
})
export class MapModule {}
