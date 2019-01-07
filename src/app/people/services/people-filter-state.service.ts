import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PeopleViewMode, IPeopleFilterState } from "../models";

declare const window: any;

@Injectable()
export class PeopleFilterStateService {
  private $filterStateChanged = new BehaviorSubject<IPeopleFilterState>(
    {
      filterString: "",
      viewMode: PeopleViewMode.Table
    });

  get filterState() {
    return this.$filterStateChanged.asObservable();
  }

  constructor() { }

  public savePeopleFilterState(filterState: IPeopleFilterState) {
    this.$filterStateChanged.next(filterState);
  }
}
