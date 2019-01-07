import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { Observable, of as observableOf, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { IPerson, PersonFlatNode, PersonNode, IPeopleFilterState, PeopleViewMode } from "../../models";
import { PeopleTreeViewService, PeopleApiService, PeopleFilterStateService } from "../../services";
import { LoggerService } from "../../../core/services";
import { Router } from "@angular/router";
import { NavigationStart } from "@angular/router";

@Component({
  selector: "fo-people-tree-view",
  templateUrl: "./people-tree-view.component.html",
  styleUrls: ["./people-tree-view.component.scss"],
  providers: [PeopleTreeViewService],
})
export class PeopleTreeViewComponent implements OnInit, OnDestroy {
  @Input() public filterString: string; // TODO: could be a model if there were more filter params
  public people: IPerson[];
  public isBusy: boolean = false;

  public treeControl: FlatTreeControl<PersonFlatNode>;
  public treeFlattener: MatTreeFlattener<PersonNode, PersonFlatNode>;
  public dataSource: MatTreeFlatDataSource<PersonNode, PersonFlatNode>;

  private subscriptions: Subscription[] = [];

  private _getLevel = (node: PersonFlatNode) => node.level;
  private _isExpandable = (node: PersonFlatNode) => node.expandable;
  private _getChildren = (node: PersonNode): Observable<PersonNode[]> => observableOf(node.children);

  constructor(
    private loggerService: LoggerService,
    private peopleTreeViewService: PeopleTreeViewService,
    private peopleApiService: PeopleApiService,
    private router: Router,
    private peopleFilterStateService: PeopleFilterStateService) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<PersonFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
    // Save people filter parameters when navigating away
    this.subscriptions.push(this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          const peopleFilterState: IPeopleFilterState = {
            filterString: this.filterString,
            viewMode: PeopleViewMode.Tree,
          };

          this.peopleFilterStateService.savePeopleFilterState(peopleFilterState);
        }
      }));

    // subscribe to data source changes
    this.subscriptions.push(
      this.peopleTreeViewService.$dataChange.subscribe(data => this.dataSource.data = data)
    );

    this.isBusy = true;
    this.peopleApiService.getPeople()
      .pipe(finalize(() => {
        this.isBusy = false;
      }))
      .subscribe((people: IPerson[]) => {
        this.people = people;

        // rebuild the tree
        this.peopleTreeViewService.buildPersonTree(this.people);

        // if restored filter string - force applyFilter() 
        if (this.filterString) {
          this.applyFilter(this.filterString);
        }
      }, (error: any) => {
        // TODO: handle errors
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  public transformer = (node: PersonNode, level: number) => {
    const flatNode = new PersonFlatNode(!!node.children, level, node.association, node.id, node.name, node.place);
    // this.loggerService.log(flatNode);
    return flatNode;
  }

  public hasChild = (_: number, _nodeData: PersonFlatNode) => _nodeData.expandable;

  public applyFilter(filterValue: string) {
    this.peopleTreeViewService.buildPersonTree(this.people, filterValue.trim().toLowerCase());
  }

  public delete(id: number) {
    if (confirm("Are you sure you want to delete?")) {
      this.isBusy = true;
      this.peopleApiService.deletePerson(id)
        .pipe(finalize(() => {
          this.isBusy = false;
        }))
        .subscribe((people: IPerson[]) => {
          this.people = people;

          // rebuild the tree
          this.peopleTreeViewService.buildPersonTree(this.people);
        }, (error: any) => {
          // TODO: handle errors
        });
    }
  }
}
