import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js'
import {TradeService} from "../../trade/trade.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  chart: Chart = [];
  data = [10, 20, 30];
  colors = ['#3140A5', '#E8EAF6', '#C5CBE9', '#29379D', '#9FA8DA', '#7985CB', '#1B278D', '#5C6BC0', '#3F51B5', '#394AAE'
  ];

  constructor(private tradeService: TradeService) {
  }


  ngOnInit() {
    this.chart = this.generateChart();
    this.tradeService.getOpenTrades().subscribe(trades => {

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
    console.log(returnColors)
    return returnColors;
  }

  private generateChart(): Chart {

    var myPieChart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'pie',
      data: {
        datasets: [{
          data: this.data,
          backgroundColor: this.generateColors(this.data.length)


        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      }
    });
  }

}
