import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TradeService} from "../trade.service";
import {TradeRequest} from "../model/traderequest";
import {MatDialog} from "@angular/material";
import {MessageboxComponent} from "../../core/messagebox/messagebox.component";
import {StockService} from "../../stock/stock.service";

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  symbol: string;
  form: FormGroup;
  tradeTypes: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private tradeService: TradeService,
              private stockService: StockService,
              private dialog: MatDialog) {
    this.tradeTypes = ['Kaufen', 'Verkaufen'];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.symbol = params['symbol'];
    })
    this.form = this.fb.group({
      amount: ['', Validators.pattern('[0-9]*')],
      tradeType: ['', Validators.required],
      price: [{value: 'wird ermittelt..', disabled: true}],
      holdAmount: [{value: 0, disabled: true}, Validators.required]
    });
    this.updatePrice();
    this.updateHoldAmount();
  }

  private updateHoldAmount() {
    let current = 0;
    this.tradeService.getOpenTrades().subscribe(trades => {
      trades.forEach(trade => {
        if (trade.symbol.key === this.symbol) {
          current += trade.volume;
        }
      })
      this.form.get('holdAmount').setValue(current);
    })
  }

  onSubmit() {
    if (this.form.get('tradeType').value === this.tradeTypes[0]) {
      this.doBuy();
    } else if (this.form.get('tradeType').value === this.tradeTypes[1]) {
      this.doSell();
    }
  }

  updatePrice() {
    this.stockService.getPrice(this.symbol).subscribe(value => {
      this.form.get('price').patchValue(value);
    })
  }

  private doBuy() {
    let request = new TradeRequest();
    request.symbol = this.symbol;
    request.volume = this.form.get('amount').value;
    this.tradeService.createTrade(request).subscribe(
      res => {
        this.updateHoldAmount();
        this.dialog.open(MessageboxComponent,
          {data: {message: "Der Kauf von " + this.form.get('amount').value + " Aktien wurden erfolgreich abgeschlossen."}})
      }, error => console.log(error)
    )
  }

  private doSell() {
    this.tradeService.getOpenTrades().subscribe(trades => {
      trades.forEach(trade => {
        if (trade.symbol.key === this.symbol) {
          this.tradeService.closeTrade(trade.id);
        }
      })
    })
    this.dialog.open(MessageboxComponent,
      {data: {message: "Alle Anteile wurden erfolgreich verkauft."}})
    this.updateHoldAmount();
    this.form.get('amount').setValue(0);
  }


  onTradeTypeSelectionChange(event) {
    console.log(event.value)
    if (event.value === this.tradeTypes[0]) {
      // Kaufen
      this.form.get('amount').reset();
      this.form.get('amount').enable();
    } else if (event.value === this.tradeTypes[1]) {
      // Verkaufen
      console.log("Trying to set value amount to holdAmount: " + this.form.get('holdAmount').value)
      this.form.get('amount').setValue(this.form.get('holdAmount').value);
      this.form.get('amount').disable();
    }
  }

}

