import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, ConfigCode, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { SerialNoList } from '../../display-serial-no-list/display-serial-no-list.component';
import { ReturnfromsubcontractorData, SerialBasedDetailList } from '../return-from-subcontractor-list.component';

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
  selector: 'app-return-from-subcontractor-details',
  templateUrl: './return-from-subcontractor-details.component.html',
  styleUrls: ['./return-from-subcontractor-details.component.css'],
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
export class ReturnFromSubcontractorDetailsComponent implements OnInit ,OnChanges{

  @Input()
  isNavigation: boolean=false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  // discoms:discoms[] =[{name:'123'},{name:'MVVNL'}]
  // warehouseNames:warehouseNamesList[]=[{name:"WH1"},{name:"WH2"},{name:"WH3"}];
  // subcontractorTypes:subcontractorTypesList[]=[{name:"ST1"},{name:"ST2"}];
  Subcontractors:SubcontractorsList[]=[{name:"sub1"},{name:"sub2"}];
  // ItemGr:ItemGrList[]=[{name:"group1"},{name:"group2"}];
  // ItemNames:ItemNamesList[]=[{name:"name1"},{name:"name2"}];
  Itemstatus:ItemstatusList[]=[{name:"New"},{name:"Old"}];

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
  QuantityVisiability:boolean=false;

  dataSource=new  MatTableDataSource<any>();

  dataSourceSerialBased=new  MatTableDataSource<any>();

returnfromsubcontractorform: FormGroup;
@Input()
returnFromSubcontractorDetails:ReturnfromsubcontractorData;

@Input()
internalValue:any;
@Input()
latestValue:any;

itemNameValues:any;
itemGroup:any;
itemTypeValues:any;
itemMakeValues:any;
itemGroupValues:any;

SerialBasedColumns: string[]=[
  'srNo',
  // 'type',
  'remarks'
]

totalDiscomsList: ConfigCode[]= [];
    warehouseList:any;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.returnfromsubcontractorform=new FormGroup({
      discom: new FormControl('',[Validators.required]),
      warehouseName: new FormControl('',[Validators.required]),
     // subcontractorType:new FormControl('',[Validators.required]),
      subcontractor:new FormControl('',[Validators.required]),
      docNo:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      docDate:new FormControl('',[Validators.required]),
      srnNo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      srnDate:new FormControl('',[Validators.required]),
      itemGroup:new FormControl('',[Validators.required]),
      itemModelName: new FormControl('',[Validators.required]),
      itemCategory: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      supplier: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      itemStatus: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      transporter: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      lrNo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      lrDate:new FormControl('',[Validators.required]),
      vehicleNo: new FormControl('',Validators.required ,),
      // Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
      driverName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      contactNo: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
      remark: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      docUpload:new FormControl('',[Validators.required]),

      serialBasedDetailList:new FormArray([]),
    })
    this.itemGroupSelect()
    this.getAllDiscom()
    this.getWarehouseName()
  }
  uploadFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.dataFile = event.target.files[0];

    }
  }

  ngOnChanges(){
    if(this.returnFromSubcontractorDetails ==null && this.returnFromSubcontractorDetails ==undefined){
      this.returnfromsubcontractorform=new FormGroup({
        id: new FormControl('',Validators.required),
        discom: new FormControl('',Validators.required),
        warehouseName: new FormControl('',Validators.required),
        subcontractor: new FormControl('',Validators.required),
        docNo:new FormControl('',Validators.required),
        docDate:new FormControl('',Validators.required),
        itemModelName: new FormControl('',Validators.required),
        itemGroup: new FormControl('',Validators.required),
        itemCategory: new FormControl('',Validators.required),
        supplier: new FormControl('',Validators.required),
        itemStatus: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        transporter: new FormControl('',Validators.required),
        lrNo: new FormControl('',Validators.required),
        lrDate:new FormControl('',[Validators.required]),
        vehicleNo: new FormControl('',Validators.required),
        //  Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
        driverName: new FormControl('',Validators.required),
        contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
        warrantyMonth: new FormControl('',Validators.required),
        pdiDate: new FormControl('',Validators.required),
        remark: new FormControl('',Validators.required),
        docUpload:new FormControl('',[Validators.required]),

        serialBasedDetailList:new FormArray([]),
       });
    }else{

      // alert(this.returnFromSubcontractorDetails.subcontractor);
      this.returnfromsubcontractorform=new FormGroup({
        id: new FormControl(this.returnFromSubcontractorDetails.id),
        discom: new FormControl(this.returnFromSubcontractorDetails.discom,),
        warehouseName: new FormControl({value:this.returnFromSubcontractorDetails.warehouseName,disabled:this.isEditable||this.isNavigation},),
        subcontractor: new FormControl(this.returnFromSubcontractorDetails.subcontractor,),
        docNo: new FormControl(this.returnFromSubcontractorDetails.docNo,),
        docDate: new FormControl(this.returnFromSubcontractorDetails.docDate),
        srnNo: new FormControl(this.returnFromSubcontractorDetails.srnNo),
        srnDate: new FormControl(this.returnFromSubcontractorDetails.srnDate),
        itemGroup: new FormControl(this.returnFromSubcontractorDetails.itemGroup),
        itemModelName: new FormControl(this.returnFromSubcontractorDetails.itemModelName),
        itemCategory: new FormControl(this.returnFromSubcontractorDetails.itemCategory),
        supplier: new FormControl(this.returnFromSubcontractorDetails.supplier),
        itemStatus: new FormControl(this.returnFromSubcontractorDetails.itemStatus),
        quantity: new FormControl(this.returnFromSubcontractorDetails.quantity),
        transporter: new FormControl(this.returnFromSubcontractorDetails.transporter),
        lrNo: new FormControl(this.returnFromSubcontractorDetails.lrNo),
        lrDate: new FormControl(this.returnFromSubcontractorDetails.lrDate),
        vehicleNo: new FormControl(this.returnFromSubcontractorDetails.vehicleNo),
        driverName: new FormControl(this.returnFromSubcontractorDetails.driverName),
        contactNo: new FormControl(this.returnFromSubcontractorDetails.contactNo),
        remark: new FormControl(this.returnFromSubcontractorDetails.remark),
        docUpload:new FormControl(this.returnFromSubcontractorDetails.docUpload),

        serialBasedDetailList:new FormArray([]),
       });

       if(this.internalValue!=null){
        //  alert(this.latestValue);
        (<FormArray>this.returnfromsubcontractorform.get('serialBasedDetailList')).push(new FormGroup({SrNo:new FormControl(this.internalValue,Validators.required)
          ,remarks:new FormControl(this.internalValue,Validators.required)}));

        this.dataSource.data = (<FormArray>this.returnfromsubcontractorform.get('serialBasedDetailList')).controls;
              this.dataSource.data = this.dataSource.data;
        }
        var userserialBasedFormArray=new FormArray(this.returnFromSubcontractorDetails.serialBasedDetailList.map(this.getSerialBasedAsForm));
  this.returnfromsubcontractorform.setControl('serialBasedDetailList',userserialBasedFormArray);

    }
  }
  getSerialBasedAsForm(userErrorMessage:SerialBasedDetailList):FormGroup{
    alert(userErrorMessage.srNo)
    return new FormGroup({SrNo:new FormControl({value:userErrorMessage.srNo},Validators.required),remarks:new FormControl({value:userErrorMessage.remarks},)
    // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
  });
  }



  savereturnedFSData(){

    // if(!this.returnfromsubcontractorform.valid){
    //   return;
    // }

    // alert(this.returnFromSubcontractorDetails.serialBasedDetailList)

    var formData=new FormData();
      formData.append("data",new Blob([JSON.stringify(this.returnfromsubcontractorform.getRawValue())], {
        type: 'application/json',
      }));
      formData.append("dataFile",this.dataFile);
          this.restClient.uploadFilePost('/inventory/returnFromSubcontractor', formData).subscribe({
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
      next:(result:any)=>{
        this.itemGroupValues=result.data;
      }
    })
  }

