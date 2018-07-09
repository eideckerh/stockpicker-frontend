import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from "@angular/material";
import {Trade} from "../../trade/model/trade";
import {TradeService} from "../../trade/trade.service";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";
import {StockService} from "../../stock/stock.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  displayedColumns: string[] = ["symbol", "volume", "opened", "openValue", "price"];
  dataSource: MatTableDataSource<Trade>;
  cachedTradesList: Trade[] = [];

  constructor(private tradeService: TradeService,
              private dialog: MatDialog,
              private stockService: StockService) {
    this.tradeService.getTrades().subscribe(values => {
        values.forEach(value => this.addPriceToTrade(value));
        this.dataSource = new MatTableDataSource<Trade>(values);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Übersichtsdaten konnten nicht geladen werden: " + error.status}});
      });
  }

  ngOnInit() {
  }

  private addPriceToTrade(trade: Trade) {
    // let cachedTrade = this.cachedTradesList.find(cached => cached.symbol.key == trade.symbol.key);
    // if (cachedTrade) {
    //   trade.price = cachedTrade.price;
    // } else {
    //   this.stockService.getPrice(trade.symbol.key).subscribe(
    //     price => {
    //       trade.price = price;
    //     }
    //   );
    //   this.addPriceToTrade()
    // }
  }

  convertToReadableDate(timestamp: number): string {
    const date: Date = new Date(timestamp);
    return this.convertDateToString(date);
  }

  private convertDateToString(date: Date): string {
    return date.toLocaleDateString('de', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

}
