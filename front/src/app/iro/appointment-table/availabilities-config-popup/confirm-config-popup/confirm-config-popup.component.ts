import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-confirm-config-popup',
    templateUrl: './confirm-config-popup.component.html',
    styleUrls: ['./confirm-config-popup.component.scss']
})
export class ConfirmConfigPopupComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ConfirmConfigPopupComponent>) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
