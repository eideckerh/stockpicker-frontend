import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js'
import {TradeService} from "../../trade/trade.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  @Input('text')
  text: string;

  @ViewChild('canvas') canvas: ElementRef;
  chart: Chart = [];
  dataMap = new Map<string, number>();
  data = [10, 20, 30];
  colors = ['#3140A5', '#E8EAF6', '#C5CBE9', '#29379D', '#9FA8DA', '#7985CB', '#1B278D', '#5C6BC0', '#3F51B5', '#394AAE'
  ];

  constructor(private tradeService: TradeService) {
  }


  ngOnInit() {
    this.tradeService.getOpenTrades().subscribe(trades => {
      trades.forEach(trade => {
        let volume = this.dataMap.get(trade.symbol.key);
        if (!volume) {
          volume = 0;
        }
        volume += trade.volume;
        this.dataMap.set(trade.symbol.key, volume);
      })
      this.chart = this.generateChart();
    })
  }

  generateColors(length: number): string[] {
    let colorCopy = this.colors.slice();
    let returnColors = [];
    for (var i = 0; i < length; i++) {
      let color = colorCopy.shift();
      returnColors.push(color);
      colorCopy.push(color);
    }
    return returnColors;
  }

  private generateChart(): Chart {

    var myPieChart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: Array.from(this.dataMap.values()),
          backgroundColor: this.generateColors(this.data.length)


        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Array.from(this.dataMap.keys())

      }
    });
  }

}
