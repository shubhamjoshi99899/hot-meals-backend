// src/map/map.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
@Injectable()
export class MapService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private readonly BASE_URL = 'https://api.olamaps.io';

  async snapToRoad(lat: number, lng: number) {
    const apiKey = this.config.get<string>('OLA_MAPS_API_KEY');
    const url = `${this.BASE_URL}/routing/v1/nearestRoads`;

    const payload = {
      location: {
        lat,
        lng,
      },
    };

    const response = await this.http.axiosRef.post(url, payload, {
      params: { api_key: apiKey },
    });

    return response.data;
  }

  async getRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ) {
    const apiKey = this.config.get<string>('OLA_MAPS_API_KEY');
    const url = `${this.BASE_URL}/routing/v1/directions`;

    const payload = {
      origin,
      destination,
    };

    const response = await this.http.axiosRef.post(url, payload, {
      params: { api_key: apiKey },
    });

    return response.data;
  }

  async nearbySearch(lat: number, lng: number) {
    const apiKey = this.config.get<string>('OLA_MAPS_API_KEY');
    const url = `${this.BASE_URL}/places/v1/nearbysearch`;

    const response = await this.http.axiosRef.get(url, {
      params: {
        api_key: apiKey,
        location: `${lat},${lng}`,
        radius: 10000,
        types: 'restaurant',
        rankBy: 'distance',
        withCentroid: false,
      },
    });

    const predictions = response.data.predictions || [];

    if (!predictions.length) {
      return {
        location: 'Unknown',
        coordinates: { lat, lng },
      };
    }

    // Step 1: Count all keywords from `terms`
    const termCounts = _.countBy(
      predictions.flatMap((p) => p.terms?.map((t) => t.value) || []),
    );

    const mostCommonTerm = _.maxBy(
      Object.keys(termCounts),
      (key) => termCounts[key],
    );

    // Step 2: Find the closest place that contains that term
    const bestMatch = predictions.find((p) =>
      p.terms?.some((t) => t.value === mostCommonTerm),
    );

    return {
      location: mostCommonTerm,
      coordinates: {
        lat,
        lng,
      },
      referencePlace: {
        description: bestMatch?.description,
        distance: bestMatch?.distance_meters,
      },
    };
  }

  async nearbySearchWithMultipleLocations(
    lat: number,
    lng: number,
    type = 'restaurant',
    radius = 10000,
  ) {
    const apiKey = this.config.get<string>('OLA_MAPS_API_KEY');
    const url = `${this.BASE_URL}/places/v1/nearbysearch`;

    const response = await this.http.axiosRef.get(url, {
      params: {
        api_key: apiKey,
        location: `${lat},${lng}`,
        types: type,
        radius,
        rankBy: 'distance',
        withCentroid: false,
      },
    });

    return response.data;
  }
}
