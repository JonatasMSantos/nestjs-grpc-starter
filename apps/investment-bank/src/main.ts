import { NestFactory } from '@nestjs/core';
import { InvestmentBankModule } from './investment-bank.module';

async function bootstrap() {
  const app = await NestFactory.create(InvestmentBankModule);
  await app.listen(3001);
}
bootstrap();
