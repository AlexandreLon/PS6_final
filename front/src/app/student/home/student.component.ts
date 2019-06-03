import { Component } from '@angular/core';
import {NichesService} from '../../../services/niches/niches.service';
import {ApplicantService} from '../../../services/applicant/applicant.service';
import {FormBuilder} from '@angular/forms';
import {AppointmentService} from '../../../services/appointment/appointment.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent {
    title = 'student';
    public success: boolean;
    public error: boolean;


    constructor(public appointmentService: AppointmentService) {
        this.appointmentService.success$.subscribe(success => this.success = success
        );
        this.appointmentService.error$.subscribe(error => this.error = error
        );
    }
}
