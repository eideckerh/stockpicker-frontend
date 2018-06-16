import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {

  symbol: string;
  form: FormGroup;
  tradeTypes: string[];

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.tradeTypes = ['Kaufen', 'Verkaufen'];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.symbol = params['symbol'];
    })
    this.form = this.fb.group({
      amount: ['', Validators.pattern('[0-9]*')],
      tradeType: ['', Validators.required],
    });
  }

  onSubmit() {

  }

}
