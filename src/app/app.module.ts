import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "./core/material.module";
import {AppRoutingModule} from "./core/app.routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AuthGuard} from "./core/auth/auth.guard";
import {AuthService} from "./core/auth/auth.service";
import {RegisterComponent} from './register/register.component';
import {StockService} from "./stock/stock.service";
import {StockComponent} from './stock/stock.component';
import {TradeComponent} from './trade/trade.component';
import {AccountComponent} from './account/account.component';
import { InvestComponent } from './trade/invest/invest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    StockComponent,
    TradeComponent,
    AccountComponent,
    InvestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
