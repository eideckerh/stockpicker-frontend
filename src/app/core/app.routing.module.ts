import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {LoginComponent} from "../login/login.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "../home/home.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
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
