import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatCardModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  imports: [
    CommonModule],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule],
})
export class CustomMaterialModule {
}
