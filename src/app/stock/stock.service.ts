import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable()
export class StockService {

  constructor(private http: HttpClient) {
  }

  stockData(symbol: string) {
    return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + symbol + '&apikey=H52S5Y8B97AZMBHK')
      .pipe(map(result => result));
  }
}
