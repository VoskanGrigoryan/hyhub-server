import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private oauthClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000',
  );

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async googleSignIn(code: string) {
    const { tokens } = await this.oauthClient.getToken(code); // exchange code for tokens
    const idToken = tokens.id_token;

    if (!idToken) {
      throw new UnauthorizedException('Missing ID token');
    }

    const ticket = await this.oauthClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Invalid Google token');
    }

    // Try to find existing user
    let user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    let isNewUser = false;

    // If user doesn't exist, register a new one
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name ?? '',
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
