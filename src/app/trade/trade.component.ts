import {Component, OnInit} from '@angular/core';
import {StockService} from "../stock/stock.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/internal/Observable";
import {map, startWith} from "rxjs/operators";
import {Symbol} from "../stock/model/symbol";
import {MatOptionSelectionChange} from "@angular/material";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  selectedValue: string;
  searchValue: FormControl = new FormControl();
  searchOptions: Symbol[] = [];
  filteredOptions: Observable<Symbol[]>;
  favoriteStockSymbols: string[];

  constructor(private stockService: StockService) {
    this.favoriteStockSymbols = ['NVDA', 'MSFT', 'TSLA', 'BRK.A', 'TMUS'];
  }

  ngOnInit() {
    this.fillOptions("");
    this.filteredOptions = this.searchValue.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): Symbol[] {
    const filterValue = value.toLowerCase();
    return this.searchOptions.filter((option: Symbol) => {
      return option.name.toLowerCase().includes(filterValue) || option.key.toLowerCase().includes(filterValue);
    });
  }

  fillOptions(name: string) {
    this.stockService.getSymbolsByName("").subscribe(values => {
      values.forEach(value => this.searchOptions.push(value))
    });
  }

  onSelectionChange($event: MatOptionSelectionChange, symbol: Symbol) {
    if ($event.source.selected) {
      this.selectedValue = symbol.key;
    }
  }

}
