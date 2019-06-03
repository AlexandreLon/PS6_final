import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Appointment} from '../../../../../../../../../../models/appointment';
import {AppointmentService} from '../../../../../../../../../../services/appointment/appointment.service';

@Component({
    selector: 'app-confirm-appointment-popup',
    templateUrl: './confirm-appointment-popup.component.html',
    styleUrls: ['./confirm-appointment-popup.component.scss']
})
export class ConfirmAppointmentPopupComponent implements OnInit {

    constructor(
        public appointmentService: AppointmentService,
        public dialogRef: MatDialogRef<ConfirmAppointmentPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Appointment) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    acceptAppointment(appointment: Appointment) {
        this.appointmentService.acceptAppointment(true, appointment);
    }

}
