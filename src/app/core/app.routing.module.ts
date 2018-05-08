import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "../user/user.component";
import {LoginComponent} from "../login/login.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
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
