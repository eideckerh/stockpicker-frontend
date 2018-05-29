import {Component, OnInit} from '@angular/core';
import {StockService} from "./stock.service";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public symbole: string = '';
  public stockData: Map<Date, number> = new Map<Date, number>();

  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.stockService.stockData().subscribe(res => {
      this.symbole = res['Meta Data']['2. Symbol'];
      let timeSeries = res['Time Series (Daily)'];

      Object.keys(timeSeries).forEach((dateString) => {
        this.stockData.set(new Date(dateString), timeSeries[dateString]['4. close']);
      })

      this.stockData.forEach((value, key) => {
        console.log('Value: ' + value);
        console.log('Key: ' + key);
      })
    })

  }

  private convertDateToString(date: Date): string {
    return date.toLocaleTimeString('de', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

}
