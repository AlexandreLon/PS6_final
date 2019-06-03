import { AppointmentService } from 'src/services/appointment/appointment.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
    public NUMBER_OF_HOURS = 11;
    public appointmentsId: number[] = [];

    @Input()
    dayId: number;
    @Input()
    dayName: string;

    constructor(public service: AppointmentService) {}

    ngOnInit() {
        for (let i = 0; i < this.NUMBER_OF_HOURS - 1; i++) {
            this.appointmentsId[i] = i;
        }
    }

    getDayDate(dayId): string {
        const timestamp =
            (dayId - 1) * (3600 * 24) +
            this.service.getFirstMondayOfCurrentYear();
        const months = [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ];
        return (
            new Date(timestamp * 1000).getDate() +
            ' ' +
            months[new Date(timestamp * 1000).getMonth()]
        );
    }
}
