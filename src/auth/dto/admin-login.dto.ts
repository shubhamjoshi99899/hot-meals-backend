import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}