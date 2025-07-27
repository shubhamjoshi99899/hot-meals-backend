import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterDriverDto {
  @IsString()
  name: string;

  @IsPhoneNumber('IN')
  phoneNumber: string;

  @IsOptional()
  @IsString()
  vehicleNumber?: string;

  @IsOptional()
  @IsString()
  vehicleType?: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @IsString()
  userId: string; // ✅ new required field
}
