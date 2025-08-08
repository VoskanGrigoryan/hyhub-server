import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JwtStrategy } from './modules/auth/strategy/auth.strategy';
import { GoogleStrategy } from './modules/auth/strategy/auth.google.strategy';
import { HealthModule } from './modules/health/health.module';


@Module({
  imports: [PrismaModule, AuthModule, HealthModule],
  controllers: [],
  providers: [GoogleStrategy, JwtStrategy],
})
export class AppModule {}
