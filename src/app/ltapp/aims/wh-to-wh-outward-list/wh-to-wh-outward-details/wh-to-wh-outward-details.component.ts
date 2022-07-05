import { environment } from './../../../../../environments/environment';
import { ItemCategory } from './../../masters/item-category-list/item-category-list.component';
import { MannualSerialDetailList } from './../../wh-to-wh-inward-list/wh-to-wh-inward-list.component';
import { OutWardGroupListFeildData } from './../wh-to-wh-outward-list.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, APIResponse } from 'src/app/services/httpclient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { WhToWhOutWard, whtowhoutwardData } from '../wh-to-wh-outward-list.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-wh-to-wh-outward-details',
  templateUrl: './wh-to-wh-outward-details.component.html',
  styleUrls: ['./wh-to-wh-outward-details.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0',display:'hidden'})),
      state('expanded', style({height: '100%'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WhToWhOutwardDetailsComponent implements OnInit ,OnChanges{

  @Input()
  isNavigation: boolean=false;
  @Input()
  isEditable: boolean = false;
  @Input()
  detailData:whtowhoutwardData;

  @Input()
  internalSrNoValue:any;
@Input()
  srNoValue:any;

  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  discomfrom:discomFromList[]=[{name:'DVVNL'},{name:'MVVNL'}]
  sender:senderList[]=[{name:"WH1"},{name:"WH2"},{name:"WH3"}];
  discomTo:discomToList[]=[{name:"dm1"},{name:"dm2"},{name:"dm3"}];
  receiver:receiverList[]=[{name:"rc1"},{name:"rc2"},{name:"rc3"}];
  ItemGroup:itemGroupList[]=[{name:"group1"},{name:"group2"}];
  ItemNames:itemNameList[]=[{name:"name1"},{name:"name2"}];
  Itemstatus:itemStatusList[]=[{name:"New"},{name:"Old"}];

  dataSerialSource=new  MatTableDataSource<any>();
  datagroupSource=new  MatTableDataSource<any>();
  displayedColumns: string[] = [
    'srNo',
    'action',
  ];

  MannualGroupColumns: string[] = [
    'internalSrNo',
    'latestSrNo',
    'action',
  ];


  discomDDValue:any;
  senderDDValue:any;
  reciverDiscomDDValue:any;
  reciverWHDDValue:any;

  defaultCheckedMannualSerial=false;

  whtowhoutwardimportform: FormGroup;

  dataFile:File;
  spinner:Boolean=false;

  itemModelNameValues:any;
itemGroup:any;
itemCategoryValues:any;
supplierValues:any;
itemGroupValues:any;
dataSource=new  MatTableDataSource<any>();

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.whtowhoutwardimportform=new FormGroup({
      discomFrom: new FormControl('',[Validators.required]),
      sender: new FormControl('',[Validators.required]),
      discomTo:new FormControl('',[Validators.required]),
      receiver: new FormControl(''),
      docNo:new FormControl('',[Validators.required]),
      docDate:new FormControl('',[Validators.required]),
      dispatchDate: new FormControl('',[Validators.required]),
      itemGroup:new FormControl('',[Validators.required]),
      itemModelName: new FormControl('',[Validators.required]),
      supplier: new FormControl('',[Validators.required]),
      itemCategory: new FormControl('',[Validators.required]),
      itemStatus: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required]),
      transporter: new FormControl('',[Validators.required]),
      lrNo: new FormControl('',[Validators.required]),
      lrDate: new FormControl('',[Validators.required]),
      vehicleNo: new FormControl('',[Validators.required ]),
      driverName: new FormControl('',[Validators.required]),
      contactNo: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
      remark: new FormControl(''),
      scannerDetailList:new FormArray([]),
      mannualSerialDetailList:new FormArray([]),
     mannualGroupDetailList:new FormArray([]),
    })

    var userErrorMsgFormArray=new FormArray(this.detailData.scannerDetailList.map(this.getUserErrorMsgAsForm));
    this.whtowhoutwardimportform.setControl('scannerDetailList',userErrorMsgFormArray);

    this.itemGroupSelect();

    this.discomDropDownFeilds();

    this.reciverDiscomDropDownFeilds();
  }



  // scannerTrue(){
  //   this.scannerVisiablity=true;
  //   this.mannualserialVisiability=false;
  //   this.mannualgroupVisiability=false;
  //   this.QuantityVisiability=false;
  // }

  // serialTrue(){
  //   this.scannerVisiablity=false;
  //   this.mannualserialVisiability=true;
  //   this.mannualgroupVisiability=false;
  //   this.QuantityVisiability=false;
  // }

  // groupTrue(){
  //   this.scannerVisiablity=false;
  //   this.mannualserialVisiability=false;
  //   this.mannualgroupVisiability=true;
  //   this.QuantityVisiability=false;
  // }

  // QuantityTrue(){
  //   this.scannerVisiablity=false;
  //   this.mannualserialVisiability=false;
  //   this.mannualgroupVisiability=false;
  //   this.QuantityVisiability=true;
  // }


   ngOnChanges(){
     if(this.detailData == null && this.detailData == undefined){
      this.whtowhoutwardimportform=new FormGroup({
        discomFrom: new FormControl('',[Validators.required]),
        sender: new FormControl('',[Validators.required]),
        discomTo:new FormControl('',[Validators.required]),
        receiver: new FormControl(''),
        docNo:new FormControl('',[Validators.required]),
        docDate:new FormControl('',[Validators.required]),
        dispatchDate: new FormControl('',[Validators.required]),
        itemGroup:new FormControl('',[Validators.required]),
        itemModelName: new FormControl('',[Validators.required]),
        supplier: new FormControl('',[Validators.required]),
        itemCategory: new FormControl('',[Validators.required]),
        itemStatus: new FormControl('',[Validators.required]),
        quantity: new FormControl('',[Validators.required]),
        transporter: new FormControl('',[Validators.required]),
        lrNo: new FormControl('',[Validators.required]),
        lrDate: new FormControl('',[Validators.required]),
        vehicleNo: new FormControl('',[Validators.required ]),
        driverName: new FormControl('',[Validators.required]),
        contactNo: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
        remark: new FormControl(''),
        scannerDetailList:new FormArray([]),
        mannualSerialDetailList:new FormArray([]),
     mannualGroupDetailList:new FormArray([]),
      })
     }else{
      this.whtowhoutwardimportform=new FormGroup({
        discomFrom: new FormControl(this.detailData.discomFrom,[Validators.required]),
        sender: new FormControl(this.detailData.sender,[Validators.required]),
        discomTo:new FormControl(this.detailData.discomTo,[Validators.required]),
        receiver: new FormControl(this.detailData.receiver,[]),
        docNo:new FormControl(this.detailData.docNo,[Validators.required]),
        docDate:new FormControl(this.detailData.docDate,[Validators.required]),
        dispatchDate: new FormControl(this.detailData.dispatchDate,[Validators.required]),
        itemGroup:new FormControl(this.detailData.itemGroup,[Validators.required]),
        itemModelName: new FormControl(this.detailData.itemModelName,[Validators.required]),
        supplier: new FormControl(this.detailData.supplier,[Validators.required]),
        itemCategory: new FormControl(this.detailData.itemCategory,[Validators.required]),
        itemStatus: new FormControl(this.detailData.itemStatus,[Validators.required]),
        quantity: new FormControl(this.detailData.quantity,[Validators.required]),
        transporter: new FormControl({value:this.detailData.transporter, disabled: !this.isEditable},[Validators.required]),
        lrNo: new FormControl({value:this.detailData.lrNo, disabled: !this.isEditable},[Validators.required]),
        lrDate: new FormControl(this.detailData.lrDate,[Validators.required]),
        vehicleNo: new FormControl({value:this.detailData.vehicleNo, disabled: !this.isEditable},[Validators.required]),
        driverName: new FormControl({value:this.detailData.driverName, disabled: !this.isEditable},[Validators.required]),
        contactNo: new FormControl({value:this.detailData.contactNo, disabled: !this.isEditable},[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        remark: new FormControl(''),
        scannerDetailList:new FormArray([]),
        mannualSerialDetailList:new FormArray([]),
        mannualGroupDetailList:new FormArray([]),
      })

this.itemGroup=this.detailData.itemGroup;

this.itemGroupLookUp(this.itemGroup);
this.itemNameLookUp(this.detailData.itemModelName);

this.findWarehouseByDiscom(this.detailData.discomFrom);

this.findReciverWarehouseByDiscom(this.detailData.discomTo);





      // alert("detailData  "+this.detailData.mannualGroupDetailList);




      // userManualGroupFormArray.getRawValue().forEach(ele=>{
        if(this.srNoValue!=null){
          this.defaultCheckedMannualSerial=true;

          (<FormArray>this.whtowhoutwardimportform.get('mannualGroupDetailList')).push(new FormGroup({internalSrNo:new FormControl(this.internalSrNoValue,Validators.required),
          latestSrNo:new FormControl(this.srNoValue,Validators.required)}));

          this.datagroupSource.data = (<FormArray>this.whtowhoutwardimportform.get('mannualGroupDetailList')).controls;
        this.datagroupSource.data = this.datagroupSource.data;
        // })
          }
      var userErrorMsgFormArray=new FormArray(this.detailData.scannerDetailList.map(this.getUserErrorMsgAsForm));
      this.whtowhoutwardimportform.setControl('scannerDetailList',userErrorMsgFormArray);

      // var userManualGroupFormArray=new FormArray(this.detailData.mannualGroupDetailList.map(this.getManualGroupAsForm));
      // this.whtowhoutwardimportform.setControl('mannualGroupDetailList',userManualGroupFormArray);

      var userManualSerialFormArray=new FormArray(this.detailData.mannualSerialDetailList.map(this.getManualSerialAsForm));
      this.whtowhoutwardimportform.setControl('mannualSerialDetailList',userManualSerialFormArray);

      var userManualGroupFormArray=new FormArray(this.detailData.mannualGroupDetailList.map(this.getManualGroupAsForm));


     }
   }

   getUserErrorMsgAsForm(userErrorMessage:WhToWhOutWard):FormGroup{
    return new FormGroup({srNo:new FormControl({value:userErrorMessage.srNo},Validators.required)
    // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
  });
  }

  getManualSerialAsForm(userErrorMessage:MannualSerialDetailList):FormGroup{
    return new FormGroup({
      srNo:new FormControl({value:userErrorMessage.srNo},Validators.required)
    // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
  });
  }


  getManualGroupAsForm(userErrorMessage:OutWardGroupListFeildData):FormGroup{
    return new FormGroup({latestSrNo:new FormControl({value:userErrorMessage.latestSrNo},Validators.required),internalSrNo:new FormControl({value:userErrorMessage.internalSrNo},)
    // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
  });
  }

  uploaddataFile(event: any) {
    if(event.target.files && event.target.files[0]){
      this.dataFile=event.target.files[0];
    }
  }

  saveWHtoWhoutwardData(){
    // if(!this.whtowhoutwardimportform.valid){
    //   return;
    // }
    var formData=new FormData();
      formData.append("data",new Blob([JSON.stringify(this.whtowhoutwardimportform.getRawValue())], {
        type: 'application/json',
      }));
      formData.append("dataFile",this.dataFile);
          this.restClient.uploadFilePost('/inventory/warehouseOutward', formData).subscribe({
            next: (result: APIResponse) => {
              let snackBarRef = this.snackBar.open(
                'Data Saved SuccessFully',
                'close',
                {
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  duration: 3000,
                }
              );

            this.dataSaved.emit(0);
            },
            error: (err: any) => {
              console.log(err);

              let snackBarRef = this.snackBar.open('Server Error', 'close', {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 3000,
              });
              this.spinner = false;
            },
            complete: () => {
              console.log('Role Saved');

              this.spinner = false;
            },
          });
  }

  itemGroupSelect(){
    this.restClient.get('/inventory/fetchItemGroup').subscribe({
      next:(result:APIResponse)=>{
        this.itemGroupValues=result.data;
      }
    })
  }

itemGroupLookUp(event:any){
  if(event.value==undefined){
    this.itemGroup=event;
  }else{
    this.itemGroup=event.value;
  }
    var queryParam:any={};
    queryParam['itemGroup']=this.itemGroup;
    this.restClient.getwithParam('/inventory/fetchItemModelName',queryParam).subscribe({
      next:(result:any)=>{
        this.itemModelNameValues=result.data;

      }
    })
  }

itemNameLookUp(event:any){



  var queryParam:any={};
  // queryParam['itemModelName']=event.value;
  if(event.value==undefined){
    queryParam['itemModelName']=event;

  }else{
    queryParam['itemModelName']=event.value;
  }
  queryParam['itemGroup']=this.itemGroup;

  this.restClient.getwithParam('/inventory/lookupItemName',queryParam).subscribe({
    next:(result:any)=>{
      this.itemCategoryValues=result.data.itemCategory;
      this.supplierValues=result.data.supplier;

      this.whtowhoutwardimportform.get('supplier')?.setValue(result.data.supplier)
      this.whtowhoutwardimportform.get('itemCategory')?.setValue(result.data.itemCategory)

    }
  })
}

discomDropDownFeilds(){
  var queryParam:any={};
  queryParam['type']='DISCOM';

  this.restClient.getwithParam(environment.FETCH_CONFIG_CODE_LIST_API,queryParam).subscribe({
    next:(result:APIResponse)=>{
     // alert(result.data);
      this.discomDDValue=result.data;
    }
  })
}

findWarehouseByDiscom(value:any){
 // alert(value.value)
  var queryParam:any={};
  if(value.value==undefined){
    queryParam['discom']=value;
  }else{
    queryParam['discom']=value.value;
  }

  this.restClient.getwithParam(environment.BASE_URL+'/warehouse/findBydiscom',queryParam).subscribe({
    next:(result:APIResponse)=>{
   //   alert(result.data);
      this.senderDDValue=result.data;
    }
  })
}

reciverDiscomDropDownFeilds(){
  var queryParam:any={};
  queryParam['type']='DISCOM';

  this.restClient.getwithParam(environment.FETCH_CONFIG_CODE_LIST_API,queryParam).subscribe({
    next:(result:APIResponse)=>{
     // alert(result.data);
      this.reciverDiscomDDValue=result.data;
    }
  })
}

findReciverWarehouseByDiscom(value:any){
 // alert(value.value)
  var queryParam:any={};
  if(value.value==undefined){
    queryParam['discom']=value;
  }
  else{
  queryParam['discom']=value.value;

  }
  this.restClient.getwithParam(environment.BASE_URL+'/warehouse/findBydiscom',queryParam).subscribe({
    next:(result:APIResponse)=>{
    //  alert(result.data);
      this.reciverWHDDValue=result.data;
    }
  })
}

  backToList(){
    this.dataSaved.emit(0);
  }

  addNewScanner(){
    if (!this.whtowhoutwardimportform.valid) {

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

    (<FormArray>this.whtowhoutwardimportform.get('scannerDetailList')).push(new FormGroup({srNo:new FormControl('',Validators.required)}));


    this.dataSource.data = (<FormArray>this.whtowhoutwardimportform.get('scannerDetailList')).controls;
    this.dataSource.data = this.dataSource.data;}
    removeScanner(i:number){
      (<FormArray>this.whtowhoutwardimportform.get('scannerDetailList')).removeAt(i);
      //this.discomArray.splice(i, 1);
      this.dataSource.data = this.dataSource.data;
     // this.selectedDiscomsList.splice(i, 1);
    }
    removeScnneRow(i:number){
      (<FormArray>this.whtowhoutwardimportform.get('scannerDetailList')).removeAt(i);
      //this.discomArray.splice(i, 1);
      this.dataSource.data = this.dataSource.data;
     // this.selectedDiscomsList.splice(i, 1);
    }

    addNewMannualSerial(){
      if (!this.whtowhoutwardimportform.valid) {

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

      (<FormArray>this.whtowhoutwardimportform.get('mannualSerialDetailList')).push(new FormGroup({srNo:new FormControl('',Validators.required)}));


      this.dataSerialSource.data = (<FormArray>this.whtowhoutwardimportform.get('mannualSerialDetailList')).controls;
      this.dataSerialSource.data = this.dataSerialSource.data;}
      removeMannualSerial(i:number){
        (<FormArray>this.whtowhoutwardimportform.get('mannualSerialDetailList')).removeAt(i);
        //this.discomArray.splice(i, 1);
        this.dataSerialSource.data = this.dataSerialSource.data;
       // this.selectedDiscomsList.splice(i, 1);
      }
      // removeMannualSerialRow(i:number){
      //   (<FormArray>this.outwardimportform.get('MannualSerialDetailList')).removeAt(i);
      //   //this.discomArray.splice(i, 1);
      //   this.dataSource.data = this.dataSource.data;
      //  // this.selectedDiscomsList.splice(i, 1);
      // }

      addNewMannualGroup(){
        if (!this.whtowhoutwardimportform.valid) {

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

        (<FormArray>this.whtowhoutwardimportform.get('mannualGroupDetailList')).push(new FormGroup({internalSrNo:new FormControl('',Validators.required),
        latestSrNo:new FormControl('',Validators.required)}));


        this.datagroupSource.data = (<FormArray>this.whtowhoutwardimportform.get('mannualGroupDetailList')).controls;
        this.datagroupSource.data = this.datagroupSource.data;}
        removeMannualGroup(i:number){

          (<FormArray>this.whtowhoutwardimportform.get('mannualGroupDetailList')).removeAt(i);

          //this.discomArray.splice(i, 1);
          this.datagroupSource.data = this.datagroupSource.data;
         // this.selectedDiscomsList.splice(i, 1);
        }

}
export interface discomFromList{
 name:string;
}
export interface senderList{
  name:string;
}
export interface discomToList{
  name:string;
}
export interface receiverList{
  name:string;
}
export interface itemGroupList{
  name :string;
}
export interface itemNameList{
  name:string;
}
export interface itemStatusList{
  name:string;
}
