import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Handles the admin login with phone number and password.
   * @param adminLoginDto - The data transfer object for admin login.
   * @returns A JWT access token if credentials are valid.
   */
  async adminLogin(adminLoginDto: AdminLoginDto) {
    const { phoneNumber, password } = adminLoginDto;

    // In a real-world application, you would use a library like bcrypt
    // to compare a hashed password stored in the database.
    // For this project, we are using a hardcoded password for simplicity.
    if (password !== 'admin123') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const admin = await this.prisma.user.findUnique({
      where: { phoneNumber, isAdmin: true },
    });

    if (!admin) {
      throw new NotFoundException(
        `Admin user with phone number ${phoneNumber} not found.`,
      );
    }

    return this.signIn(admin.id, admin.phoneNumber, 'ADMIN');
  }

  /**
   * Generates and sends an OTP to a user's phone number.
   * (Note: This is a placeholder and does not actually send an SMS.)
   * @param requestOtpDto - The DTO containing the phone number and user type.
   * @returns A success message.
   */
  async sendOtp(requestOtpDto: RequestOtpDto) {
    const { phoneNumber, userType } = requestOtpDto;

    // In a real application, you would generate a random 6-digit OTP,
    // save it to the database with an expiry time, and use an SMS gateway
    // to send it to the user's phone number.
    console.log(
      `OTP requested for ${userType}: ${phoneNumber}. (OTP is 123456 for testing)`,
    );

    return { message: 'OTP sent successfully' };
  }

  /**
   * Verifies the provided OTP for a given phone number.
   * @param verifyOtpDto - The DTO containing the phone number and OTP.
   * @returns A JWT access token if the OTP is valid.
   */
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phoneNumber, otp } = verifyOtpDto;

    // This is a mock verification. In a real application, you would
    // look up the OTP in your database, check if it's expired,
    // and then validate it.
    if (otp !== '123456') {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      throw new NotFoundException(`User with phone number ${phoneNumber} not found.`);
    }

    const userType = user.isDriver ? 'DRIVER' : 'USER'; // Assuming non-drivers are general users
    return this.signIn(user.id, user.phoneNumber, userType);
  }

  /**
   * A private helper function to sign a JWT for a given user.
   * @param userId - The user's ID.
   * @param phoneNumber - The user's phone number.
   * @param userType - The type of user (e.g., 'ADMIN', 'DRIVER').
   * @returns An object containing the JWT access token.
   */
  private async signIn(userId: string, phoneNumber: string, userType: string) {
    const payload = { sub: userId, phoneNumber, userType };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
