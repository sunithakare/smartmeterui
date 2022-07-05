import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-reference-id-dialog',
  templateUrl: './show-reference-id-dialog.component.html',
  styleUrls: ['./show-reference-id-dialog.component.css']
})
export class ShowReferenceIdDialogComponent implements OnInit {

  @Input()
  message:string;

  constructor() { }

  ngOnInit(): void {
  }

}
