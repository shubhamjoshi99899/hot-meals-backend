// src/map/map.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('snap-road')
  async snapToRoad(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.mapService.snapToRoad(Number(lat), Number(lng));
  }

  @Get('route')
  async getRoute(
    @Query('originLat') originLat: string,
    @Query('originLng') originLng: string,
    @Query('destLat') destLat: string,
    @Query('destLng') destLng: string,
  ) {
    return this.mapService.getRoute(
      { lat: Number(originLat), lng: Number(originLng) },
      { lat: Number(destLat), lng: Number(destLng) },
    );
  }

  @Get('nearby-search')
  async nearbySearch(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.mapService.nearbySearch(Number(lat), Number(lng));
  }

  @Get('multiple-nearby-search')
  async reverseGeocode(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.mapService.nearbySearchWithMultipleLocations(
      Number(lat),
      Number(lng),
    );
  }
}
