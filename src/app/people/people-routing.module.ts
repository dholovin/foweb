import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PeopleComponent } from "./components/people/people.component";
import { PersonDetailComponent } from "./components/person-detail/person-detail.component";

const routes: Routes = [
  { path: "", component: PeopleComponent },
  { path: ":id", component: PersonDetailComponent },
  { path: "create", component: PersonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
