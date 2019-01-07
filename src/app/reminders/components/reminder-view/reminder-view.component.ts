import { Component, OnInit } from "@angular/core";
import { Globals, OnlineOfflineService } from "../../../core/services"; // comes from Core NgModule

@Component({
  selector: "fo-reminder-view.component",
  templateUrl: "./reminder-view.component.html",
  styleUrls: ["./reminder-view.component.scss"]
})
export class ReminderViewComponent implements OnInit {

  constructor(private globals: Globals,
    private onlineOfflineService: OnlineOfflineService) { }

  ngOnInit() {
    const test = this.globals.deepCopy({ asd: "asd" });

    this.onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log("went online");
        console.log("sending all stored items");
      } else {
        console.log("went offline, storing in indexdb");
      }
    });

  }

}
