import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-pubic',
  templateUrl: './pubic.component.html',
  styleUrls: ['./pubic.component.css']
})
export class PubicComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
// openloginModal(){
//  this.dialog.open(LoginComponent);

// }
}
