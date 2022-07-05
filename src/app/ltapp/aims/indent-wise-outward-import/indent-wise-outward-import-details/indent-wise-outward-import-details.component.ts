import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-indent-wise-outward-import-details',
  templateUrl: './indent-wise-outward-import-details.component.html',
  styleUrls: ['./indent-wise-outward-import-details.component.css']
})
export class IndentWiseOutwardImportDetailsComponent implements OnInit {
  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();


  indentWiseOutwordImportDetailsForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.indentWiseOutwordImportDetailsForm=new FormGroup({
      discom: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
    });
  }
  discom: DiscomList[]=[
    {name : "select"},
    {name : "DVVNL"},
  ]
  warehouseName: WarehouseNameList[]=[
    {name : "select"},
    {name : "sample"},
  ]

  savereturnToSupplierDetails(){
    if(!this.indentWiseOutwordImportDetailsForm.valid){
      return;
    }
    alert('Data Import..')
    this.dataSaved.emit(0);
  }

  backToList(){
    this.dataSaved.emit(0);
  }
  uploadFile(event: any){

  }
}
export interface DiscomList{
  name:string;
}
export interface WarehouseNameList{
  name:string;
}
