import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  interface Request {
    [key: string]: any;
  }

  interface Response {
    setHeader(name: string, value: string): void;
    [key: string]: any;
  }

  interface NextFunction {
    (): void;
  }

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
