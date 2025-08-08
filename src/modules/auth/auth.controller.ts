import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { AuthService } from './auth.service';
import { GoogleDto, RequestWithUser } from './dto/google.dto';

import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  private isProd: boolean;

  constructor(private authService: AuthService) {
    this.isProd = process.env.NODE_ENV === 'production';
  }

  @Post('google')
  async googleLogin(
    @Body() dto: GoogleDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const { token, isNewUser, user } = await this.authService.googleSignIn(
      dto.code,
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: this.isProd,
      sameSite: this.isProd ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { success: true, user, isNewUser };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie('authToken', {
      httpOnly: true,
      // sameSite: 'none',
      // secure: process.env.NODE_ENV === 'production',
      secure: this.isProd,
      sameSite: this.isProd ? 'none' : 'lax',
      path: '/',
    });
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return req.user;
  }
}
