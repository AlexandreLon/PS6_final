import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../../../../models/attachment';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Input() attachment: Attachment;
  constructor() { }

  ngOnInit() {
  }

}
