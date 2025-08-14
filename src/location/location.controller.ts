// src/location/location.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('search')
  async search(@Query('latlng') query: string) {
    return this.locationService.searchPlaces(query);
  }

  @Get('geocode')
  async geocode(@Query('address') address: string) {
    return this.locationService.forwardGeocode(address);
  }
}
