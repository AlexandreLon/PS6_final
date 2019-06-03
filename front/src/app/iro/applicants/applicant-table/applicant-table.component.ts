import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Applicant} from '../../../../models/applicant';
import {ApplicantService} from '../../../../services/applicant/applicant.service';
import {MatPaginator, PageEvent} from '@angular/material';
import {Router} from '@angular/router';


@Component({
    selector: 'app-applicant-table',
    templateUrl: './applicant-table.component.html',
    styleUrls: ['./applicant-table.component.scss']
})
export class ApplicantTableComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    public applicantList: Applicant[];
    public pageEvent: PageEvent;
    public displayedColumns = ['firstname', 'lastname', 'pathway', 'numberOfApplications', 'status'];
    public sizeApplicant: number;
    public word = '';
    public start = '';
    public end = '';

    minFilter = (d: Date): boolean => {
        return (this.end == '' && d.getTime() <= new Date().getTime()) || (d.getTime() <= new Date(this.end).getTime() && d.getTime() <= new Date().getTime());
    }


    maxFilter = (d: Date): boolean => {
        return (this.start == '' && d.getTime() <= new Date().getTime()) || (d.getTime() >= new Date(this.start).getTime() && d.getTime() <= new Date().getTime());
    }


    constructor(public applicantService: ApplicantService, public router: Router) {
        this.applicantService.applicant$.subscribe((applicants) => this.applicantList = applicants);
        this.applicantService.sizeApplicant$.subscribe((size) => this.sizeApplicant = size);
        this.applicantService.getPage(0, 10);
    }


    ngOnInit() {
        this.reset();
    }

    getNumberOfAwaitingApplications(applicant: Applicant) {
        let counter = 0;
        for (let i = 0; i < applicant.applications.length; i++) {
            if (!applicant.applications[i].status) {
                counter++;
            }
        }
        return counter;
    }

    ngAfterViewInit(): void {
        this.paginator.page.subscribe(data => this.applicantList = data);
    }

    onChange() {
        this.applicantService.getPage(this.pageEvent.pageIndex, this.pageEvent.pageSize);
    }

    onRowClicked(row) {
        this.router.navigate(['/iro/applications/' + row.id]);
    }

    sort() {
        this.applicantService.sort();
    }

    filter_unchecked() {
        this.applicantService.filter_uncheck();
    }

    filter_date() {
        this.applicantService.filter_date(new Date(this.start).getTime() / 1000, new Date(this.end).getTime() / 1000);
    }

    search() {
        this.applicantService.search(this.word);
    }

    reset() {
        this.word = '';
        this.start = '';
        this.end = '';
        this.applicantService.reset();
    }
}

