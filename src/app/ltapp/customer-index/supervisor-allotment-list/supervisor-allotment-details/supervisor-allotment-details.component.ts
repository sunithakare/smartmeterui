import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-allotment-details',
  templateUrl: './supervisor-allotment-details.component.html',
  styleUrls: ['./supervisor-allotment-details.component.css']
})
export class SupervisorAllotmentDetailsComponent implements OnInit {
  supervisorCreationForm:FormGroup;

  allocationDataTypes = [
    { name: "CI" },
    {  name: "MI" },
    {  name: "ENH" },
    { name: "O&M" }
  ];

  division =[
    { name: "Division 1" },
    {  name: "Division 2" },
    {  name: "Division 3" }
  ];
  allocation = [
    { name: "Fresh" },
    {  name: "Reallocation" },
  ]

  constructor() {

  }

  ngOnInit(): void {

  }
  savesupervisorCreation(){

  }
  savesupervisorallotment(){
    alert("save data")
  }

}
