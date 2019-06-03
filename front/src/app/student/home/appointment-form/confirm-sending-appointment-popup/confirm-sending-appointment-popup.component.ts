import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Appointment} from '../../../../../models/appointment';
import {FormGroup} from '@angular/forms';
import {ApplicantService} from '../../../../../services/applicant/applicant.service';

@Component({
    selector: 'app-confirm-sending-appointment-popup',
    templateUrl: './confirm-sending-appointment-popup.component.html',
    styleUrls: ['./confirm-sending-appointment-popup.component.scss']
})
export class ConfirmSendingAppointmentPopupComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ConfirmSendingAppointmentPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormGroup
    ) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
