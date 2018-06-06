import {Component, OnInit} from '@angular/core';
import {StockService} from "../stock/stock.service";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(private stockService: StockService) {
  }

  ngOnInit() {
  }

}
