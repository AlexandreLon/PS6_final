import {Component, Input, OnInit} from '@angular/core';
import {Grade} from '../../../../models/grade';

@Component({
  selector: 'app-grades-table',
  templateUrl: './grades-table.component.html',
  styleUrls: ['./grades-table.component.scss']
})
export class GradesTableComponent implements OnInit {

    @Input() grades: Grade[];


    constructor() { }

  ngOnInit() {
  }

}
