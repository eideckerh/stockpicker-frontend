import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SymbolStatistic} from "./model/symbolstatistic";
import {Symbol} from "./model/symbol";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";


@Injectable()
export class StockService {
  private url: string = "/stock";

  constructor(private http: HttpClient) {
  }

  getTrendingSymbols(): Observable<SymbolStatistic[]> {
    return this.http.get<SymbolStatistic[]>(this.url + "/symbol/trending");
  }

  getSymbolsByName(name: string): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(this.url + "/symbol", {
      params: new HttpParams().set("name", name)
    });
  }

  getTimeSeries(symbol: string, functionName: string, interval: string) {
    return this.http.get(this.url + "/timeserie", {
      params: new HttpParams().set("symbol", symbol)
        .append("function", functionName)
        .append("interval", interval)
    })
      .pipe(map(result => result));
  }

  getBatch(symbol: string) {
    return this.http.get(this.url + "/batch", {
      params: new HttpParams().set("symbol", symbol)
    })
  }

  getPrice(symbol: string) {
    return this.getBatch(symbol).pipe(
      map(value => value)
    );
  }
}
