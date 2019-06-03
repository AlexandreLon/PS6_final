import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './iro/home/home.component';
import {StudentComponent} from './student/home/student.component';
import {ApplicantService} from '../services/applicant/applicant.service';
import {ApplicationService} from '../services/application/application.service';
import {ApplicationTableComponent} from './iro/home/application-table/application-table.component';
import {ApplicationComponent} from './iro/home/application-table/application/application.component';
import {AppointmentLineComponent} from './iro/home/appointments/appointment-line/appointment-line.component';
import {AppointmentsComponent} from './iro/home/appointments/appointments.component';
import {AppointmentFormComponent} from './student/home/appointment-form/appointment-form.component';
import {FooterComponent} from './includes/footer/footer.component';
import {HeaderIroComponent} from './includes/headers/iro/header.iro.component';
import {HeaderStudentComponent} from './includes/headers/student/header.student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatBadgeModule, MatButtonModule,
    MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule, MatPaginatorModule,
    MatSelectModule, MatSnackBarModule, MatTableModule, MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AppointmentTableComponent} from './iro/appointment-table/appointment-table.component';
import {WeekTabListComponent} from './iro/appointment-table/week-tab-list/week-tab-list.component';
import {WeekTabComponent} from './iro/appointment-table/week-tab-list/week-tab/week-tab.component';
import {WeekComponent} from './iro/appointment-table/week-tab-list/week-tab/week/week.component';
import {DayComponent} from './iro/appointment-table/week-tab-list/week-tab/week/day/day.component';
import {AppointmentComponent} from './iro/appointment-table/week-tab-list/week-tab/week/day/appointment/appointment.component';
import {ApplicantTableComponent} from './iro/applicants/applicant-table/applicant-table.component';
import {ApplicantsComponent} from './iro/applicants/applicants.component';
import {AppointmentsPopupComponent} from './iro/appointment-table/week-tab-list/week-tab/week/day/appointment/appointments-popup/appointments-popup.component';
import {ApplicationsComponent} from './iro/applications/applications.component';
import { HasNoApplicationPopupComponent } from './includes/has-no-application-popup/has-no-application-popup.component';
import { AvailabilitiesConfigPopupComponent } from './iro/appointment-table/availabilities-config-popup/availabilities-config-popup.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PortalsComponent } from './includes/portals/portals.component';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { ConfirmAppointmentPopupComponent } from './iro/appointment-table/week-tab-list/week-tab/week/day/appointment/appointments-popup/confirm-appointment-popup/confirm-appointment-popup.component';
import { RefuseAppointmentPopupComponent } from './iro/appointment-table/week-tab-list/week-tab/week/day/appointment/appointments-popup/refuse-appointment-popup/refuse-appointment-popup.component';
import { ConfirmValidationPopupComponent } from './iro/applications/confirm-validation-popup/confirm-validation-popup.component';
import { ConfirmSendingAppointmentPopupComponent } from './student/home/appointment-form/confirm-sending-appointment-popup/confirm-sending-appointment-popup.component';
import { GradesTableComponent } from './iro/applications/grades-table/grades-table.component';
import { WishesTableComponent } from './iro/applications/wishes-table/wishes-table.component';
import { AttachmentComponent } from './iro/applications/attachment/attachment.component';
import { ConfirmConfigPopupComponent } from './iro/appointment-table/availabilities-config-popup/confirm-config-popup/confirm-config-popup.component';
import { CancelAppointmentPopupComponent } from './iro/appointment-table/week-tab-list/week-tab/week/day/appointment/appointments-popup/cancel-appointement-popup/cancel-appointment-popup.component';
import { AnnotationPopupComponent } from './iro/applications/annotation-popup/annotation-popup.component';

registerLocaleData(localeFr, 'fr');


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        StudentComponent,
        ApplicationTableComponent,
        ApplicationComponent,
        AppointmentLineComponent,
        AppointmentComponent,
        AppointmentsComponent,
        AppointmentFormComponent,
        ApplicantTableComponent,
        FooterComponent,
        HeaderIroComponent,
        HeaderStudentComponent,
        AppointmentTableComponent,
        WeekTabListComponent,
        WeekTabComponent,
        WeekComponent,
        DayComponent,
        ApplicantsComponent,
        ApplicationsComponent,
        AppointmentsPopupComponent,
        HasNoApplicationPopupComponent,
        AvailabilitiesConfigPopupComponent,
        PortalsComponent,
        ConfirmAppointmentPopupComponent,
        RefuseAppointmentPopupComponent,
        ConfirmValidationPopupComponent,
        ConfirmSendingAppointmentPopupComponent,
        GradesTableComponent,
        WishesTableComponent,
        AttachmentComponent,
        ConfirmConfigPopupComponent,
        CancelAppointmentPopupComponent,
        AnnotationPopupComponent,
    ],
    imports: [
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatBadgeModule,
        MatDividerModule,
        MatTabsModule,
        MatButtonModule,
        MatDialogModule,
        MatChipsModule,
        MatSnackBarModule,
    ],
    providers: [ApplicantService, ApplicationService, MatDatepickerModule,
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        ],
    bootstrap: [AppComponent],
    entryComponents: [
        AppointmentsPopupComponent,
        HasNoApplicationPopupComponent,
        AvailabilitiesConfigPopupComponent,
        ConfirmAppointmentPopupComponent,
        RefuseAppointmentPopupComponent,
        ConfirmValidationPopupComponent,
        ConfirmSendingAppointmentPopupComponent,
        ConfirmConfigPopupComponent,
        CancelAppointmentPopupComponent,
        AnnotationPopupComponent,
    ]
})
export class AppModule {
}
