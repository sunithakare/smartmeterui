import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { MannualSerialDetailList, OutwadImportData, OutWardGroupListFeildData, OutWardListFeildData } from '../outward-import-list.component';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};
@Component({
  selector: 'app-outward-import-details',
  templateUrl: './outward-import-details.component.html',
  styleUrls: ['./outward-import-details.component.css'],
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
export class OutwardImportDetailsComponent implements OnInit {
@Input()
  isNavigation: boolean=false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();


  displayedColumns: string[] = [
    'srNo',
    'action',
  ];

  MannualGroupColumns: string[] = [
    'internalSrNo',
    'latestSrNo',
    'action',
  ];


  // discoms:discomsList[] = [
  //   { name: "123" },
  //   {  name: "PVNL" },
  //   { name: "MVVNL" },
  //   {  name: "PVVNL" }
  // ];
  // warehouseNames:warehouseNamesList[]=[{name:"WH1"},{name:"WH2"},{name:"WH3"}];
  subcontractorTypes:subcontractorTypesList[]=[{name:"ST1"},{name:"ST2"}];
  Subcontractors:SubcontractorsList[]=[{name:"sub1"},{name:"sub2"}];
  //ItemGr:ItemGrList[]=[{name:"group1"},{name:"group2"}];
  // ItemNames:ItemNamesList[]=[{name:"name1"},{name:"name2"}];
  Itemstatus:ItemstatusList[]=[{name:"New"},{name:"Old"}]

  dataFile:File;

  @Input()
  isChecked:boolean=false;

  scannerVisiablity:boolean=false;
  mannualserialVisiability:boolean=false;
  mannualgroupVisiability:boolean=false;
  QuantityVisiability:boolean=false;


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
  datagroupSource=new  MatTableDataSource<any>();
  dataSerialSource=new MatTableDataSource<any>();
   outwardimportform: FormGroup;
   @Input()
   outwardImportDetails:OutwadImportData;

   @Input()
   srNoValue:any;

   @Input()
   internalValue:any;
   @Input()
   latestValue:any;

    itemModelNameValues:any;
    itemGroup:any;
    // itemModelName:any;
    itemCategoryValues:any;
    itemSupplierValues:any;
    itemGroupValues:any;

    totalDiscomsList: ConfigCode[]= [];
    warehouseList:any;

  constructor(
    private snackBar: MatSnackBar,
  private restClient: HttpclientService,
  private authservice: AuthService
  ) {

  }
  submit() {
    console.log("Form Submitted")
    console.log(this.outwardimportform.value)
  }

  ngOnInit(): void {

    this.outwardimportform=new FormGroup({
      // id: new FormControl('',Validators.required),
      discom: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
      subcontractor: new FormControl('',Validators.required),
      subcontractorType: new FormControl('',Validators.required),
      indentNo: new FormControl('',Validators.required),
      indentDate: new FormControl('',Validators.required),
      dispatchDate:new FormControl('',Validators.required),
      itemGroup: new FormControl('',Validators.required),
      itemModelName: new FormControl('',Validators.required),
      supplier: new FormControl('',Validators.required),
      itemCategory: new FormControl('',Validators.required),
      itemStatus: new FormControl('',Validators.required),
      vehicleNo: new FormControl('',Validators.required),
      //  Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
      contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
      viewDocument: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      transporter: new FormControl('',Validators.required),
      lrNo: new FormControl('',Validators.required),
      lrDate: new FormControl('',Validators.required),
      driverName:new FormControl('',Validators.required),
     // pdiDate: new FormControl('',Validators.required),
      reqQty: new FormControl('',Validators.required),
      appQty: new FormControl('',Validators.required),
      disQty: new FormControl('',Validators.required),
      remark: new FormControl('',Validators.required),
     scannerDetailList:new FormArray([]),
     mannualSerialDetailList:new FormArray([]),
     mannualGroupDetailList:new FormArray([]),

    })

    this. itemGroupSelect()
    this.getAllDiscom()
    this.getWarehouseName()

  }
  uploadFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.dataFile = event.target.files[0];

    }
  }

  // scannerTrue(){
  //   this.scannerVisiablity=true;
  //   this.mannualserialVisiability=false;
  //   this.mannualgroupVisiability=false;
  //   this.QuantityVisiability=false;
  // }

  // itemMName:any;
  ngOnChanges() {

    this.itemGroup=this.outwardImportDetails.itemGroup;
      // alert(this.outwardImportDetails.itemGroup+ " rrr")
    this.itemGroupLookUp(this.itemGroup)

    this.itemModelNameLookUp(this.outwardImportDetails.itemModelName)

    if(this.outwardImportDetails ==null && this.outwardImportDetails ==undefined){
      this.outwardimportform=new FormGroup({
        // id: new FormControl('',Validators.required),
        discom: new FormControl('',Validators.required),
        warehouseName: new FormControl('',Validators.required),
        subcontractor: new FormControl('',Validators.required),
        subcontractorType: new FormControl('',Validators.required),
        indentNo: new FormControl('',Validators.required),
        indentDate: new FormControl('',Validators.required),
        dispatchDate:new FormControl('',Validators.required),
        itemGroup: new FormControl('',Validators.required),
        itemModelName: new FormControl('',Validators.required),
        supplier: new FormControl('',Validators.required),
        itemCategory: new FormControl('',Validators.required),
        itemStatus: new FormControl('',Validators.required),
        vehicleNo: new FormControl('',Validators.required),
          //  Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
        contactNo: new FormControl('',[Validators.required]),
        viewDocument: new FormControl('',Validators.required),
        remark: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        transporter:new FormControl('',Validators.required),
        lrNo: new FormControl('',Validators.required),
        lrDate: new FormControl('',Validators.required),
        driverName:new FormControl('',Validators.required),
        reqQty: new FormControl('',Validators.required),
        appQty: new FormControl('',Validators.required),
        disQty: new FormControl('',Validators.required),
       scannerDetailList:new FormArray([]),
       mannualSerialDetailList:new FormArray([]),
       mannualGroupDetailList:new FormArray([]),
       });
    }else{


      this.outwardimportform=new FormGroup({
        // id: new FormControl(this.outwardImportDetails.id),
        discom: new FormControl(this.outwardImportDetails.discom),
        warehouseName: new FormControl({value:this.outwardImportDetails.warehouseName,disabled:this.isEditable||this.isNavigation}),
        subcontractor: new FormControl(this.outwardImportDetails.subcontractor),
        subcontractorType: new FormControl(this.outwardImportDetails.subcontractorType),
        indentNo: new FormControl(this.outwardImportDetails.indentNo),
        indentDate: new FormControl(this.outwardImportDetails.indentDate),
        dispatchDate: new FormControl(this.outwardImportDetails.dispatchDate),
        itemGroup: new FormControl(this.outwardImportDetails.itemGroup),
        itemModelName: new FormControl(this.outwardImportDetails.itemModelName),
        supplier: new FormControl(this.outwardImportDetails.supplier),
        contactNo: new FormControl(this.outwardImportDetails.contactNo,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
        itemCategory: new FormControl(this.outwardImportDetails.itemCategory),
        itemStatus: new FormControl(this.outwardImportDetails.itemStatus),
        vehicleNo: new FormControl(this.outwardImportDetails.vehicleNo),
        driverName:new FormControl(this.outwardImportDetails.driverName),
        remark:new FormControl(this.outwardImportDetails.remark),
        quantity:new FormControl(this.outwardImportDetails.quantity),
        transporter:new FormControl(this.outwardImportDetails.quantity),
        lrNo: new FormControl(this.outwardImportDetails.lrNo),
        lrDate: new FormControl(this.outwardImportDetails.lrDate),
         reqQty: new FormControl(this.outwardImportDetails.reqQty),
         appQty: new FormControl(this.outwardImportDetails.appQty),
         disQty: new FormControl(this.outwardImportDetails.disQty),
        viewDocument: new FormControl(this.outwardImportDetails.viewDocument),
        scannerDetailList:new FormArray([]),
        mannualSerialDetailList:new FormArray([]),
        mannualGroupDetailList:new FormArray([]),

       });

       if(this.internalValue!=null){
         this.isChecked=true;
        //  alert(this.latestValue);
        (<FormArray>this.outwardimportform.get('mannualGroupDetailList')).push(new FormGroup({internalSrNo:new FormControl(this.internalValue,Validators.required)
          ,latestSrNo:new FormControl(this.latestValue,Validators.required)}));

        this.dataSource.data = (<FormArray>this.outwardimportform.get('mannualGroupDetailList')).controls;
              this.dataSource.data = this.dataSource.data;
        }

        if(this.srNoValue!=null){
          //  alert(this.latestValue);
          (<FormArray>this.outwardimportform.get('mannualSerialDetailList')).push(new FormGroup({SrNo:new FormControl(this.internalValue,Validators.required)}));

          this.dataSource.data = (<FormArray>this.outwardimportform.get('mannualSerialDetailList')).controls;
                this.dataSource.data = this.dataSource.data;
          }

       var userErrorMsgFormArray=new FormArray(this.outwardImportDetails.scannerDetailList.map(this.getUserErrorMsgAsForm));
  this.outwardimportform.setControl('scannerDetailList',userErrorMsgFormArray);

  var userManualGroupFormArray=new FormArray(this.outwardImportDetails.mannualGroupDetailList.map(this.getManualGroupAsForm));
  this.outwardimportform.setControl('mannualGroupDetailList',userManualGroupFormArray);

  var userManualSerialFormArray=new FormArray(this.outwardImportDetails.mannualSerialDetailList.map(this.getManualSerialAsForm));
  this.outwardimportform.setControl('mannualSerialDetailList',userManualSerialFormArray);

    }
    }

    getUserErrorMsgAsForm(userErrorMessage:OutWardListFeildData):FormGroup{
      return new FormGroup({srNo:new FormControl({value:userErrorMessage.demo},Validators.required)
      // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
    });
    }

    getManualSerialAsForm(userErrorMessage:MannualSerialDetailList):FormGroup{
      return new FormGroup({srNo:new FormControl({value:userErrorMessage.srNo},Validators.required)
      // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
    });
    }
    getManualGroupAsForm(userErrorMessage:OutWardGroupListFeildData):FormGroup{
      return new FormGroup({internalSrNo:new FormControl({value:userErrorMessage.internalSrNo},Validators.required),latestSrNo:new FormControl({value:userErrorMessage.latestSrNo},)
      // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
    });
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

  saveoutwardimport(){
    var formData=new FormData();
    formData.append("data",new Blob([JSON.stringify(this.outwardimportform.getRawValue())], {
      type: 'application/json',
    }));
    formData.append("dataFile",this.dataFile);
        this.restClient.uploadFilePost('/inventory/outwardImport', formData).subscribe({
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

  addNewScanner(){
    if (!this.outwardimportform.valid) {

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

    (<FormArray>this.outwardimportform.get('scannerDetailList')).push(new FormGroup({srNo:new FormControl('',Validators.required)}));


    this.dataSource.data = (<FormArray>this.outwardimportform.get('scannerDetailList')).controls;
    this.dataSource.data = this.dataSource.data;}
    removeScanner(i:number){
      (<FormArray>this.outwardimportform.get('scannerDetailList')).removeAt(i);
      //this.discomArray.splice(i, 1);
      this.dataSource.data = this.dataSource.data;
     // this.selectedDiscomsList.splice(i, 1);
    }
    removeScnneRow(i:number){
      (<FormArray>this.outwardimportform.get('scannerDetailList')).removeAt(i);
      //this.discomArray.splice(i, 1);
      this.dataSource.data = this.dataSource.data;
     // this.selectedDiscomsList.splice(i, 1);
    }

    addNewMannualSerial(){
      if (!this.outwardimportform.valid) {

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

      (<FormArray>this.outwardimportform.get('mannualSerialDetailList')).push(new FormGroup({srNo:new FormControl('',Validators.required)}));


      this.dataSource.data = (<FormArray>this.outwardimportform.get('mannualSerialDetailList')).controls;
      this.dataSource.data = this.dataSource.data;}

      removeMannualSerial(i:number){
        (<FormArray>this.outwardimportform.get('mannualSerialDetailList')).removeAt(i);
        //this.discomArray.splice(i, 1);
        this.dataSource.data = this.dataSource.data;
       // this.selectedDiscomsList.splice(i, 1);
      }
      // removeMannualSerialRow(i:number){
      //   (<FormArray>this.outwardimportform.get('MannualSerialDetailList')).removeAt(i);
      //   //this.discomArray.splice(i, 1);
      //   this.dataSource.data = this.dataSource.data;
      //  // this.selectedDiscomsList.splice(i, 1);
      // }

      addNewMannualGroup(){
        if (!this.outwardimportform.valid) {

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

        (<FormArray>this.outwardimportform.get('mannualGroupDetailList')).push(new FormGroup({internalSrNo:new FormControl('',Validators.required),
        latestSrNo:new FormControl('',Validators.required)}));


        this.dataSource.data = (<FormArray>this.outwardimportform.get('mannualGroupDetailList')).controls;
        this.dataSource.data = this.dataSource.data;}
        removeMannualGroup(i:number){
          (<FormArray>this.outwardimportform.get('mannualGroupDetailList')).removeAt(i);
          //this.discomArray.splice(i, 1);
          this.dataSource.data = this.dataSource.data;
         // this.selectedDiscomsList.splice(i, 1);
        }
        removeMannualRow(i:number){
          (<FormArray>this.outwardimportform.get('mannualGroupDetailList')).removeAt(i);
          //this.discomArray.splice(i, 1);
          this.dataSource.data = this.dataSource.data;
         // this.selectedDiscomsList.splice(i, 1);
        }

  itemGroupSelect(){
    this.restClient.get('/inventory/fetchItemGroup').subscribe({
      next:(result:any)=>{
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

itemModelNameLookUp(event:any){
  // this.itemModelName=event.value;
  var queryParam:any={};
  if(event.value==undefined){
    queryParam['itemModelName']=event;
  }else{
    queryParam['itemModelName']=event.value;
  }
  queryParam['itemGroup']=this.itemGroup;

  this.restClient.getwithParam('/inventory/lookupItemName',queryParam).subscribe({
    next:(result:any)=>{
      // this.itemCategoryValues=result.data.itemCategory;
      // this.itemSupplierValues=result.data.supplier;
      this.outwardimportform.get("supplier")?.setValue(result.data.supplier)
      this.outwardimportform.get("itemCategory")?.setValue(result.data.itemCategory)
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

  this.restClient.getwithParam(environment.SHOW_SERIAL_DATA_OUTWARDIMPORT_API+this.outwardImportDetails.id,queryParams)
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


}
 export interface discomsList{
name:string;

 }
 export interface warehouseNamesList{
  name:string;

   }
   export interface subcontractorTypesList{
    name:string;

     }
     export interface SubcontractorsList{
      name:string;

       }
      //  export interface ItemGrList{
      //   name:string;

      //    }
        //  export interface ItemNamesList{
        //   name:string;

        //    }
           export interface ItemstatusList{
            name:string;

             }

