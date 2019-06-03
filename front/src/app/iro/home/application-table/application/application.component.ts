import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Application} from '../../../../../models/application';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {


    @Input()
    application: Application;

    @Output()
    applicationHasBeenSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }
    selectApplication(id) {
        this.applicationHasBeenSelected.emit(id);
    }

    day(timestamp) {
        const a = new Date(timestamp * 1000);
        const day = a.getDate();
        const month = a.getMonth() + 1;
        const dayS = day < 10 ? '0' + day : '' + day;
        const monthS = month < 10 ? '0' + month : '' + month;
        return dayS + '/' + monthS;
    }

}
