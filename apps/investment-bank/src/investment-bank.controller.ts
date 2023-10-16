import { Controller, Get } from '@nestjs/common';
import { InvestmentBankService } from './investment-bank.service';

@Controller()
export class InvestmentBankController {
  constructor(private readonly investmentBankService: InvestmentBankService) {}

  @Get()
  getHello(): string {
    return this.investmentBankService.getHello();
  }
}
