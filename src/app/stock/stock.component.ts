import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {StockService} from "./stock.service";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  @Input()
  public symbol: string;

  public chart: Chart = [];
  public chartIsLoaded: boolean = false;
  public stockDates: string[] = [];
  public stockClosingValues: number[] = [];
  public stockHighValue: number[] = [];
  public stockVolumeValue: number[] = [];


  constructor(private stockService: StockService) {
  }


  ngOnInit() {
    this.stockService.stockData(this.symbol).subscribe(res => {

      let timeSeries = res['Time Series (Daily)'];
      console.log(this.symbol);

      Object.keys(timeSeries).forEach((dateString) => {
        this.stockDates.unshift(this.convertDateToString(new Date(dateString)));
        this.stockHighValue.unshift(timeSeries[dateString]['2. high']);
        this.stockClosingValues.unshift(timeSeries[dateString]['4. close']);
        this.stockVolumeValue.unshift(timeSeries[dateString]['6. volume']);
      })

      this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
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
      this.chartIsLoaded = true;
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
