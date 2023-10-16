import { Module } from '@nestjs/common';
import { InvestmentBankController } from './investment-bank.controller';
import { InvestmentBankService } from './investment-bank.service';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

const dsn =
  'mongodb://root:root@127.0.0.1:27017/bank?authSource=admin&directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';

@Module({
  imports: [MongooseModule.forRoot(dsn), OrdersModule],
  controllers: [InvestmentBankController],
  providers: [InvestmentBankService],
})
export class InvestmentBankModule {}
