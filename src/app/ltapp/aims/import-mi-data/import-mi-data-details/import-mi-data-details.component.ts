import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-import-mi-data-details',
  templateUrl: './import-mi-data-details.component.html',
  styleUrls: ['./import-mi-data-details.component.css']
})
export class ImportMiDataDetailsComponent implements OnInit {

  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();


  importmidataFeilds:FormGroup;

   discom: DiscomList[]=[
    {name:'select'},
     {name:'Test'},
    {name:'dvvnl'},

   ]

   warehouse: WareHouseList[]=[
     {name:'select'},
     {name:'Test'}
   ]

   subcontrator: SubContractorList[]=[
    {name:'select'},
    {name:'Test'}
  ]

  connectionType: ConnectionTypeList[]=[
    {name:'select'},
     {name:'Test'}
  ]

  constructor() { }

  ngOnInit(): void {
    this.importmidataFeilds=new FormGroup({
      discom: new FormControl('',Validators.required),
      warehouse: new FormControl('',Validators.required),
      subcontrator: new FormControl('',Validators.required),
      connectionType: new FormControl('',Validators.required),
    });
  }

  saveImportMiData(){
    if(!this.importmidataFeilds.valid){
      return;
    }
    alert("saving function clicked..!");
    this.dataSaved.emit(0);
  }

  backToList(){
    this.dataSaved.emit(0);
  }

  uploadFile(event:any){

  }

}

export interface DiscomList{
  name:string;

}

export interface WareHouseList{
  name:string;

}
export interface SubContractorList{
  name:string;

}
export interface ConnectionTypeList{
  name:string;

}
