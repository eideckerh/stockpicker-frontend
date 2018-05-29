import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable()
export class StockService {

  constructor(private http: HttpClient) {
  }

  stockData() {
    return this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=demo")
      .pipe(map(result => result));
  }
}
