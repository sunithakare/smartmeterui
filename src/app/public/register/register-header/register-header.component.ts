import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-header',
  templateUrl: './register-header.component.html',
  styleUrls: ['./register-header.component.css']
})
export class RegisterHeaderComponent implements OnInit {

@Input()
heading:string='';

  constructor() { }

  ngOnInit(): void {
  }

}
