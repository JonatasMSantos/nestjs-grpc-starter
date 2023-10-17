import { NestFactory } from '@nestjs/core';
import { InvestmentBankModule } from './investment-bank.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationExceptionFilter } from './validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InvestmentBankModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'bank',
        protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
        loader: { keepCase: true },
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen();
}
bootstrap();
