import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-import-hes-data-details',
  templateUrl: './import-hes-data-details.component.html',
  styleUrls: ['./import-hes-data-details.component.css']
})
export class ImportHesDataDetailsComponent implements OnInit {
  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  importhesdataFeilds:FormGroup;
  qty : QtyList[]=[
    {name:'select'},
    {name:'one'}
  ]

  constructor() { }

  ngOnInit(): void {
    this.importhesdataFeilds= new FormGroup({
      qty:new FormControl('',Validators.required),
    })
  }
  saveImportHesData(){
    if(!this.importhesdataFeilds.valid){
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
