import { Component, OnInit } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { LoggerService } from "../../../core/services";
import { PeopleViewMode, IPeopleFilterState } from "../../models";
import { PeopleFilterStateService } from "../../services";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "fo-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"]
})
export class PeopleComponent implements OnInit, OnDestroy {

  constructor(private loggerService: LoggerService,
    private peopleFilterStateService: PeopleFilterStateService) { }

  public PeopleViewMode = PeopleViewMode;
  public peopleFilterState: IPeopleFilterState;

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    // Restore people filter value when loading the page and filter value existed
    this.subscriptions.push(this.peopleFilterStateService.filterState
      .subscribe((filterState: IPeopleFilterState) => {
        this.peopleFilterState = filterState;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public changeViewMode($event: MatRadioChange) {
    // reset filterString and apply viewMode
    const peopleFilterState: IPeopleFilterState = {
      filterString: "",
      viewMode: $event.value,
    };

    this.peopleFilterStateService.savePeopleFilterState(peopleFilterState);
  }
}
