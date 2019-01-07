import { Component, OnInit, Input } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { IPerson, IUpsertPerson } from "../../models";
import { PeopleApiService } from "../../services";
import { Globals } from "../../../core/services"; // comes from Core NgModule

@Component({
  selector: "fo-person-detail",
  templateUrl: "./person-detail.component.html",
  styleUrls: ["./person-detail.component.scss"]
})
export class PersonDetailComponent implements OnInit {
  public personId: number;
  public isBusy: boolean = false;
  public recordFound: boolean = false;
  public isViewMode: boolean = false;   // TODO: introduce enum for the record mode { Create|View|Edit } ?
  public isCreateMode: boolean = false; // TODO: introduce enum for the record mode { Create|View|Edit } ?

  // Association input properties - start
  public visible = true;
  public associationSelectable = true;
  public associationRemovable = true;
  public addAssociationOnBlur = true;
  readonly associationsSeparatorKeyCodes: number[] = [ENTER, COMMA];
  // Association input properties - end

  public personForm: FormGroup;
  public get nameField() { return this.personForm.get("name"); }
  public get placeField() { return this.personForm.get("place"); }
  public get dateField() { return this.personForm.get("date"); }
  public get associations() { return this.personForm.get("associations") as FormArray; }

  constructor(
    private globals: Globals,
    private route: ActivatedRoute,
    private location: Location,
    private peopleApiService: PeopleApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      name: ["", Validators.required],
      place: ["", Validators.required],
      // date: new FormControl({ disabled: true }), // TODO: check how to disable manual input but leave popup
      date: [""],
      note: [""],
      associations: this.formBuilder.array([]),
    });

    this.personId = +this.route.snapshot.paramMap.get("id");
    this.isCreateMode = !(!!this.personId);
    // TODO: don"t we want viewOnly mode/component?
    // this.isViewMode = !!this.id;

    if (!this.isCreateMode) {
      // View / Edit
      this.loadPersonDetails(this.personId);
    } else {
      // Create
    }
  }

  public disableFutureDates(selectedDate: Date): boolean {
    return selectedDate.getTime() <= new Date().getTime();
  }

  public addAssociation(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.addAssociationToFormArray(value.trim());
      this.personForm.markAsDirty(); // otherwise form didn"t recognize it was changed - Save button was disabled
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  public removeAssociation(index: number): void {
    if (index >= 0) {
      this.associations.removeAt(index);
      this.personForm.markAsDirty(); // otherwise form didn"t recognize it was changed - Save button was disabled
    }
  }

  public back() {
    this.location.back();
  }

  public save() {
    let formData = this.globals.deepCopy(this.personForm.value);

    const upsertPerson: IUpsertPerson = {
      name: formData["name"],
      place: formData["place"],
      date: formData["date"],
      note: formData["note"],
      associations: formData["associations"],
    }

    let action: Observable<IPerson[]>;
    if (this.isCreateMode) {
      // TODO: implement functionality
      console.log("Creating...")
      console.log(upsertPerson)
      // action = this.peopleApiService.createPerson(upsertPerson);
    } else {
      // TODO: implement functionality
      // action = this.peopleApiService.updatePerson(this.personId, upsertPerson);
      console.log("Updating...")
      console.log(upsertPerson)
    }

    // this.isBusy = true;
    // action.subscribe((people: IPerson[]) => {
    //   // TODO: redirect back to appropriate location, will this preserve component state (filter params)?
    //   this.location.back();
    // }, (error: any) => {
    //   this.isBusy = false;
    //   this.personForm.markAsPristine();
    //   // TODO: handle errors
    // })
  }

  private loadPersonDetails(id: number): void {
    this.isBusy = true;
    this.peopleApiService.getPerson(id)
      .pipe(finalize(() => {
        this.isBusy = false;
      }))
      .subscribe((person: IPerson) => {
        if (!person) {
          this.recordFound = false;
        } else {
          this.recordFound = true;

          this.updatePersonForm(person);
        }
      }, (error: any) => {
        // TODO: handle errors
      })
  }

  private addAssociationToFormArray(value: string) {
    this.associations.push(this.formBuilder.control(value));
  }

  private updatePersonForm(person: IPerson) {
    this.personForm.reset(person);
    if (person.associations) {
      person.associations.forEach(association => { this.addAssociationToFormArray(association) });
    }
  }
}
