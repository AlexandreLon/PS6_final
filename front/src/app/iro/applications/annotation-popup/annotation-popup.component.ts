import {Component, Inject, Input, OnInit} from '@angular/core';
import {ConfirmValidationPopupComponent} from '../confirm-validation-popup/confirm-validation-popup.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApplicantService} from '../../../../services/applicant/applicant.service';
import {ApplicationService} from '../../../../services/application/application.service';
import {Application} from '../../../../models/application';

@Component({
  selector: 'app-annotation-popup',
  templateUrl: './annotation-popup.component.html',
  styleUrls: ['./annotation-popup.component.scss']
})
export class AnnotationPopupComponent implements OnInit {



  constructor( public applicationService: ApplicationService,
               public dialogRef: MatDialogRef<AnnotationPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Application) {

  }
  @Input() category: string;


  ngOnInit() {
  }

    onNoClick(): void {
        this.dialogRef.close();
    }

    validate() {
         this.applicationService.annotate(this.data.id, this.data.annotation);
    }

}
