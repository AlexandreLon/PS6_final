import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Availabilities } from '../../../models/availabilities';
import { AvailabilitiesConfigPopupComponent } from './availabilities-config-popup/availabilities-config-popup.component';
import { AvailabilitiesService } from 'src/services/availabilities/availabilities.service';

@Component({
    selector: 'app-appointment-table',
    templateUrl: './appointment-table.component.html',
    styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit {
    private availabilities: Availabilities;

    constructor(
        public dialog: MatDialog,
        public service: AvailabilitiesService
    ) {}

    ngOnInit() {}

    openConfigDialog(): void {
        const dialogRef = this.dialog.open(AvailabilitiesConfigPopupComponent, {
            width: '75%',
            height: '600px',
            data: this.availabilities
        });
        // This is to save modifications
        dialogRef.afterClosed().subscribe(result => {
            this.service.default();
        });
    }
}
