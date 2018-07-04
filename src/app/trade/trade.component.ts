import {Component, OnInit} from '@angular/core';
import {StockService} from "../stock/stock.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  searchValue: FormControl = new FormControl();
  searchOptions: string[] = [];
  filteredOptions: Observable<string[]>;
  favoriteStockSymbols: string[];

  constructor(private stockService: StockService) {
    this.favoriteStockSymbols = ['NVDA', 'MSFT', 'TSLA', 'BRK.A', 'TMUS'];
  }

  ngOnInit() {
    this.stockService.getTimeSeries("NVDA", "TIME_SERIES_DAILY", "60min")
      .subscribe(value => console.log(value));

    this.fillOptions("");
    this.filteredOptions = this.searchValue.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  fillOptions(name: string) {
    this.stockService.getSymbolsByName("").subscribe(values => {
      console.log(values);
      values.forEach(value => this.searchOptions.push(value.name))
    });
  }

}
