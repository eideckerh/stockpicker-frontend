import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TradeRequest} from "./model/traderequest";
import {Trade} from "./model/trade";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TradeService {

  private url: string = "/trade";

  constructor(private http: HttpClient) {
  }

  createTrade(request: TradeRequest) {
    return this.http.post(this.url, request);
  }

  closeTrade(userId: number) {
    return this.http.post(this.url + "/${userId}/close", null);
  }

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.url);
  }

  getTrade(tradeId: number) {
    return this.http.get<Trade>(this.url + "/${tradeId}");
  }

  getOpenTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.url + "open");
  }

}