itemGroupLookUp(event:MatSelectChange){
    this.itemGroup=event.value;
    var queryParam:any={};
    queryParam['itemGroup']=event.value;
    this.restClient.getwithParam('/inventory/fetchItemModelName',queryParam).subscribe({
      next:(result:any)=>{
        this.itemNameValues=result.data;
      }
    })
  }

itemModelNameLookUp(event:any){

  var queryParam:any={};
  queryParam['itemModelName']=event.value;
  queryParam['itemGroup']=this.itemGroup;

  this.restClient.getwithParam('/inventory/lookupItemName',queryParam).subscribe({
    next:(result:any)=>{
     // this.itemTypeValues=result.data.itemType;
    //  this.itemMakeValues=result.data.itemMake;
    this.returnfromsubcontractorform.get("supplier")?.setValue(result.data.supplier)
    this.returnfromsubcontractorform.get("itemCategory")?.setValue(result.data.itemCategory)
    }
  })
}

getAllDiscom(): void {
  this.spinner = true;
  var queryParams: any = {};
  queryParams['type'] = 'DISCOM';

  this.restClient
    .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
    .subscribe({
      next: (result: APIResponse) => {
        this.totalDiscomsList = result.data as ConfigCode[];
      },
      error: (err: any) => {
        console.log(err);
        this.spinner = false;
      },
      complete: () => {
        this.spinner = false;
      },
    });
}

getWarehouseName(){
  var queryParam:any={};

  this.restClient.get('/inventory/fetchWarehouseName').subscribe({
    next:(result: APIResponse)=>{
      this.warehouseList=result.data;
    },
    error: (err: any) => {
      console.log(err);
      this.spinner = false;
    },
    complete: () => {
      this.spinner = false;
    },
  });

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

  this.restClient.getwithParam(environment.SHOW_SERIAL_DATA_RETURN_FROM_SUBCONTRACTOR_API+this.returnFromSubcontractorDetails.id,queryParams)
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

addNewSerialBased(){
  if (!this.returnfromsubcontractorform.valid) {

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

  (<FormArray>this.returnfromsubcontractorform.get('serialBasedDetailList')).push(new FormGroup({srNo:new FormControl('',Validators.required),
  // internalSrNo:new FormControl('',Validators.required),
  remarks:new FormControl('',Validators.required)}));


  this.dataSource.data = (<FormArray>this.returnfromsubcontractorform.get('serialBasedDetailList')).controls;
  this.dataSource.data = this.dataSource.data;}
  removeScanner(i:number){
    (<FormArray>this.returnfromsubcontractorform.get('serialBasedDetailList')).removeAt(i);
    //this.discomArray.splice(i, 1);
    this.dataSource.data = this.dataSource.data;
   // this.selectedDiscomsList.splice(i, 1);
  }
  removeSerialBasedValues(i:number){
    (<FormArray>this.returnfromsubcontractorform.get('serialBasedDetailList')).removeAt(i);
    //this.discomArray.splice(i, 1);
    this.dataSource.data = this.dataSource.data;
   // this.selectedDiscomsList.splice(i, 1);
  }

}
export interface discoms{
name:string;
}
export interface warehouseNamesList{
  name:string;
}
// export interface subcontractorTypesList{
//   name:string;
// }
export interface SubcontractorsList{
  name:string;
}
export interface ItemGrList{
  name:string;
}
export interface ItemNamesList{
  name:string;
}
export interface ItemstatusList{
  name:string;
}
