import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from "@angular/material";
import {Trade} from "../../trade/model/trade";
import {TradeService} from "../../trade/trade.service";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  displayedColumns: string[] = ["symbol", "volume", "opened", "openValue"];
  dataSource: MatTableDataSource<Trade>;

  constructor(private tradeService: TradeService, private dialog: MatDialog) {
    this.tradeService.getTrades().subscribe(value => {
        this.dataSource = new MatTableDataSource<Trade>(value);
      },
      error => {
        this.dialog.open(MessageboxComponent, {data: {message: "Übersichtsdaten konnten nicht geladen werden: " + error.status}});
      });
  }

  ngOnInit() {
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
