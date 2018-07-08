import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TradeService} from "../trade.service";
import {TradeRequest} from "../model/traderequest";

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
              private tradeService: TradeService) {
    this.tradeTypes = ['Kaufen', 'Verkaufen'];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.symbol = params['symbol'];
    })
    this.form = this.fb.group({
      amount: ['', Validators.pattern('[0-9]*')],
      tradeType: ['', Validators.required],
      price: ['wird ermittelt..'],
      holdAmount: [0, Validators.required]
    });
    this.tradeService.getOpenTrades().subscribe(trades => {
      trades.forEach(trade => {
        if (trade.symbol.key === this.symbol) {
          let current = this.form.get('holdAmount').value;
          this.form.get('holdAmount').patchValue(current + trade.volume);
        }
      })
    })
  }

  onSubmit() {
    if (this.form.get('tradeType').value === this.tradeTypes[0]) {
      let request = new TradeRequest();
      request.symbol = this.symbol;
      request.volume = this.form.get('amount').value;
      this.tradeService.createTrade(request).subscribe(
        res => console.log(res),
        error => console.log(error));
    } else {
      let request = new TradeRequest();
      // Verkaufen
    }
  }

  onPriceChange(price: number) {
    this.form.get('price').patchValue(price);
  }

}
