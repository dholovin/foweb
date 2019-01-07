import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  // { path: 'admin', canActivate: [AuthGuardService], loadChildren: '../admin/admin.module#AdminModule' },
  { path: 'reminders', loadChildren: '../reminders/reminders.module#RemindersModule' }, // Lazy-loading example
  { path: 'people', loadChildren: '../people/people.module#PeopleModule' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
