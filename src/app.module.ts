import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JwtStrategy } from './modules/auth/strategy/auth.strategy';
import { GoogleStrategy } from './modules/auth/strategy/auth.google.strategy';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [],
  providers: [GoogleStrategy, JwtStrategy],
})
export class AppModule {}
