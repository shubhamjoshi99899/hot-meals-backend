import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
// Import or define UserType enum
import { UserType } from '@prisma/client';

export class RequestOtpDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phoneNumber: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;
}