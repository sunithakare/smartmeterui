import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIResponse, ConfigCode, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { ReturnToSupplierData } from '../return-to-supplier.component';
import { SerialNoList } from '../../display-serial-no-list/display-serial-no-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
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
  selector: 'app-return-to-supplier-details',
  templateUrl: './return-to-supplier-detaisl.component.html',
  styleUrls: ['./return-to-supplier-detaisl.component.css'],
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
export class ReturnToSupplierDetaislComponent implements OnInit ,OnChanges{
  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Input()
  detailData:ReturnToSupplierData;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();

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
  returnToSupplierDetailsForm:FormGroup;

  discom:DiscomList[]=[
    {name : "select"},
    {name : "DVVNL"},

  ]
  // iteamName:IteamNameList[]=[
  //   {name : "select"},
  //   {name : "test"},
  // ]
  iteamStatus:IteamStatusList[]= [
    {name : "New"},
    {name : "Old"},
  ]
  warehouseName: WarehouseNameList[]=[
    {name : "select"},
    {name : "sample"},
  ]
  supplier:SupplierList[] = [
    {name : "select"},
    {name : "supplier"},
  ]
  // itemGroup:ItemGroupList[] = [
  //   {name : "select"},
  //   {name : "ABC"},
  // ]

  itemNameValues:any;
itemGroup:any;
itemTypeValues:any;
itemMakeValues:any;
itemGroupValues:any;

totalDiscomsList: ConfigCode[] = [];
warehouseList:any;
supplierList:any;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.returnToSupplierDetailsForm = new FormGroup({
      discom: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
      supplier: new FormControl('',Validators.required),
      dc: new FormControl('',Validators.required),
      dcDate: new FormControl('',Validators.required),
      dispatchDate: new FormControl('',Validators.required),
      itemGroup: new FormControl('',Validators.required),
      itemModelName: new FormControl('',Validators.required),
      itemSupplier: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      lrNo: new FormControl('',Validators.required),
      lrDate:new FormControl('',Validators.required),
      itemStatus: new FormControl('',Validators.required),
      transporter: new FormControl('',Validators.required),
      itemCategory: new FormControl('',Validators.required),
      vehicleNo: new FormControl('',Validators.required ),
      // Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
      driverName: new FormControl('',Validators.required),
      contactNo: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
      // warrantyDate: new FormControl('',Validators.required),
      remark:new FormControl(''),
    });
    this.itemGroupSelect()
    this.getAllDiscom()
    this.getWarehouseName()
    this.getSupplier()
  }

  uploadFile(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.dataFile = event.target.files[0];

    }
  }

  savereturnToSupplierDetails(){

    // if(!this.returnToSupplierDetailsForm.valid){
    //   return;
    // }

    var formData=new FormData();
      formData.append("data",new Blob([JSON.stringify(this.returnToSupplierDetailsForm.getRawValue())], {
        type: 'application/json',
      }));
      formData.append("dataFile",this.dataFile);
          this.restClient.uploadFilePost('/inventory/saveReturnToSupplier', formData).subscribe({
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





  ngOnChanges(){

    if(this.detailData == null && this.detailData == undefined){
      this.returnToSupplierDetailsForm = new FormGroup({
        discom: new FormControl('',Validators.required),
        warehouseName: new FormControl('',Validators.required),
        supplier: new FormControl('',Validators.required),
        dc: new FormControl('',Validators.required),
        dcDate: new FormControl('',Validators.required),
        dispatchDate: new FormControl('',Validators.required),
        itemGroup: new FormControl('',Validators.required),
        itemModelName: new FormControl('',Validators.required),
        itemSupplier: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        lrNo: new FormControl('',Validators.required),
        lrDate:new FormControl('',Validators.required),
        itemStatus: new FormControl('',Validators.required),
        transporter: new FormControl('',Validators.required),
        itemCategory: new FormControl('',Validators.required),
        vehicleNo: new FormControl('',Validators.required) ,
        // Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
        driverName: new FormControl('',Validators.required),
        contactNo: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
        remark:new FormControl(''),
        // warrantyDate: new FormControl('',Validators.required),
      });
    }
    else{
      this.returnToSupplierDetailsForm = new FormGroup({
        discom: new FormControl(this.detailData.discom,[Validators.required]),
        warehouseName: new FormControl(this.detailData.warehouseName,[Validators.required]),
        supplier: new FormControl(this.detailData.supplier,[Validators.required]),
        dc: new FormControl(this.detailData.dc,[Validators.required]),
        dcDate: new FormControl(this.detailData.dcDate,[Validators.required]),
        dispatchDate: new FormControl(this.detailData.dispatchDate,[Validators.required]),
        itemGroup: new FormControl(this.detailData.itemGroup,[Validators.required]),
        itemName: new FormControl(this.detailData.itemModelName,[Validators.required]),
        itemSupplier: new FormControl(this.detailData.itemSupplier,[Validators.required]),
        quantity: new FormControl(this.detailData.quantity,[Validators.required]),
        lrNo: new FormControl(this.detailData.lrNo,[Validators.required]),
        lrDate:new FormControl(this.detailData.lrDate,[Validators.required]),
        itemStatus: new FormControl(this.detailData.itemStatus,[Validators.required]),
        transporter: new FormControl(this.detailData.transporter,[Validators.required]),
        itemCategory: new FormControl(this.detailData.itemCategory,[Validators.required]),
        vehicleNo: new FormControl(this.detailData.vehicleNo,[Validators.required]),
        driverName: new FormControl(this.detailData.driverName,[Validators.required]),
        contactNo: new FormControl(this.detailData.contactNo,[Validators.required]),
        remark:new FormControl(this.detailData.remark),
        // warrantyDate: new FormControl('',Validators.required),
      });
    }
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

  getSupplier(){
    var queryParam:any={};

    this.restClient.get('/inventory/fetchSupplier').subscribe({
      next:(result: APIResponse)=>{
        this.supplierList=result.data;
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

itemNameLookUp(event:any){

  var queryParam:any={};
  queryParam['itemModelName']=event.value;
  queryParam['itemGroup']=this.itemGroup;

  this.restClient.getwithParam('/inventory/lookupItemName',queryParam).subscribe({
    next:(result:any)=>{
      this.returnToSupplierDetailsForm.get('itemSupplier')?.setValue(result.data.supplier);
      this.returnToSupplierDetailsForm.get('itemCategory')?.setValue(result.data.itemCategory);
      // this.itemTypeValues=result.data.itemType;
      // this.itemMakeValues=result.data.itemMake;
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

  this.restClient.getwithParam(environment.SHOW_SERIAL_DATA_RETURN_TO_SUBCONTRACTOR_API+this.detailData.id,queryParams)
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
export interface DiscomList{
  name: string;
}
export interface IteamNameList{
  name:string;
}
export interface IteamStatusList{
  name:string;
}
export interface WarehouseNameList{
  name:string;
}
export interface SupplierList{
  name:string;
}
export interface ItemGroupList{
  name: string;
}
