import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentService} from '../../../../../../../../../../services/appointment/appointment.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Appointment} from '../../../../../../../../../../models/appointment';

@Component({
  selector: 'app-cancel-appointment-popup',
  templateUrl: './cancel-appointment-popup.component.html',
  styleUrls: ['./cancel-appointment-popup.component.scss']
})
export class CancelAppointmentPopupComponent implements OnInit {

    constructor(
        public appointmentService: AppointmentService,
        public dialogRef: MatDialogRef<CancelAppointmentPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Appointment) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancelAppointment(appointment: Appointment) {
        this.appointmentService.deleteAppointment(appointment);
    }

}
