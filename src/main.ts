import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://myhub-client.vercel.app']
  : ['http://localhost:3000'];


 app.enableCors({
  origin: (origin: string, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

  app.use(cookieParser());

  app.use((req, res, next) => {
    // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); removing for tests
    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
