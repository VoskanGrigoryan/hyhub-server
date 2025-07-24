import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async googleAuth(@Body('idToken') idToken: string) {
    return this.authService.googleLogin(idToken);
  }
}
