import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { AuthService } from './auth.service';
import { GoogleDto } from './dto/google.dto';

import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async googleLogin(
    @Body() dto: GoogleDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const token = await this.authService.googleSignIn(dto.code);

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { success: true };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie('authToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return { success: true };
  }
}
