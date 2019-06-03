import {Component, OnInit} from '@angular/core';
import {Appointment} from '../../../../models/appointment';
import {AppointmentService} from 'src/services/appointment/appointment.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

    public appointments: Appointment[] = [];

    constructor(public appointmentService: AppointmentService, public router: Router) {
        this.appointmentService.loadAppointments();
        this.appointmentService.appointments$.subscribe((applications) => this.appointments = applications);
    }

    ngOnInit() {
        console.log();
    }

    appointmentHasBeenSelected(id: number) {
        this.router.navigate(['/iro/applications/' + id]);
    }

}
