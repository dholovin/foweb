import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatChipsModule,
  MatRadioModule,
  MatDividerModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatTreeModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule, // TODO: investigate MatMomentDateModule or custom implementation
} from "@angular/material";

@NgModule({
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule,
    MatRadioModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTreeModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class MaterialModule { }
