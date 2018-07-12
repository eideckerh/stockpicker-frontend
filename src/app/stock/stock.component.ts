import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StockService} from "./stock.service";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  @Input('symbol')
  set input(value: string) {
    this.symbol = value;
    if (this.chart) {
      this.chart.destroy();
    }
    this.initChart();
  }

  @Output()
  public price = new EventEmitter<number>();

  public symbol: string;
  public chart: Chart;
  public chartIsLoaded: boolean = false;
  public stockDates: string[] = [];
  public stockClosingValues: number[] = [];
  public stockHighValue: number[] = [];
  public stockVolumeValue: number[] = [];


  constructor(private stockService: StockService) {
  }

  ngOnInit() {
  }

  initChart() {
    this.stockDates = [];
    this.stockClosingValues = [];
    this.stockHighValue = [];
    this.stockVolumeValue = [];

    this.stockService.getTimeSeries(this.symbol, "TIME_SERIES_INTRADAY", "5min").subscribe(res => {
      let timeSeries = res['quotes'];
      console.log(timeSeries)
      this.parseDataFromTimeSeries(timeSeries);
      this.chart = this.generateChart();
      this.chartIsLoaded = true;
    })
  }

  private parseDataFromTimeSeries(timeSeries: string) {
    Object.keys(timeSeries).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    }).forEach((dateString) => {
      this.stockDates.unshift(this.convertDateToString(new Date(dateString)));
      this.stockHighValue.unshift(timeSeries[dateString]['high']);
      this.stockClosingValues.unshift(timeSeries[dateString]['close']);
      this.stockVolumeValue.unshift(timeSeries[dateString]['volume']);
    })
    this.price.emit(this.stockClosingValues[this.stockClosingValues.length - 1]);
  }

  private generateChart(): Chart {
    return new Chart(this.canvas.nativeElement.getContext('2d'), {
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
  }


  private convertDateToString(date: Date): string {
    return date.toLocaleDateString('de', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
}
