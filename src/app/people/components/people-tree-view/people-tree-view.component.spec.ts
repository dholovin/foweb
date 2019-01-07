import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PeopleTreeViewComponent } from "./people-tree-view.component";

describe("PeopleCardViewComponent", () => {
  let component: PeopleTreeViewComponent;
  let fixture: ComponentFixture<PeopleTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
