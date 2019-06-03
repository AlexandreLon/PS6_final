import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentService} from '../../../../../../../../../../services/appointment/appointment.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Appointment} from '../../../../../../../../../../models/appointment';

@Component({
  selector: 'app-refuse-appointment-popup',
  templateUrl: './refuse-appointment-popup.component.html',
  styleUrls: ['./refuse-appointment-popup.component.scss']
})
export class RefuseAppointmentPopupComponent implements OnInit {

    constructor(
        public appointmentService: AppointmentService,
        public dialogRef: MatDialogRef<RefuseAppointmentPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Appointment) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    refuseAppointment(appointment: Appointment) {
        this.appointmentService.acceptAppointment(false, appointment);
    }

}
