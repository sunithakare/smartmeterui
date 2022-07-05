import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-import-ccnb-data-details',
  templateUrl: './import-ccnb-data-details.component.html',
  styleUrls: ['./import-ccnb-data-details.component.css']
})
export class ImportCcnbDataDetailsComponent implements OnInit {

  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();

  imporCCnBDataFeilds:FormGroup;
  qty : QtyList[]=[
    {name:'select'},
    {name:'one'}
  ]

  constructor() { }

  ngOnInit(): void {
    this.imporCCnBDataFeilds= new FormGroup({
      qty:new FormControl('',Validators.required),
    })
  }
  saveImportCCnBData(){
    if(!this.imporCCnBDataFeilds.valid){
      return;
    }
    alert("Save Hes Data..");
    this.dataSaved.emit(0);
  }

  backToList(){
    this.dataSaved.emit(0);
  }
  uploadFile(event:any){

  }

}
export interface QtyList{
  name:string;
}
