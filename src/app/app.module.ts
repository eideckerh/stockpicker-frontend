import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "./core/material.module";
import {AppRoutingModule} from "./core/app.routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AuthGuard} from "./core/auth/auth.guard";
import {AuthService} from "./core/auth/auth.service";
import {RegisterComponent} from './register/register.component';
import {StockService} from "./stock/stock.service";
import {StockComponent} from './stock/stock.component';
import {TradeComponent} from './trade/trade.component';
import {AccountComponent} from './account/account.component';
import {InvestComponent} from './trade/invest/invest.component';
import {HttpRequestInterceptor} from "./core/http.interceptor";
import {MessageboxComponent} from "./core/messagebox/messagebox.component";
import {AdminComponent} from './account/admin/admin.component';
import {UserService} from "./user/service/user.service";
import { OverviewComponent } from './account/overview/overview.component';
import { PortfolioComponent } from './account/portfolio/portfolio.component';

@NgModule({
  entryComponents: [
    MessageboxComponent
  ],
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
    InvestComponent,
    MessageboxComponent,
    AdminComponent,
    OverviewComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService, StockService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
