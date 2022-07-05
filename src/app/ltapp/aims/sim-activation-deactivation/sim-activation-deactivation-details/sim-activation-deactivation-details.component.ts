import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sim-activation-deactivation-details',
  templateUrl: './sim-activation-deactivation-details.component.html',
  styleUrls: ['./sim-activation-deactivation-details.component.css']
})
export class SimActivationDeactivationDetailsComponent implements OnInit {
  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();

  simActivationDeactivationForm: FormGroup;

discoms:DiscomList[] = [ { name: "DVVNL" }, { name: "PVVNL" }, { name: "MVVNL" },{ name: "PUVNL" },];
warehouses:WarehouseList[]=[{name:"warehouse1"},{name:"warehouse2"}];

  constructor() { }

  ngOnInit(): void {
    this.simActivationDeactivationForm = new FormGroup({
      discom: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
      activationDeactivationDate: new FormControl('',Validators.required),
      qty: new FormControl('',Validators.required),
      remark: new FormControl('',Validators.required),
    });
  }

  saveSimActivationDeactivation(){
    if(!this.simActivationDeactivationForm.valid){
      return;
    }
    alert('Data Imported..!')
    this.dataSaved.emit(0);
  }

  backToList(){
    this.dataSaved.emit(0);
  }

  uploadFile(event: any) {}
}

export interface DiscomList{
  name: string;
}
export interface WarehouseList{
  name:string;
}
