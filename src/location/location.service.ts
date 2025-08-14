import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async searchPlaces(query: string): Promise<any[]> {
    const apiKey = this.configService.get<string>('OLA_MAPS_API_KEY');
    const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${encodeURIComponent(query)}&api_key=${apiKey}`;

    const response = await this.httpService.axiosRef.get(url);
    const results = response.data?.results || [];

    return results.map((place) => {
      const addressComponents = (type: string) =>
        place.address_components.find((c) => c.types.includes(type))?.long_name;

      return {
        name: place.name,
        formattedAddress: place.formatted_address,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        placeId: place.place_id,
        types: place.types,
        city: addressComponents('locality'),
        state: addressComponents('administrative_area_level_1'),
        country: addressComponents('country'),
        postalCode: addressComponents('postal_code'),
      };
    });
  }

  async forwardGeocode(address: string): Promise<any[]> {
    const apiKey = this.configService.get<string>('OLA_MAPS_API_KEY');
    const url = `https://api.olamaps.io/places/v1/geocode`;
    const params = {
      address,
      language: 'English',
      api_key: apiKey,
    };

    const response = await this.httpService.axiosRef.get(url, { params });
    const results = response.data?.geocodingResults || [];

    return results.map((place) => {
      const findComponent = (type: string) =>
        place.address_components.find((c) => c.types.includes(type))?.long_name;

      return {
        name: place.name,
        formattedAddress: place.formatted_address,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        placeId: place.place_id,
        types: place.types,
        city: findComponent('locality'),
        state: findComponent('administrative_area_level_1'),
        country: findComponent('country'),
        postalCode: findComponent('postal_code'),
      };
    });
  }
}
