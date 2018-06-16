import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {LoginComponent} from "../login/login.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {AuthGuard} from "./auth/auth.guard";
import {Register} from "ts-node";
import {RegisterComponent} from "../register/register.component";
import {StockComponent} from "../stock/stock.component";
import {TradeComponent} from "../trade/trade.component";
import {AccountComponent} from "../account/account.component";
import {InvestComponent} from "../trade/invest/invest.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'trade', component: TradeComponent},
  {path: 'invest', component: InvestComponent},
  {path: 'account', component: AccountComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}

