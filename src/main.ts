import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(new ValidationPipe());

  // CORS setup (both localhost & prod)
  const allowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://myhub-client.vercel.app'
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Explicit OPTIONS handler for serverless/Vercel
  app.use((req: Request, res: Response, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '');
      res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(200);
    }
    next();
  });

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
