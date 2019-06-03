import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/home/student.component';
import {HomeComponent} from './iro/home/home.component';
import {ApplicantTableComponent} from './iro/applicants/applicant-table/applicant-table.component';
import {AppointmentTableComponent} from './iro/appointment-table/appointment-table.component';
import {ApplicantsComponent} from './iro/applicants/applicants.component';
import {ApplicationComponent} from './iro/home/application-table/application/application.component';
import {ApplicationsComponent} from './iro/applications/applications.component';
import { PortalsComponent } from './includes/portals/portals.component';

const routes: Routes = [
    {path : 'student', component: StudentComponent},
    {path : 'iro', component: HomeComponent},
    {path : 'iro/applicants', component: ApplicantsComponent},
    {path : 'iro/appointments', component: AppointmentTableComponent},
    {path : 'iro/applications/:id', component: ApplicationsComponent},
    { path: '', component: PortalsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
