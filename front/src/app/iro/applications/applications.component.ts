import {Component, OnInit} from '@angular/core';
import {ApplicantService} from '../../../services/applicant/applicant.service';
import {ActivatedRoute} from '@angular/router';
import {Applicant} from '../../../models/applicant';
import {ConfirmValidationPopupComponent} from './confirm-validation-popup/confirm-validation-popup.component';
import {MatDialog} from '@angular/material';
import {Application} from '../../../models/application';
import {AnnotationPopupComponent} from './annotation-popup/annotation-popup.component';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

    public applicant: Applicant;
    public currentApplicationId: number;
    public currentApplication: Application;

    constructor(private route: ActivatedRoute,
                public applicantService: ApplicantService,
                public dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.getApplications();
    }

    getApplications(): void {
        const id = +this.route.snapshot.paramMap.get('id');

        this.applicantService.getApplications(id)
            .subscribe(applicant => {
                this.applicant = applicant;
                this.currentApplicationId = this.applicant.applications[0].id;
                this.currentApplication = this.applicant.applications[0];
            });
    }

    day(timestamp) {
        const a = new Date(timestamp * 1000);
        const day = a.getDate();
        const month = a.getMonth() + 1;
        const dayS = day < 10 ? '0' + day : '' + day;
        const monthS = month < 10 ? '0' + month : '' + month;
        return dayS + '/' + monthS;
    }

    onChange() {
        this.currentApplicationId = parseInt(document.querySelector('.application_id').innerHTML);
        this.applicant.applications.forEach(e => {
            if (e.id === this.currentApplicationId) {
                this.currentApplication = e;
            }
        });
    }

    validate() {
        this.applicantService.validate(this.currentApplicationId);
    }

    isValidated() {
        let validated = false;
        this.applicant.applications.forEach(app => {
            if (app.id === this.currentApplicationId) {
                validated = !app.status;
            }
        });
        return validated;
    }

    openConfirmationDialog(): void {
        // ouvre la popup
        const dialogRef = this.dialog.open(ConfirmValidationPopupComponent, {
            width: '400px',
            data: this.currentApplication
        });
        // A la fermeture
        dialogRef.afterClosed().subscribe(result => {
            this.currentApplication.status = result;
        });
    }

    openAnnotationDialog(): void {
        // open the dialog
        const dialogRef = this.dialog.open(AnnotationPopupComponent, {
            width: '400px',
            data: this.currentApplication
        });
        // A la fermeture
        dialogRef.afterClosed().subscribe(result => {
            // this.currentApplication.annotation = result;
        });
    }

}
