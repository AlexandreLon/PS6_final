import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '../../../../services/appointment/appointment.service';

@Component({
    selector: 'app-week-tab-list',
    templateUrl: './week-tab-list.component.html',
    styleUrls: ['./week-tab-list.component.scss']
})
export class WeekTabListComponent implements OnInit {
    private WEEK_DURATION = 604800000;

    public numberOfAwaitingAppointmentArray: number[];

    public numberOfWeeks: number[] = [];
    public selectedWeekId: number;
    private STARTING_DATE =
        this.appointmentService.getFirstMondayOfCurrentYear() * 1000;

    constructor(public appointmentService: AppointmentService) {
    }

    ngOnInit() {
        for (let i = 0; i < 52; i++) {
            this.numberOfWeeks[i] = i;
        }
        this.changeWeekId(this.getIdCurrentWeek());
        this.appointmentService.loadAwaitingAppointmentsArray();
        this.appointmentService.awaitingAppointments$.subscribe(
            array => {
                this.numberOfAwaitingAppointmentArray = array;
            }
        );
    }

    changeWeekId(weekId: number): void {
        // console.log('id selected week : ' + weekId);
        this.selectedWeekId = weekId;
        this.appointmentService.loadTwoWeeksAppointments(
            this.STARTING_DATE + this.WEEK_DURATION * this.selectedWeekId
        );
        console.log('First monday : ' + this.STARTING_DATE);
    }

    getIdCurrentWeek(): number {
        const currentTime: number = new Date().getTime();
        let time: number = this.STARTING_DATE;
        let c = 0;
        while (time < currentTime) {
            time += this.WEEK_DURATION;
            c += 1;
        }
        c = c - 1; // c = c + (c % 2) - 2
        // console.log('id current week fixed : ' + c);
        return c;
    }
}
