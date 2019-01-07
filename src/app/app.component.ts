import { Component, OnInit } from "@angular/core";
import { LoggerService } from "./core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor (private loggerService: LoggerService) {
  }

  ngOnInit() {
    this.loggerService.log("LoggerService in action");
  }
}
