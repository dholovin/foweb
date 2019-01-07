import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReminderViewComponent } from "./components/reminder-view/reminder-view.component";

const routes: Routes = [
  { path: "", component: ReminderViewComponent }, // INFO: <empty> path is already within "/reminders" context
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemindersRoutingModule { }
