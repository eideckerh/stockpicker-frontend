import {Component, OnInit} from '@angular/core';
import {StockService} from "./stock.service";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public chart: Chart = [];
  public symbole: string = '';

  public stockDates: string[] = [];
  public stockClosingValues: number[] = [];
  public stockHighValue: number[] = [];
  public stockVolumeValue: number[] = [];


  constructor(private stockService: StockService) {
  }

  ngOnInit() {
    this.stockService.stockData().subscribe(res => {
      this.symbole = res['Meta Data']['2. Symbol'];
      let timeSeries = res['Time Series (Daily)'];

      Object.keys(timeSeries).forEach((dateString) => {
        this.stockDates.push(this.convertDateToString(new Date(dateString)));
        this.stockHighValue.push(timeSeries[dateString]['2. high']);
        this.stockClosingValues.push(timeSeries[dateString]['4. close']);
        this.stockVolumeValue.push(timeSeries[dateString]['6. volume']);
      })

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.stockDates,
          datasets: [
            {
              label: 'Börsenschlusskurs',
              data: this.stockClosingValues,
              borderColor: '#3f51b5',
              fill: false
            },
            {
              label: 'Höchstkurs',
              data: this.stockHighValue,
              borderColor: '#71dbff',
              fill: false
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{distribution: 'series', display: true}],
            yAxes: [{display: true, labelString: 'Price ($)'}]
          }
        }
      })
    })
  }

  private convertDateToString(date: Date): string {
    return date.toLocaleDateString('de', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

}
