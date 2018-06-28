import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";


@NgModule({
  imports: [
    CommonModule],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule],
})
export class CustomMaterialModule {
}
