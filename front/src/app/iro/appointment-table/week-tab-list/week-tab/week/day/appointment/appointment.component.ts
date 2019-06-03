import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../../../../../../../models/appointment';
import {AppointmentService} from '../../../../../../../../services/appointment/appointment.service';
import {MatDialog} from '@angular/material';
import {AppointmentsPopupComponent} from './appointments-popup/appointments-popup.component';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
    private timeStamp: number;

    private DAY_TIMESTAMP = 86400000;
    private HOUR_TIMESTAMP = 3600000;
    private STARTING_DATE =
        this.appointmentService.getFirstMondayOfCurrentYear() * 1000;

    public appointments: Appointment[];

    @Input()
    HourId: number;
    @Input()
    AppointmentDayId: number;

    constructor(
        public appointmentService: AppointmentService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        // todo some doc here please?
        this.appointmentService.twoWeekAppointments$.subscribe(() => {
            this.timeStamp =
                this.STARTING_DATE +
                this.DAY_TIMESTAMP * (this.AppointmentDayId - 1) +
                this.HOUR_TIMESTAMP * this.HourId;
            this.appointments = this.appointmentService.getAppointmentOneHour(
                this.timeStamp
            );
            this.sortAppointmentsByDate();
        });
    }

    sortAppointmentsByDate() {
        // console.log(this.appointments.length);
        this.appointments.sort((e1, e2) => e1.starting_date - e2.starting_date);
    }

    /**
     * @return true is one of the appointments in the hour niche has its status to false.
     */
    numberOfAwaitingAppointments() {
        let counter = 0;
        for (let i = 0; i < this.appointments.length; i++) {
            if (!this.appointments[i].status) {
                counter++;
            }
        }
        return counter;
    }

    openDialog(): void {
        this.dialog.open(AppointmentsPopupComponent, {
            width: '600px',
            height: '550px',
            data: this.appointments
        });
    }

}
