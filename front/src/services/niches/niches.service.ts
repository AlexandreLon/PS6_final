import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Hour} from '../../models/hour';


@Injectable({
    providedIn: 'root'
})
export class NichesService {
    private nichesList: Hour[];
    private urlNiches = 'http://localhost:9428/api/availabilities/';

    /**
     * Observable which contains the list of applications.
     * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
     */
    public niches$: BehaviorSubject<Hour[]> = new BehaviorSubject(this.nichesList);

    constructor(private http: HttpClient) {
    }

    getNiches(timestamp): Observable<Hour[]> {
        return this.http.get<Hour[]>(this.urlNiches + timestamp);
    }


}
