/* Summary:
   CoreModule exists to orchestrate other modules,
   make commonly used singleton services available for use in the many other modules
*/

import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import { CoreRoutingModule } from "./core-routing.module";
import { LoggerService, BaseApiService, Globals, OnlineOfflineService } from "./services";
import { WelcomeComponent, NotFoundComponent } from "./components";

// Angular Material Anumation module
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Custom Angular Material UI Components module
import { MaterialModule } from "../material/material.module";
import { HttpClientModule } from "@angular/common/http";

// import { NavComponent } from "./nav/nav.component";
// import { SpinnerComponent } from "./spinner/spinner.component";
// import { SpinnerService } from "./spinner/spinner.service";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    // as per guide: https://material.angular.io/guide/getting-started
    // import the Angular Material modules after Angular"s BrowserModule, as the import order matters for NgModules
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  declarations: [
    WelcomeComponent,
    NotFoundComponent,
    /* NavComponent, SpinnerComponent, LoginComponent, HeaderComponent, */
  ],
  exports: [
    RouterModule, /* NavComponent, SpinnerComponent*/
    NotFoundComponent,
  ],
  providers: [
    LoggerService, /* SpinnerService */
    Globals,
    BaseApiService,
    OnlineOfflineService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
