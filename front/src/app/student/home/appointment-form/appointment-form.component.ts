import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Appointment, AppointmentType} from '../../../../models/appointment';
import {AppointmentService} from '../../../../services/appointment/appointment.service';
import {ApplicantService} from 'src/services/applicant/applicant.service';
import {Availabilities} from '../../../../models/availabilities';
import {Hour} from '../../../../models/hour';
import {NichesService} from '../../../../services/niches/niches.service';
import {MatDatepickerInputEvent, MatDialog} from '@angular/material';
import {ConfirmSendingAppointmentPopupComponent} from './confirm-sending-appointment-popup/confirm-sending-appointment-popup.component';


@Component({
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {

    public minDate: Date;
    public maxDate: Date;

    public appointmentForm: FormGroup;
    public APPOINTMENT_LIST: string[] = Object.keys(AppointmentType).map(at => AppointmentType[at]);
    public availabilities: Availabilities;
    public niches: Hour[] = [{}];

    public arrayNiches: boolean[][] = [
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                [false, false, false, false],
                                    ];

    public selectedNiche: HTMLElement;
    public selectedHour: number;
    public selectedMin: number;


    constructor(
        public formBuilder: FormBuilder,
        public nichesService: NichesService,
        public appointmentService: AppointmentService,
        public applicantService: ApplicantService,
        public dialog: MatDialog
    ) {
        this.appointmentForm = this.formBuilder.group({
            type: [''],
            date: [''],
            hour: [''],
            minutes: [''],
            object: ['']
        });

        this.nichesService.getNiches(new Date().getTime() / 1000).subscribe((niches) => {
            this.niches = niches;
            console.log(this.niches);
        });

        this.minDate = new Date();
        const tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() + 2);
        this.maxDate = tempDate;

    }


    ngOnInit() {
        const lastname = prompt('Insérez votre nom');
        const firstname = prompt('Insérez votre prénom');
        // const lastname = 'admin';
        // const firstname = 'admin';
        this.applicantService.connectable(firstname, lastname);
        // console.log(this.APPOINTMENT_LIST);
    }

    /**
     * Build the form with and call the service to do the post request
     */
    sendAppointment() {
        const FIFTEEN_MINUTES = 900;
        const appointmentToSend: Appointment = {} as Appointment;
        const rawDate: string = this.appointmentForm.controls['date'].value;
        const date: Date = new Date(rawDate);
        date.setHours(this.selectedHour);
        date.setMinutes(this.selectedMin);
        appointmentToSend.type = this.appointmentForm.controls['type'].value;
        console.log('----------------------- ' + date);
        appointmentToSend.starting_date = (+date.getTime() / 1000) - date.getTimezoneOffset() * 60; // converts into UTC+0
        // console.log('TO SEND :: ' + appointmentToSend.starting_date);

        console.log(appointmentToSend.starting_date + FIFTEEN_MINUTES);
        console.log(appointmentToSend.starting_date);
        appointmentToSend.ending_date = (appointmentToSend.starting_date + FIFTEEN_MINUTES);
        appointmentToSend.applicant_id = this.applicantService.currentApplicant$.getValue().id;
        appointmentToSend.object = this.appointmentForm.get('object').value as string;
        appointmentToSend.status = false;
        this.appointmentService.sendAppointment(appointmentToSend);
    }

    /**
     * Fill the matrice of availabilities if the niche is available set true otherwise false
     */
    fillAvailabilities() {
        this.emptyAvailabilities();

        // For each hour : minute

        this.niches.forEach(e => {
            const indexHour = e.hour - 8;
            const indexMinute = e.minute === 0 ? 0 : e.minute / 15;
            this.arrayNiches[indexHour][indexMinute] = true;
        });
    }

    /**
     * Set all elements of the matrice of availabilities to false
     */
    emptyAvailabilities() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                this.arrayNiches[i][j] = false;
            }
        }
    }

    /**
     * Get the selected niche :
     *      - Update the selectedHour and selectedMinute variable
     *      - Add class style to the selected niche
     * @param event
     */
    nicheSelected(event) {
        if (this.selectedNiche != null) {
            this.selectedNiche.classList.remove('selected');
        }
        this.selectedNiche = event.currentTarget;
        const hourSplitted = this.selectedNiche.innerText.split('h');

        if (hourSplitted[1] === '') {
            this.selectedHour = parseInt(this.selectedNiche.innerText, 10);
            this.selectedMin = 0;
        } else {
            this.selectedHour = parseInt(hourSplitted[0], 10);
            this.selectedMin = parseInt(hourSplitted[1], 10);
        }

        this.selectedNiche.classList.add('selected');
    }

    /**
     * Datepicker method
     * @param {string} type
     * @param {MatDatepickerInputEvent<Date>} event
     */
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        const timestamp = new Date(`${event.value}`).getTime() / 1000;
        this.nichesService.getNiches(timestamp).subscribe((niches) => {
            this.niches = niches;
            this.fillAvailabilities();
        });
    }

    openConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmSendingAppointmentPopupComponent, {
            width: '400px',
            data: this.appointmentForm
        });
        dialogRef.afterClosed().subscribe(hasBeenSent => {
            if (hasBeenSent) {
                this.sendAppointment();
                location.reload();
            }
        });
    }
}
