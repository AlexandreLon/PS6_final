import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApplicantService} from '../../../../services/applicant/applicant.service';
import {Application} from '../../../../models/application';
import {Applicant} from '../../../../models/applicant';

@Component({
    selector: 'app-confirm-validation-popup',
    templateUrl: './confirm-validation-popup.component.html',
    styleUrls: ['./confirm-validation-popup.component.scss']
})
export class ConfirmValidationPopupComponent implements OnInit {

    constructor(
        public applicantService: ApplicantService,
        public dialogRef: MatDialogRef<ConfirmValidationPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Application) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    validate() {
        this.applicantService.validate(this.data.id);
    }

}
