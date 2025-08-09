import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { Response as ExpressResponse, Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleDto, RequestWithUser } from './dto/google.dto';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async googleLogin(
    @Body() dto: GoogleDto,
    @Res({ passthrough: true }) res: ExpressResponse,
    @Req() req: Request,
  ) {
    const { token, isNewUser, user } = await this.authService.googleSignIn(dto.code);

    const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1';

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: isLocalhost ? 'lax' : 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return { success: true, user, isNewUser };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: ExpressResponse, @Req() req: Request) {
    const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1';

    res.clearCookie('authToken', {
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: isLocalhost ? 'lax' : 'none',
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
