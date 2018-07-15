import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from "@angular/material";
import {Trade} from "../../trade/model/trade";
import {TradeService} from "../../trade/trade.service";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";
import {StockService} from "../../stock/stock.service";


/**
 * Komponente für die Übersicht aller Trades
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  displayedColumns: string[] = ["symbol", "volume", "opened", "openValue", "price"];
  displayedFooterColumns: string[] = ["symbol", "openValue", "price"];
  dataSource: MatTableDataSource<Trade>;

  constructor(private tradeService: TradeService,
              private dialog: MatDialog,
              private stockService: StockService) {

  }

  /**
   * Initialisiert die Komponente mit den Trade-Daten (Backend-Call)
   */
  ngOnInit() {
    this.tradeService.getOpenTrades().subscribe(values => {
        values.forEach(value => this.addPriceToTrade(value));
        this.dataSource = new MatTableDataSource<Trade>(values);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Übersichtsdaten konnten nicht geladen werden: " + error.status}});
      });
  }

  private addPriceToTrade(trade: Trade) {
    this.stockService.getPrice(trade.symbol.key).subscribe(
      (price: number) => {
        trade.price = price;
      }
    );
  }

  /**
   * Läd ein generiertes PDF herunter, welches die Statistiken der abgeschlossenen Trades enthält
   */
  onDownloadStatistic() {
    let link = document.createElement('a');
    let blob;
    this.tradeService.getTradeReport().subscribe(res => {
        blob = res;
        console.log(blob);
        link.href = window.URL.createObjectURL(blob);
        link.download = "Handelsbericht.pdf";
        link.click();

        setTimeout(function () {
          window.URL.revokeObjectURL(link.href);
        }, 0)
      }
    );

  }

  /**
   * Ermittelt den Gesamtwert der aktuellen Positionen
   * @returns {number}
   */
  getTotalCurrentValue() {
    let totalCurrentValue = 0;
    this.dataSource.data.forEach(trade => {
      totalCurrentValue += trade.price * trade.volume;
    })
    return totalCurrentValue;
  }

  /**
   * Ermittelt den Gesamtwert der Positionen zum Zeitpunkt des Kaufes.
   * @returns {number}
   */
  getTotalOpenValue() {
    let totalOpenValue = 0;
    this.dataSource.data.forEach(trade => {
      totalOpenValue += trade.openValue * trade.volume;
    })
    return totalOpenValue;
  }

  /**
   * Ermittelt den gesamten Profit
   * @returns {number}
   */
  getTotalProfit() {
    return this.getTotalCurrentValue() - this.getTotalOpenValue();
  }

  /**
   * Ermittelt den gesamten Profit in Prozent
   * @returns {number}
   */
  getTotalProfitPercentage() {
    return (this.getTotalCurrentValue() / this.getTotalOpenValue() - 1) * 100
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
