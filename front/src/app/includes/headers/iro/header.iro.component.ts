import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iro-header',
  templateUrl: './header.iro.component.html',
  styleUrls: ['./header.iro.component.scss']
})

export class HeaderIroComponent implements OnInit {

    public href = '';
    public numberAppointement = 0;

  constructor(private router: Router, private http: HttpClient) {
    this.http.get<number>('http://localhost:9428/api/appointments/numberAfterToday').subscribe(value => this.numberAppointement = value);
  }

  ngOnInit() {
      this.href = this.href + this.router.url;
      console.log('href = ' + this.router.url);
  }

}
