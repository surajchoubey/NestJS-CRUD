import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// your-domain.com/users for @Controller(users)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}