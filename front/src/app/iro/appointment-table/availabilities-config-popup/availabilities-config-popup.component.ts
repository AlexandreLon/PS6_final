import {Availabilities} from './../../../../models/availabilities';
import {
    Component,
    Inject,
    OnInit,
    Optional,
    HostListener
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppointmentService} from '../../../../services/appointment/appointment.service';
import {Appointment, DayName} from '../../../../models/appointment';
import {AvailabilitiesService} from '../../../../services/availabilities/availabilities.service';
import {Hour} from 'src/models/hour';
import {ConfirmAppointmentPopupComponent} from '../week-tab-list/week-tab/week/day/appointment/appointments-popup/confirm-appointment-popup/confirm-appointment-popup.component';
import {ConfirmConfigPopupComponent} from './confirm-config-popup/confirm-config-popup.component';

@Component({
    selector: 'app-availabilities-config-popup',
    templateUrl: './availabilities-config-popup.component.html',
    styleUrls: ['./availabilities-config-popup.component.scss']
})
export class AvailabilitiesConfigPopupComponent implements OnInit {
    public availabilities: Availabilities;
    public DAY_NAMES: string[] = Object.keys(DayName).map(dn => DayName[dn]);
    public days: number[] = [];
    public hours: number[] = [];
    public elementHour: string;
    public elementDay: string;
    public clickHour: string;
    public clickDay: string;
    public firstclick = false;

    constructor(
        public service: AvailabilitiesService,
        public dialogRef: MatDialogRef<AvailabilitiesConfigPopupComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: Availabilities,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.service.availabilities$.subscribe(
            availabilities => (this.availabilities = availabilities)
        );
    } // todo remove @Optional when data is provided

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        const target: HTMLElement = event.target as HTMLElement;
        const div: HTMLElement = target.parentElement.querySelector('p');
        const parent: HTMLElement = target.parentElement.parentElement;
        if (div != null && target.parentElement.id == 'row') {
            this.elementHour = div.innerHTML;
            this.elementDay = parent.querySelector('p').innerHTML;
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        const target: HTMLElement = event.target as HTMLElement;
        const div: HTMLElement = target.parentElement.querySelector('p');
        const parent: HTMLElement = target.parentElement.parentElement;

        if (!this.firstclick) {
            if (div != null && target.parentElement.id == 'row') {
                this.clickHour = div.innerHTML;
                this.clickDay = parent.querySelector('p').innerHTML;
                this.firstclick = true;
            } else {
                this.clickHour = '';
                this.clickDay = '';
                this.firstclick = false;
            }
        } else {
            if (div != null && target.parentElement.id == 'row') {
                const clickHour = div.innerHTML;
                const clickDay = parent.querySelector('p').innerHTML;

                if (
                    clickDay == this.clickDay &&
                    parseInt(clickHour, 10) >= parseInt(this.clickHour, 10)
                ) {
                    let i;
                    for (i = 0; i < this.DAY_NAMES.length; i++) {
                        if (this.DAY_NAMES[i].trim() === clickDay.trim()) {
                            break;
                        }
                    }
                    this.service.addNiche(
                        i,
                        parseInt(this.clickHour),
                        parseInt(clickHour)
                    );
                }
            }
            this.clickHour = '';
            this.clickDay = '';
            this.firstclick = false;
        }
    }

    ngOnInit() {
        for (let i = 0; i < AppointmentService.NUMBER_OF_DAYS_IN_WEEK; i++) {
            this.days[i] = i;
        }
        for (let i = 0; i < AppointmentService.NUMBER_OF_HOURS_IN_DAY; i++) {
            this.hours[i] = i + 8;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    isGray(hour, day) {
        const availabilitiesDay = this.availabilities[
            Object.keys(this.availabilities)[day]
            ];
        for (let i = 0; i < availabilitiesDay.length; i++) {
            const h: Hour = availabilitiesDay[i];
            if (hour == h.hour) {
                return true;
            }
        }
        if (
            this.clickDay == '' ||
            this.clickDay == null ||
            this.clickDay == undefined
        ) {
            return false;
        }
        if (
            this.DAY_NAMES[day].trim() === this.clickDay.trim() &&
            hour >= this.clickHour.trim() &&
            hour <= this.elementHour
        ) {
            // console.log("passe")
            return true;
        }
        return false;
    }

    delete(number) {
        this.service.remove(number);
    }

    put() {
        this.service.put();
        this.service.availabilities$.subscribe(
            () => {
            }
        );
    }

    openConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmConfigPopupComponent, {
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.put();
                this.openSnackBar();
            }
        });
    }

    openSnackBar() {
        this.snackBar.open('Les disponibilités ont été enregistrées !', 'OK', {
            duration: 4000,
        });
    }
}
