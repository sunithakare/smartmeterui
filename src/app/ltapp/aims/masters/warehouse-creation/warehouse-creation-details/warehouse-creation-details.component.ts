import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { WarehouseItems, WarehouseListData } from '../warehouse-creation.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-warehouse-creation-details',
  templateUrl: './warehouse-creation-details.component.html',
  styleUrls: ['./warehouse-creation-details.component.css']
})
export class WarehouseCreationDetailsComponent implements OnInit ,OnChanges{
  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;

  cityValue:any;
  stateValue:any;
  discomValue:any;

  stateRawValue:any;
  discomRawValue:any;
  cityRawValue:any;

  uom : uomList[]=[
    {name:'Qty'},
    {name:'Meters'},
    {name:'Kg'},
    {name:'Sets'}
  ]

  @Input()
  warehouseList:WarehouseListData;


  displayedColumns: string[] = [
    'sNo',
    'state',
    'discom',
    'city',
    'action',
  ];

  WarehouseCreationForm: FormGroup;
  dataSource = new MatTableDataSource<any>();

  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();

  discoms:DiscomList[] = [ { name: "DVVNL" }, { name: "PVVNL" }, { name: "MVVNL" },{ name: "PUVNL" },];
  states:StateList[]=[{name:"UP"},{name:"HR"}];
  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService) { }

  ngOnInit(): void {

    this.WarehouseCreationForm = new FormGroup({
      // discom: new FormControl(''),
      warehouseName: new FormControl(''),
      // state: new FormControl(''),
      // city: new FormControl(''),
      pincode: new FormControl(''),
      uom: new FormControl(''),
      address: new FormControl(''),
      contactPerson: new FormControl(''),
      status: new FormControl('',Validators.required),
      contactNumber: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
     //contactNo: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      emailId: new FormControl('',[
        Validators.required,
        Validators.email,
      ]),
      // capacity: new FormControl('',Validators.required),
      space: new FormControl(''),
      discomDetails:new FormArray([]),
      deleteItem:new FormArray([]),

      // deleteItem:new FormArray([]),
    });



    this.fetchStateDetails();
  }
