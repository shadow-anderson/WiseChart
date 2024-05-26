import { Injectable } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class StockService {
  constructor(private readonly httpService: HttpService) {}

  async fetchStockChartData(symbol: string): Promise<AxiosResponse<any>> {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`;
    return this.httpService.get(url).toPromise();
  }

  processStockChartData(response: AxiosResponse<any>): any {
    return response.data;
  }
}
