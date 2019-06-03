import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Appointment} from 'src/models/appointment';
import {MatDialog} from '@angular/material';
import {HasNoApplicationPopupComponent} from '../../../../includes/has-no-application-popup/has-no-application-popup.component';
import {HttpBackend, HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-appointment-line',
    templateUrl: './appointment-line.component.html',
    styleUrls: ['./appointment-line.component.scss']
})
export class AppointmentLineComponent implements OnInit {

    @Input()
    appointment: Appointment;

    @Output()
    appointmentHasBeenSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public dialog: MatDialog, private http: HttpClient) {
    }

    ngOnInit() {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(HasNoApplicationPopupComponent, {
            width: '400px',
        });
    }

    async selectApplication(id) {
        await this.http.get('http://localhost:9428/api/applicants/hasapplications/' + id).toPromise().then(e => {
            if (e) {
                this.appointmentHasBeenSelected.emit(id);
            } else {
                this.openDialog();
            }
        });
    }

    timeConverter(timestamp) {
        const a = new Date(timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    hour(timestamp) {
        const a = new Date(timestamp * 1000);
        const hour = a.getHours();
        const min = a.getMinutes();
        const hourS = hour < 10 ? '0' + hour : '' + hour;
        const minS = min < 10 ? '0' + min : '' + min;
        return hourS + ':' + minS;
    }

    day(timestamp) {
        const a = new Date(timestamp * 1000);
        const day = a.getDate();
        const month = a.getMonth() + 1;
        const dayS = day < 10 ? '0' + day : '' + day;
        const monthS = month < 10 ? '0' + month : '' + month;
        return 'Le ' + dayS + '/' + monthS;
    }

    /**
     * Returns timestamp of the end of the current, next or after the next day.
     * @param duration : 0 for today, +1 for each day after.
     */
    timestamp_end_of_day(duration) {
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return end.getTime() + duration * 24 * 3600 * 1000;
    }
}
