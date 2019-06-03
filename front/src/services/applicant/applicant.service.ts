import {Applicant} from '../../models/applicant';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {Application} from '../../models/application';

export interface Number {
    number?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {
    private applicantList: Applicant[];
    private urlApplicant = 'http://localhost:9428/api/applicants/';

    private currentApplicant: Applicant;
    private sizeApplicant: number;

    public currentApplicant$: BehaviorSubject<Applicant> = new BehaviorSubject(this.currentApplicant);

    public applicant$: BehaviorSubject<Applicant[]> = new BehaviorSubject(this.applicantList);

    public sizeApplicant$: BehaviorSubject<number> = new BehaviorSubject(this.sizeApplicant);

    private size: number;

    private date_start = -1;
    private date_end = -1;
    private word = '';
    private index: number;
    private sorted = false;
    private filter_unchecked = false;

    constructor(private http: HttpClient, private router: Router) {
    }

    loadApplicant(): void {
        this.http.get<Applicant[]>(this.urlApplicant).subscribe(
            s => {
                this.applicantList = s;
                this.applicant$.next(this.applicantList);
            }
        );
    }

    getApplicant(): Observable<Applicant[]> {
        return this.http.get<Applicant[]>(this.urlApplicant);
    }

    constructArgs() {
        let args = '';
        if (this.sorted) {
            args += '&alpha=true';
        }
        if (this.filter_unchecked) {
            args += '&unchecked=true';
        }
        if (this.date_start > 0 && this.date_end > 0) {
            args += '&start=' + this.date_start + '&end=' + this.date_end;
        }
        if (this.word.length > 0) {
            args += '&word=' + this.word;
        }
        if (args.length > 0) {
            args = '?' + args.substr(1);
        }
        return args;
    }

    getPage(index, size) {
        this.index = index;
        this.size = size;
        const args = this.constructArgs();
        // const args = ""
        console.log('passe ?');
        // this.http.get<Applicant[]>('http://localhost:9428/api/applicants/page/' + size + '/' + (index + 1)).subscribe((data) => {
        //         this.applicantList = data;
        //         this.applicant$.next(data);
        //     });
        //     this.http.get<Number>('http://localhost:9428/api/applicants/number/').subscribe(data => {
        //         this.sizeApplicant = data.number;
        //         this.sizeApplicant$.next(this.sizeApplicant);
        //     });
        this.http.get<Applicant[]>('http://localhost:9428/api/applicants/sf/elements/' + size + '/' + (index + 1) + args).subscribe((data) => {
            this.applicantList = data;
            this.applicant$.next(data);
        });
        this.http.get<Number>('http://localhost:9428/api/applicants/sf/elements/number/' + args).subscribe(data => {
            this.sizeApplicant = data.number;
            this.sizeApplicant$.next(this.sizeApplicant);
        });
    }

    getApplications(applicantId): Observable<Applicant> {
        return this.http.get<Applicant>('http://localhost:9428/api/applicants/' + applicantId);
    }

    connectable(firstname, lastname) {
        this.http.post<Applicant>('http://localhost:9428/api/connection', {
            firstname: firstname,
            lastname: lastname
        }).subscribe(
            (data) => {
                console.log('success');
                this.currentApplicant = data;
                this.currentApplicant$.next(this.currentApplicant);
            },
            (err) => {
                console.log('Error');
                this.router.navigate(['/']);
            }
        );
    }

    validate(id) {
        this.http.put<Application>('http://localhost:9428/api/applications/validate/' + id, null).subscribe(app => {

        });
    }

    sort() {
        this.sorted = !this.sorted;
        this.getPage(this.index, this.size);
    }

    filter_uncheck() {
        this.filter_unchecked = !this.filter_unchecked;
        this.getPage(this.index, this.size);
    }

    filter_date(start, end) {
        this.date_start = start;
        this.date_end = end;
        this.getPage(this.index, this.size);
    }

    search(word) {
        this.word = word;
        this.getPage(this.index, this.size);
    }

    reset() {
        this.word = '';
        this.date_end = -1;
        this.date_start = -1;
        this.filter_unchecked = false;
        this.sorted = false;
        this.getPage(this.index, this.size);
    }

}
