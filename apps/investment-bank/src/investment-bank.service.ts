import { Injectable } from '@nestjs/common';

@Injectable()
export class InvestmentBankService {
  getHello(): string {
    return 'Hello World!';
  }
}
