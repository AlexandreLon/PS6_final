import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-week-tab',
    templateUrl: './week-tab.component.html',
    styleUrls: ['./week-tab.component.scss']
})
export class WeekTabComponent implements OnInit {

    public NUMBER_OF_HOURS = 11;

    @Input()
    selectedWeekId: number;
    public hours: number[] = [];

    constructor() {
    }

    ngOnInit() {
        for (let i = 0; i < this.NUMBER_OF_HOURS; i++) {
            this.hours[i] = i + 8;
        }
    }

}
