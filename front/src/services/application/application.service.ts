import {Injectable} from '@angular/core';
import {Application} from '../../models/application';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private applicationList: Application[];
    private urlApplications = 'http://localhost:9428/api/applications/';

    /**
     * Observable which contains the list of applications.
     * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
     */
    public applications$: BehaviorSubject<Application[]> = new BehaviorSubject(this.applicationList);

    constructor(private http: HttpClient) {
    }

    loadApplications(): void {
        this.http.get<Application[]>(this.urlApplications + '/last/5').subscribe(
            s => {
                this.applicationList = s.splice(0, 5);
                this.applications$.next(this.applicationList);
                console.log();
            }
        );
    }

    annotate(id, text) {
        this.http.put<Application>('http://localhost:9428/api/applications/annotate/' + id, {'text' : text}).subscribe(app => {

        });
    }

}
