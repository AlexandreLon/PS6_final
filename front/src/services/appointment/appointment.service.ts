import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Appointment} from 'src/models/appointment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    public static NUMBER_OF_DAYS_IN_WEEK = 5;
    public static NUMBER_OF_HOURS_IN_DAY = 10;

    private HOUR_TIMESTAMP = 3600;
    private appointmentList: Appointment[];
    private appointmentsOfTwoWeeksList: Appointment[] = [];
    private week_id: number;
    private urlAppointment = 'http://localhost:9428/api/appointments/';
    private success: boolean;
    private error: boolean;
    private awaitingAppointments: number[];

    /**
     * Observable which contains the list of applications.
     * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
     */
    public appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject(
        this.appointmentList
    );
    public awaitingAppointments$: BehaviorSubject<number[]> = new BehaviorSubject(
        this.awaitingAppointments
    );
    public success$: BehaviorSubject<boolean> = new BehaviorSubject(
        this.success
    );
    public error$: BehaviorSubject<boolean> = new BehaviorSubject(
        this.error
    );
    public twoWeekAppointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject(this.appointmentsOfTwoWeeksList);
    private timeStampStartOfTwoWeeks: number;

    constructor(private http: HttpClient) {
    }

    updateAppointment(appointment: Appointment) {
        console.log(appointment);
        this.http.put(this.urlAppointment + appointment.id, appointment).subscribe(() => {
            this.loadAppointments();
            this.loadTwoWeeksAppointments(this.timeStampStartOfTwoWeeks);
            this.loadAwaitingAppointmentsArray();
        });
    }

    deleteAppointment(appointment: Appointment) {
        this.http.delete(this.urlAppointment + appointment.id).subscribe(() => {
            this.loadAppointments();
            this.loadTwoWeeksAppointments(this.timeStampStartOfTwoWeeks);
            this.loadAwaitingAppointmentsArray();
        });
    }

    getAppointmentOneHour(timeStamp: number): Appointment[] {
        // console.log('longueur liste: ' + this.appointmentsOfTwoWeeksList.length);
        // console.log('getting rdv: ' + timeStamp / 1000);
        // console.log(timeStamp / 1000 >= timeStamp / 1000);
        // console.log(timeStamp / 1000 < timeStamp / 1000 + this.HOUR_TIMESTAMP);
        // console.log((timeStamp / 1000 >= timeStamp / 1000) && (timeStamp / 1000 < timeStamp / 1000 + this.HOUR_TIMESTAMP));
        return this.appointmentsOfTwoWeeksList.filter(
            s =>
                s.starting_date >= timeStamp / 1000 &&
                s.starting_date < timeStamp / 1000 + this.HOUR_TIMESTAMP
        );
    }

    loadAwaitingAppointmentsArray(): void {
        this.http.get<number[]>(this.urlAppointment + 'arrayAwaiting').subscribe(array => {
            this.awaitingAppointments = array;
            this.awaitingAppointments$.next(this.awaitingAppointments);
        });
    }

    loadTwoWeeksAppointments(timeStamp: number): void {
        this.timeStampStartOfTwoWeeks = timeStamp;
// console.log('getting appointments from timestamp ' + timeStamp / 1000 + ' to timestamp ' + (timeStamp / 1000 + (604800 * 2)));
        this.http
            .get<Appointment[]>(
                this.urlAppointment + 'week/' + timeStamp / 1000
            )
            .subscribe(s => {
                this.appointmentsOfTwoWeeksList = s;
                // console.log(s);
                this.twoWeekAppointments$.next(this.appointmentsOfTwoWeeksList);
            });
    }

    loadAppointments(): void {
        this.http
            .get<Appointment[]>(this.urlAppointment + '/next/5')
            .subscribe(s => {
                this.appointmentList = s.splice(0, 5);
                this.appointments$.next(this.appointmentList);
            });
    }

    sendAppointment(appointment: Appointment) {
        this.http
            .post<Appointment>(this.urlAppointment, appointment)
            .subscribe(data => {
                    this.success = true;
                    this.success$.next(this.success);
                    this.error = false;
                    this.error$.next(this.error);
                },


                (error: HttpErrorResponse) => {
                    console.log('error');
                    this.error = true;
                    this.error$.next(this.error);
                    this.success = false;
                    this.success$.next(this.success);

                }
            );
    }

    acceptAppointment(acceptAppointment: boolean, appointment: Appointment) {
        if (acceptAppointment) {
            const newAppointment: Appointment = {} as Appointment;
            newAppointment.status = true;
            newAppointment.id = appointment.id;
            newAppointment.starting_date = appointment.starting_date;
            newAppointment.ending_date = appointment.ending_date;
            newAppointment.type = appointment.type;
            newAppointment.applicant_id = appointment.applicant_id;
            newAppointment.object = appointment.object;

            this.updateAppointment(newAppointment);
        } else {
            this.deleteAppointment(appointment);
        }
    }

// TODO replace date.getDay() > 1 by != 1 to be accurate
    getFirstMondayOfCurrentYear() {
        const year = new Date().getFullYear();
        let date: Date = new Date(year, 0, 1);
        for (
            let i = 0;
            date.getDay() > 1 && i < 14;
            i++, date = new Date(year, 0, i + 1)
        ) {
        }
        return date.getTime() / 1000;
    }
}
