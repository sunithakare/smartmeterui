import { OutWardGroupListFeildData, WhToWhInWard, MannualSerialDetailList, whtowhinwardimportData } from './../wh-to-wh-inward-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpclientService, APIResponse, PageableResponse } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SerialNoList } from '../../display-serial-no-list/display-serial-no-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelectChange } from '@angular/material/select';

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
  selector: 'app-wh-to-wh-inward-details',
  templateUrl: './wh-to-wh-inward-details.component.html',
  styleUrls: ['./wh-to-wh-inward-details.component.css'],
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
export class WhToWhInwardDetailsComponent implements OnInit ,OnChanges{

  @Input()
  isNavigation: boolean=false;
  @Input()
  isEditable: boolean = false;
  @Input()
  detailData:whtowhinwardimportData;
  defaultCheckedMannualSerial=false;
  @Input()
  srNoValue:any;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  discomfrom:discomFromLi[] =[{name:'DVVNL'},{name:'MVVNL'}]
  sender:senderLi[]=[{name:"WH1"},{name:"WH2"},{name:"WH3"}];
  discomTo:discomToLi[]=[{name:"dm1"},{name:"dm2"},{name:"dm3"}];
  receiver:receiverLi[]=[{name:"rc1"},{name:"rc2"},{name:"rc3"}];
  ItemGroup:itemGroupLi[]=[{name:"group1"},{name:"group2"}];
  ItemNames:itemNameLi[]=[{name:"name1"},{name:"name2"}];
  Itemstatus:itemStatusLi[]=[{name:"New"},{name:"Old"}];

  whtowhinwardimportform: FormGroup;


  scannerVisiablity:boolean=false;
  mannualserialVisiability:boolean=false;
  mannualgroupVisiability:boolean=false;
  QuantityVisiability:boolean=false;
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
@Input()
  latestSrNoValue:any;

  dataFile:File;
  spinner:Boolean=false;
  selectedIndex = 0;
  totalRows= 0;
  pageSize= 15;
  currentPage= 0;
  isLoading=false;
  filtered=false;

