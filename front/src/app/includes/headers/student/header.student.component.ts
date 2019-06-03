import {Component, OnInit} from '@angular/core';
import { ApplicantService } from 'src/services/applicant/applicant.service';
import { Applicant } from 'src/models/applicant';

@Component({
    selector: 'app-student-header',
    templateUrl: './header.student.component.html',
    styleUrls: ['./header.student.component.scss']
})

export class HeaderStudentComponent implements OnInit {

    private applicant: Applicant;

    constructor(public service: ApplicantService) {
    }

    ngOnInit() {
        this.service.currentApplicant$.subscribe((applicant) => this.applicant = applicant);
    }

}
