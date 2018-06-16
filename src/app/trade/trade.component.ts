import {Component, OnInit} from '@angular/core';
import {StockService} from "../stock/stock.service";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  public favoriteStockSymbols: string[];

  constructor(private stockService: StockService) {
    this.favoriteStockSymbols = ['NVDA', 'MSFT', 'TSLA', 'BRK.A', 'TMUS'];
  }

  ngOnInit() {
  }

}
