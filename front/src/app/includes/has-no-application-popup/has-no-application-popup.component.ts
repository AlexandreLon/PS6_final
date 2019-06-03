import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-has-no-application-popup',
    templateUrl: './has-no-application-popup.component.html',
    styleUrls: ['./has-no-application-popup.component.scss']
})
export class HasNoApplicationPopupComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<HasNoApplicationPopupComponent>) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