  serialNoList: SerialNoList[];
  showSerialData:Boolean=false;
  dataSource=new  MatTableDataSource<any>();


itemNameValues:any;
itemGroup:any;
itemCategoryValues:any;
supplierValues:any;
itemGroupValues:any;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {



      this.whtowhinwardimportform=new FormGroup({
        discomFrom: new FormControl('',[Validators.required]),
        sender: new FormControl('',[Validators.required]),
        discomTo:new FormControl('',[Validators.required]),
        receiver: new FormControl('',[Validators.required]),
        dcNo:new FormControl('',[Validators.required]),
        dcDate:new FormControl('',[Validators.required]),
        inwardDate:new FormControl('',[Validators.required]),
        ginNo:new FormControl(''),
        // dispatchDate: new FormControl('',[Validators.required]),
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



     // alert(this.detailData.mannualSerialDetailList)

      var userErrorMsgFormArray=new FormArray(this.detailData.scannerDetailList.map(this.getUserErrorMsgAsForm));
  this.whtowhinwardimportform.setControl('scannerDetailList',userErrorMsgFormArray);
      this.itemGroupSelect()
      this.discomDropDownFeilds();
      this.reciverDiscomDropDownFeilds();
  }

  eleValue=[];

ngOnChanges(){

 // alert(this.detailData.mannualSerialDetailList+" data")

if(this.detailData == null && this.detailData == undefined){

  this.whtowhinwardimportform=new FormGroup({
    discomFrom: new FormControl('',[Validators.required]),
    sender: new FormControl('',[Validators.required]),
    discomTo:new FormControl('',[Validators.required]),
    receiver: new FormControl('',[Validators.required]),
    dcNo:new FormControl('',[Validators.required]),
    dcDate:new FormControl('',[Validators.required]),
    inwardDate:new FormControl('',[Validators.required]),
    ginNo:new FormControl(''),
    // dispatchDate: new FormControl('',[Validators.required]),
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
  });
}
else{

  // this.detailData.mannualSerialDetailList.forEach(ele=>{
  //   alert(ele.srNo)
  // })

  this.whtowhinwardimportform=new FormGroup({
    id: new FormControl(this.detailData.id),
    discomFrom: new FormControl(this.detailData.discomFrom),
    sender: new FormControl(this.detailData.sender,[Validators.required]),
    discomTo:new FormControl(this.detailData.discomTo,[Validators.required]),
    receiver: new FormControl(this.detailData.receiver,[Validators.required]),
    dcNo:new FormControl(this.detailData.dcNo,[Validators.required]),
    dcDate:new FormControl(this.detailData.dcDate),
    ginNo:new FormControl(this.detailData.ginNo,[]),
    // dispatchDate: new FormControl('',[Validators.required]),
    itemGroup:new FormControl(this.detailData.itemGroup,[Validators.required]),
    itemModelName: new FormControl(this.detailData.itemModelName,[Validators.required]),
    supplier: new FormControl(this.detailData.supplier,[Validators.required]),
    itemCategory: new FormControl(this.detailData.itemCategory,[Validators.required]),
    itemStatus: new FormControl(this.detailData.itemStatus,[Validators.required]),
    quantity: new FormControl(this.detailData.quantity,[Validators.required]),
    transporter: new FormControl(this.detailData.transporter,[Validators.required]),
    lrNo: new FormControl(this.detailData.lrNo,[Validators.required]),
    lrDate: new FormControl(this.detailData.lrDate,[Validators.required]),
    vehicleNo: new FormControl(this.detailData.vehicleNo,[Validators.required]),
    driverName: new FormControl(this.detailData.driverName,[Validators.required]),
    contactNo: new FormControl(this.detailData.contactNo,[Validators.required]),
    inwardDate:new FormControl(this.detailData.inwardDate),
    remark: new FormControl(this.detailData.remark),
    scannerDetailList:new FormArray([]),
        mannualSerialDetailList:new FormArray([]),
        mannualGroupDetailList:new FormArray([]),
  });


this.itemGroup=this.detailData.itemGroup;
  this.itemGroupLookUp(this.detailData.itemGroup);
  this.itemNameLookUp(this.detailData.itemModelName);

  this.findWarehouseByDiscom(this.detailData.discomFrom);
  this.findReciverWarehouseByDiscom(this.detailData.discomTo);


  // (<FormArray>this.whtowhinwardimportform.get('mannualSerialDetailList')).push(new FormGroup({srNo:new FormControl(this.detailData.mannualSerialDetailList,Validators.required)}));


  if(this.srNoValue!=null){
    this.defaultCheckedMannualSerial=true;

    (<FormArray>this.whtowhinwardimportform.get('mannualGroupDetailList')).push(new FormGroup({internalSrNo:new FormControl(this.srNoValue,Validators.required),
      latestSrNo:new FormControl(this.latestSrNoValue,Validators.required)}));



      this.datagroupSource.data = (<FormArray>this.whtowhinwardimportform.get('mannualGroupDetailList')).controls;
      this.datagroupSource.data = this.datagroupSource.data;

  // alert(this.dataSource.data)
    }
    this.dataSource.data = (<FormArray>this.whtowhinwardimportform.get('mannualSerialDetailList')).controls;
  this.dataSource.data = this.dataSource.data;

  // var userErrorMsgFormArray=new FormArray(this.detailData.scannerDetailList.map(this.getUserErrorMsgAsForm));
  // this.whtowhinwardimportform.setControl('scannerDetailList',userErrorMsgFormArray);

  // var userManualGroupFormArray=new FormArray(this.detailData.MannualGroupDetailList.map(this.getManualGroupAsForm));
  // this.whtowhinwardimportform.setControl('MannualGroupDetailList',userManualGroupFormArray);

  var userManualSerialFormArray=new FormArray(this.detailData.mannualSerialDetailList.map(this.getUserForm));

  var userManualSerialFormArray=new FormArray(this.detailData.mannualGroupDetailList.map(this.getManualGroupAsForm));

  // this.whtowhinwardimportform.setControl('mannualSerialDetailList',userManualSerialFormArray);




}
}

getUserErrorMsgAsForm(userErrorMessage:WhToWhInWard):FormGroup{
  return new FormGroup({id:new FormControl({value:userErrorMessage.id}),srNo:new FormControl({value:userErrorMessage.demo},Validators.required)
  // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
});
}

getUserForm(userErrorMessage:MannualSerialDetailList):FormGroup{

  return new FormGroup({srNo:new FormControl({value:userErrorMessage.srNo},Validators.required)
  // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
});
}

getManualSerialAsForm(userErrorMessage:WhToWhInWard):FormGroup{
  return new FormGroup({id:new FormControl({value:userErrorMessage.id})
    ,discom:new FormControl({value:userErrorMessage.demo},Validators.required)
  // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
});
}


getManualGroupAsForm(userErrorMessage:OutWardGroupListFeildData):FormGroup{
  return new FormGroup({internalSrNo:new FormControl({value:userErrorMessage.internalSrNo},Validators.required),latestSrNo:new FormControl({value:userErrorMessage.latestSrNo},)
  // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
});
}

  uploaddataFile(event: any) {
    if(event.target.files && event.target.files[0]){
      this.dataFile=event.target.files[0];
    }
  }
  saveWHtoWhinwardimportData(){
    // if(!this.whtowhinwardimportform.valid){
    //   return;
    // }
    // this.whtowhinwardimportform.getRawValue().dcDate="01-12-1991";
   // alert(this.whtowhinwardimportform.getRawValue().dcDate)
  // alert(this.whtowhinwardimportform.getRawValue().mannualGroupDetailList)
    var formData=new FormData();
      formData.append("data",new Blob([JSON.stringify(this.whtowhinwardimportform.getRawValue())], {
        type: 'application/json',
      }));
      formData.append("dataFile",this.dataFile);
          this.restClient.uploadFilePost('/inventory/warehouseInward', formData).subscribe({
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
              console.log('Data Saved');

              this.spinner = false;
            },
          });
  }

  itemGroupSelect(){
    this.restClient.get('/inventory/fetchItemGroup').subscribe({
      next:(result:any)=>{
        this.itemGroupValues=result.data;
      }
    })
  }

  // itemModelNameSelect(){
  //   this.restClient.get('/inventory/fetchItemModelName').subscribe({
  //     next:(result:any)=>{
  //       this.itemNameValues=result.data;
  //     }
  //   })
  // }

itemGroupLookUp(event:any){


    var queryParam:any={};
    if(event.value==undefined){
    queryParam['itemGroup']=event;
    this.itemGroup=event;
    }
    else{
    queryParam['itemGroup']=event.value;
    this.itemGroup=event.value;
    }
    this.restClient.getwithParam('/inventory/fetchItemModelName',queryParam).subscribe({
      next:(result:any)=>{
        this.itemNameValues=result.data;
      }
    })
  }

itemNameLookUp(event:any){

  var queryParam:any={};
  if(event.value==undefined){
    queryParam['itemModelName']=event;
  }
  else{
    queryParam['itemModelName']=event.value;
  }
  queryParam['itemGroup']=this.itemGroup;

  this.restClient.getwithParam('/inventory/lookupItemName',queryParam).subscribe({
    next:(result:any)=>{
      this.itemCategoryValues=result.data.itemCategory;
      this.supplierValues=result.data.supplier;


      this.whtowhinwardimportform.get('supplier')?.setValue(result.data.supplier)
      this.whtowhinwardimportform.get('itemCategory')?.setValue(result.data.itemCategory)
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
  }
  else{
    queryParam['discom']=value.value;
  }
  this.restClient.getwithParam(environment.BASE_URL+'/warehouse/findBydiscom',queryParam).subscribe({
    next:(result:APIResponse)=>{
     // alert(result.data);
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
  }else{
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


// navigation details to serialNoList page
 showSerialNoListDetails() {
  this.isLoading = true;
  this.filtered = false;
  var queryParams: any ={};
  queryParams['page'] = this.currentPage;
  queryParams['size'] = this.pageSize;

  this.restClient.getwithParam(environment.SHOW_SERIAL_DATA_WHTOWHINWARD_API+this.detailData.id,queryParams)
  .subscribe({
    next:(results:PageableResponse) =>{
      this.serialNoList = results.data.content as SerialNoList[];
    },
    error:(err:any) => {
      console.log(err);
      let snackBarRef = this.snackBar.open('server error' ,'close',{
        horizontalPosition:'center',
       verticalPosition:'bottom',
       duration :3000,
             });
this.spinner = false;
    },
    complete: () => {
      console.log('Serial Number List Fetch Complete');
      this.spinner =false;
    },
   });

 this.showSerialData=true;
}
showDetailsView():void{
  this.showSerialData=false;

}

addNewScanner(){
  if (!this.whtowhinwardimportform.valid) {

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

  (<FormArray>this.whtowhinwardimportform.get('scannerDetailList')).push(new FormGroup({errorCode:new FormControl('',Validators.required)}));


  this.dataSource.data = (<FormArray>this.whtowhinwardimportform.get('scannerDetailList')).controls;
  this.dataSource.data = this.dataSource.data;}
  removeScanner(i:number){
    (<FormArray>this.whtowhinwardimportform.get('scannerDetailList')).removeAt(i);
    //this.discomArray.splice(i, 1);
    this.dataSource.data = this.dataSource.data;
   // this.selectedDiscomsList.splice(i, 1);
  }
  removeScnneRow(i:number){
    (<FormArray>this.whtowhinwardimportform.get('scannerDetailList')).removeAt(i);
    //this.discomArray.splice(i, 1);
    this.dataSource.data = this.dataSource.data;
   // this.selectedDiscomsList.splice(i, 1);
  }

  addNewMannualSerial(){
    if (!this.whtowhinwardimportform.valid) {

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

    (<FormArray>this.whtowhinwardimportform.get('mannualSerialDetailList')).push(new FormGroup({srNo:new FormControl('',Validators.required)}));


    this.dataSerialSource.data = (<FormArray>this.whtowhinwardimportform.get('mannualSerialDetailList')).controls;
    this.dataSerialSource.data = this.dataSerialSource.data;
  }
    removeMannualSerial(i:number){
      (<FormArray>this.whtowhinwardimportform.get('mannualSerialDetailList')).removeAt(i);
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
      if (!this.whtowhinwardimportform.valid) {

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

      (<FormArray>this.whtowhinwardimportform.get('mannualGroupDetailList')).push(new FormGroup({internalSrNo:new FormControl('',Validators.required)
    ,latestSrNo:new FormControl('',Validators.required)}));


      this.datagroupSource.data = (<FormArray>this.whtowhinwardimportform.get('mannualGroupDetailList')).controls;
      this.datagroupSource.data = this.datagroupSource.data;}
      removeMannualGroup(i:number){
        (<FormArray>this.whtowhinwardimportform.get('mannualGroupDetailList')).removeAt(i);
        //this.discomArray.splice(i, 1);
        this.datagroupSource.data = this.datagroupSource.data;
       // this.selectedDiscomsList.splice(i, 1);
      }


  }


  export interface discomFromLi{
    name:string;
   }
   export interface senderLi{
     name:string;
   }
   export interface discomToLi{
     name:string;
   }
   export interface receiverLi{
     name:string;
   }
   export interface itemGroupLi{
     name :string;
   }
   export interface itemNameLi{
     name:string;
   }
   export interface itemStatusLi{
     name:string;
   }

