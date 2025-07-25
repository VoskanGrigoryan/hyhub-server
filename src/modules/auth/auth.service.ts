import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async googleLogin(idToken: string) {
    // Verify the Google ID token
    const ticket = await this.oauthClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Invalid Google token');
    }

    // Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Account not allowed');
    }

    let user = existingUser;
    let isNewUser = false;

    if (!user) {
      // Create a new user if not found
      user = await this.prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          provider: 'google',
        },
      });
      isNewUser = true;
    }

    // Generate JWT
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      token,
      isNewUser,
      user,
    };
  }
}
