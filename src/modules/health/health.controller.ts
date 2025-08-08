import { Controller, Get } from '@nestjs/common';

@Controller('healthz')
export class HealthController {
  constructor() {}

  @Get()
  check() {
    return { status: 'ok' };
  }
}
