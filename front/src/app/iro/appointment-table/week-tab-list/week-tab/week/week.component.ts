import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../../../services/appointment/appointment.service';
import { DayName } from '../../../../../../models/appointment';

@Component({
    selector: 'app-week',
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
    public DAY_NAMES: string[] = Object.keys(DayName).map(dn => DayName[dn]);

    public days: number[] = [];
    public hours: number[] = [];

    @Input()
    weekId: number;

    constructor() {}

    ngOnInit() {
        for (let i = 0; i < AppointmentService.NUMBER_OF_DAYS_IN_WEEK; i++) {
            this.days[i] = i + 1;
        }
        for (let i = 0; i < AppointmentService.NUMBER_OF_HOURS_IN_DAY; i++) {
            this.hours[i] = i + 8;
        }
    }
}
