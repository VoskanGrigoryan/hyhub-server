import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('google')
  async googleAuth(@Body('idToken') idToken: string) {
    return this.authService.googleLogin(idToken);
  }
}
