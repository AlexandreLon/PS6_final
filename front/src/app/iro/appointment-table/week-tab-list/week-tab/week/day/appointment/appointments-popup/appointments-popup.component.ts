import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Appointment} from '../../../../../../../../../models/appointment';
import {HttpClient} from '@angular/common/http';
import {HasNoApplicationPopupComponent} from '../../../../../../../../includes/has-no-application-popup/has-no-application-popup.component';
import {Router} from '@angular/router';
import {AppointmentService} from '../../../../../../../../../services/appointment/appointment.service';
import {ConfirmAppointmentPopupComponent} from './confirm-appointment-popup/confirm-appointment-popup.component';
import {RefuseAppointmentPopupComponent} from './refuse-appointment-popup/refuse-appointment-popup.component';
import {CancelAppointmentPopupComponent} from "./cancel-appointement-popup/cancel-appointment-popup.component";

@Component({
    selector: 'app-appointments-popup',
    templateUrl: './appointments-popup.component.html',
    styleUrls: ['./appointments-popup.component.scss']
})
export class AppointmentsPopupComponent implements OnInit {

    selectedAppointment: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        public router: Router,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AppointmentsPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Appointment[],
        private http: HttpClient,
        public appointmentService: AppointmentService) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openNoApplicationDialog(): void {
        this.dialog.open(HasNoApplicationPopupComponent, {
            width: '400px',
        });
    }

    async accessApplications(id) {
        await this.http.get('http://localhost:9428/api/applicants/hasapplications/' + id).toPromise().then(e => {
            if (e) {
                this.appointmentHasBeenSelected(id);
                this.onNoClick();
            } else {
                this.openNoApplicationDialog();
            }
        });
    }

    appointmentHasBeenSelected(id: number) {
        this.router.navigate(['/iro/applications/' + id]);
    }

    openConfirmationDialog(accept: boolean, appointment: Appointment): void {
        if (accept) {
            const dialogRef = this.dialog.open(ConfirmAppointmentPopupComponent, {
                width: '400px',
                data: appointment
            });
            dialogRef.afterClosed().subscribe(result => {
                this.data.forEach(app => {
                    if (app.id === appointment.id) {
                        app.status = result;
                    }
                });
            });
        } else {
            const dialogRef = this.dialog.open(RefuseAppointmentPopupComponent, {
                width: '400px',
                data: appointment
            });
            dialogRef.afterClosed().subscribe(hasBeenRefused => {
                if (hasBeenRefused) {
                    this.dialogRef.close();
                }
            });
        }
    }

    openCancelDialog(appointment: Appointment): void {
        const dialogRef = this.dialog.open(CancelAppointmentPopupComponent, {
            width: '400px',
            data: appointment
        });
        dialogRef.afterClosed().subscribe(hasBeenCanceled => {
            if (hasBeenCanceled) {
                this.dialogRef.close();
            }
        });
    }
}
