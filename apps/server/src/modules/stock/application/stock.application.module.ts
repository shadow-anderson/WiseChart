import { Module } from '@nestjs/common';
import { AuthenticationDomainModule } from '@server/modules/authentication/domain';
import { StockDomainModule } from '../domain';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [AuthenticationDomainModule, StockDomainModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockApplicationModule {}
