import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
     origin: [
    'http://localhost:3000', // dev
    'https://localhost:3000',
    'https://myhub-client.vercel.app', // prod
    /\.vercel\.app$/ // allow any vercel.app subdomain
  ],
    credentials: true,
  });

  app.use(cookieParser());

  app.use((req, res, next) => {
    res.setHeader('same-origin-allow-popups');
    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
