import { Component, OnInit } from '@angular/core';
import {ApplicationService} from '../../../../services/application/application.service';
import {Application} from '../../../../models/application';
import {Router} from '@angular/router';

@Component({
    selector: 'application-table',
    templateUrl: './application-table.component.html',
    styleUrls: ['./application-table.component.scss']
})
export class ApplicationTableComponent implements OnInit {

    public applicationList: Application[] = [];

    constructor(public applicationService: ApplicationService, public router: Router) {
        this.applicationService.loadApplications();
        this.applicationService.applications$.subscribe((applications) => this.applicationList = applications);
    }


    ngOnInit() {
    }

    applicationHasBeenSelected(id: number) {
        this.router.navigate(['/iro/applications/' + id]);
    }

}
