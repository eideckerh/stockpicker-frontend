import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SymbolStatistic} from "./model/symbolstatistic";
import {Symbol} from "./model/symbol";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";


@Injectable()
export class StockService {
  private url: string = "/stock/symbol";

  constructor(private http: HttpClient) {
  }

  getTrending(): Observable<SymbolStatistic[]> {
    return this.http.get<SymbolStatistic[]>(this.url + "/trending");
  }

  getSymbolsByName(name: string): Observable<Symbol[]> {

    return this.http.get<Symbol[]>(this.url, {params: new HttpParams().set("name", name)});
  }

  stockData(symbol: string) {
    return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + symbol + '&apikey=H52S5Y8B97AZMBHK')
      .pipe(map(result => result));
  }
}
