import { Availabilities } from './../../models/availabilities';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from 'src/models/appointment';
import { HttpClient } from '@angular/common/http';
import { Hour } from 'src/models/hour';

@Injectable({
    providedIn: 'root'
})
export class AvailabilitiesService {
    private availabilities: Availabilities;

    /**
     * Observable which contains the list of availabilities.
     * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
     */
    public availabilities$: BehaviorSubject<
        Availabilities
    > = new BehaviorSubject(this.availabilities);

    constructor(private http: HttpClient) {
        this.default();
    }

    addNiche(day, startHour, endHour) {
        for (let i = startHour; i <= endHour; i++) {
            let alreadyExists = false;
            const key_day = Object.keys(this.availabilities)[day];
            const h: Hour = { id: 0, hour: i, minute: 0 };

            for (let j = 0; j < this.availabilities[key_day].length; j++) {
                if (this.availabilities[key_day][j].hour == i) {
                    alreadyExists = true;
                }
            }
            if (!alreadyExists) {
                this.availabilities[key_day].push(h);
                for (let i = 0; i < 3; i++) {
                    this.availabilities[key_day].push({ id: 0, hour: h.hour, minute: i * 15 + 15 });
                }
            }
        }
        this.availabilities$.next(this.availabilities);
    }

    default() {
        this.http
            .get<Availabilities[]>('http://localhost:9428/api/availabilities')
            .subscribe(a => {
                this.availabilities = a[0];
                this.availabilities$.next(this.availabilities);
            });
    }

    put() {
        console.log('ok');
        this.http
            .put(
                'http://localhost:9428/api/availabilities',
                this.availabilities
            )
            .subscribe(() => {});
    }

    remove(number) {
        this.availabilities[Object.keys(this.availabilities)[number]] = [];
        this.availabilities$.next(this.availabilities);
    }
}
