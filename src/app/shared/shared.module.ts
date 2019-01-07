/* Summary:
   SharedModule is where any shared components, pipes/filters and services will go, there are no views or logic.
   It only contains components that other modules will import to use.
   Non of the services in the SharedModule will be persistent
*/

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports: [
    CommonModule,   // ngIf, ngFor, etc...
    FormsModule,    // ngModel for templates-driven forms,
    ReactiveFormsModule,
  ],
  exports: [
    // re-exporting module to modules which import SharedModule
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // other custom exports
    LoadingComponent,
  ]
})
export class SharedModule { }
