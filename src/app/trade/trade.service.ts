import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TradeRequest} from "./model/traderequest";

@Injectable({
  providedIn: "root"
})
export class TradeService {

  private url: string = "/trade";

  constructor(private http: HttpClient) {
  }

  createTrade(request: TradeRequest) {
    return this.http.post(this.url, request );
  }

  closeTrade(userId: number) {
    return this.http.post(this.url + "/${userId}/close");
  }

  getTimeSeries(symbol: string, functionName: string, interval: string) {
    return this.http.get(this.url + "/timeserie", {
      params: new HttpParams().set("symbol", symbol)
        .append("function", functionName)
        .append("interval", interval)
    })
      .pipe(map(result => result));
  }
