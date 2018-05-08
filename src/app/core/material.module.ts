import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule],
})
export class CustomMaterialModule {
}