dis!:string;
cit!:string;
sta!:string;

  ngOnChanges(changes: SimpleChanges): void {



    this.WarehouseCreationForm =new FormGroup({

      srno:new FormControl(this.warehouseList.srno),
      id:new FormControl(this.warehouseList.id),
      address:new FormControl(this.warehouseList.address),
      warehouseName:new FormControl(this.warehouseList.warehouseName),
      // warehouseCode:new FormControl(this.warehouseList.warehouseCode),
      contactPerson:new FormControl(this.warehouseList.contactPerson),
      uom:new FormControl(this.warehouseList.uom),


      pincode:new FormControl(this.warehouseList.pincode),
      contactNumber:new FormControl(this.warehouseList.contactNumber),
      emailId:new FormControl(this.warehouseList.emailId),
      space:new FormControl(this.warehouseList.space),
      status:new FormControl(this.warehouseList.status),
      discomDetails:new FormArray([]),
      deleteItem:new FormArray([]),
      // deleteItem:new FormArray([]),
       });
       var itemGroupFormArray=new FormArray(this.warehouseList.discomDetails.map(this.getItemGroupListAsForm));
      //  this.WarehouseCreationForm.setControl('discomDetails',itemGroupFormArray);

       itemGroupFormArray.getRawValue().forEach(element => {
         this.dis=element.discom.value;
         this.sta=element.state;
         this.cit=element.city.value;
         this.selectDiscomByState(this.sta);
         this.selectDiscomByDiscom(this.dis);
         (<FormArray>this.WarehouseCreationForm.get('discomDetails')).push(new FormGroup({id:new FormControl(element.id.value,Validators.required),discom:new FormControl(element.discom.value,Validators.required),state:new FormControl(element.state.value,Validators.required)
           ,city:new FormControl(element.city.value,Validators.required)}));


       });
       this.dataSource.data = (<FormArray>this.WarehouseCreationForm.get('discomDetails')).controls;
             this.dataSource.data = this.dataSource.data;


     }


     getItemGroupListAsForm(itemGroup:WarehouseItems):FormGroup{

      return new FormGroup({id:new FormControl({value:itemGroup.id},Validators.required),
        state:new FormControl({value:itemGroup.state},Validators.required)
    ,discom:new FormControl({value:itemGroup.discom},Validators.required),
    city:new FormControl({value:itemGroup.city},Validators.required)})

      }






  fetchStateDetails(){



    this.restClient.get(environment.BASE_URL+'/common/discomstatelist').subscribe({
      next:(result:PageableResponse)=>{
        this.stateValue=result.data;
      }
    })
  }

  selectDiscomByState(event:any){
    var queryParam:any={};
    queryParam['state']=event.value;
    this.restClient.getwithParam(environment.BASE_URL+'/common/discominstate',queryParam).subscribe({
      next:(result:PageableResponse)=>{
        this.discomValue=result.data;
      }
    })
  }

  selectDiscomByDiscom(event:any){
    var queryParam:any={};
    queryParam['type']='CITY_UI';
    queryParam['subtype']=event.value;
    this.restClient.getwithParam(environment.BASE_URL+'/common/findcodewithsubtype',queryParam).subscribe({
      next:(result:PageableResponse)=>{
        this.cityValue=result.data;
      }
    })
  }

  saveWarehouse(){

    // var reqbody:WarehouseDetailsData={

    //   warehouseName:this.WarehouseCreationForm.getRawValue().warehouseName,
    //   contactPerson:this.WarehouseCreationForm.getRawValue().contactPerson,
    //   address:this.WarehouseCreationForm.getRawValue().address,
    //   pincode:this.WarehouseCreationForm.getRawValue().pincode,
    //   contactNumber:this.WarehouseCreationForm.getRawValue().contactNumber,
    //   emailId:this.WarehouseCreationForm.getRawValue().emailId,
    //   space:this.WarehouseCreationForm.getRawValue().space,
    //   status:this.WarehouseCreationForm.getRawValue().status,
    //   warehouseItemList:this.WarehouseCreationForm.getRawValue().warehouseItemList,

    // }
    var reqbody=this.WarehouseCreationForm.getRawValue();

let apiURL='';
if(this.isNavigation){
apiURL=environment.BASE_URL+'/AimsMastersWarehouse/saveWarehouse';
}else{
  apiURL=environment.BASE_URL+'/AimsMastersWarehouse/updateWarehouse';
}


    this.restClient.post(environment.BASE_URL+'/warehouse/',reqbody).subscribe({
      next:(result:PageableResponse)=>{
        alert('Data Saved..!')
    this.dataSaved.emit(0);

      }
    })

  }



  addNewSupplier(){
    if (!this.WarehouseCreationForm.valid) {

        let snackBarRef = this.snackBar.open(
          'Please Verify Existing Record',
          'close',
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          }
        );
        return;

    }
    (<FormArray>this.WarehouseCreationForm.get('discomDetails')).push(new FormGroup({id:new FormControl('')
      ,discom:new FormControl('',Validators.required),state:new FormControl('',Validators.required)
  ,city:new FormControl('',Validators.required)}));

    this.dataSource.data = (<FormArray>this.WarehouseCreationForm.get('discomDetails')).controls;
    this.dataSource.data = this.dataSource.data;


  }
  removeSupplier(value:any){

    (<FormArray>this.WarehouseCreationForm.get('discomDetails')).removeAt(value);
// this.warehouseList.deleteItem.push(value.value);
// alert(this.warehouseList.deleteItem)

    this.dataSource.data = this.dataSource.data;
  }

  backToList(){
    this.dataSaved.emit(0);
  }

}

export interface DiscomList{
  name: string;
}
export interface StateList{
  name:string;
}

export interface WarehouseDetailsData{
  warehouseName:string;
  contactPerson:string;
  address:string;
  pincode:string;
  contactNumber:string;
  emailId:string;
  space:string;
  status:string;
  uom:string;
  discomDetails:WareHouseDataList[];
}
export interface WareHouseDataList{
  state:string;
  discom:string;
  city:string;
}

export interface uomList{
  name:string;
}
