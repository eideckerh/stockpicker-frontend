import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SymbolStatistic} from "./model/symbolstatistic";
import {Symbol} from "./model/symbol";
import {Observable} from "rxjs/internal/Observable";
import {map, shareReplay} from "rxjs/operators";


@Injectable()
export class StockService {
  private url: string = "/stock";

  private batchCache = new Map<string, Observable<Object>>();
  private timeSeriesCache = new Map<string, Observable<Object>>();

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
    let key = symbol + functionName + interval;

    if (!this.timeSeriesCache.get(key)) {
      this.timeSeriesCache.set(key, this.requestTimeSeries(symbol, functionName, interval).pipe(
        shareReplay(1)
      ))
    }
    return this.timeSeriesCache.get(key);
  }

  requestTimeSeries(symbol: string, functionName: string, interval: string) {
    return this.http.get(this.url + "/timeserie", {
      params: new HttpParams().set("symbol", symbol)
        .append("function", functionName)
        .append("interval", interval)
    });
  }

  getBatch(symbol: string) {
    return this.http.get(this.url + "/batch", {
      params: new HttpParams().set("symbol", symbol)
    })
  }

  getPrice(symbol: string) {
    if (!this.batchCache.get(symbol)) {
      this.batchCache.set(symbol, this.requestPrice(symbol).pipe(
        shareReplay(1)
      ))
    }
    return this.batchCache.get(symbol);
  }

  private requestPrice(symbol: string) {
    return this.getBatch(symbol).pipe(
      map(value => value['quotes'][0]['price'])
    );
  }
}
