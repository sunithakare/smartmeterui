import { ItemCategory } from './../../masters/item-category-list/item-category-list.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { APIResponse, ConfigCode, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { InwardImportListData } from '../inward-import.component';
import { SerialNoList } from '../../display-serial-no-list/display-serial-no-list.component';
import { environment } from 'src/environments/environment';
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
  selector: 'app-inward-import-details',
  templateUrl: './inward-import-details.component.html',
  styleUrls: ['./inward-import-details.component.css'],
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
export class InwardImportDetailsComponent implements OnInit ,OnChanges{

  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;

  @Input()
  inwardDetails:InwardImportListData;

  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();

  dataFile:File;
  dataDocument:File;
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

  inwardImportForm: FormGroup;


itemstatus:ItemStatusList[]=[{name:'Fresh'},{name:'Faulty'},{name:'Repaired'},{name:'Replaced-Fresh'}];
stockType:StockTypeList[]=[{name:'Billable'},{name:'Buffer'}];



searcher: any={
  discom:"",
}

itemModelNameValues:any;
itemGroup:any;
itemGroupValues:any;
supplierList:any;

totalDiscomsList: ConfigCode[] = [];
warehouseList:any;

  constructor(
    private snackBar: MatSnackBar,
  private restClient: HttpclientService,
  private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.inwardImportForm = new FormGroup({
      // id: new FormControl('',Validators.required),
      discom: new FormControl('',Validators.required),
      warehouseName: new FormControl('',Validators.required),
      supplier: new FormControl('',Validators.required),
      invoiceNo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      invoiceDate: new FormControl('',Validators.required),
      ginNo:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      ginDate:new FormControl('',Validators.required),
      itemModelName: new FormControl('',Validators.required),
      itemGroup: new FormControl('',Validators.required),
      itemSupplier: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      itemCategory: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      itemStatus: new FormControl('',Validators.required),
      quantity: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      transporter: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      lrNo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      lrDate:new FormControl('',Validators.required),
      vehicleNo: new FormControl('',Validators.required),
      //  Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
      driverName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
    //  warrantyMonth: new FormControl('',Validators.required),
      pdiDate: new FormControl('',Validators.required),
      stockType:new FormControl('', Validators.required),
      remark: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    });
     this.itemGroupSelect()
     this.getAllDiscom()
     this.getWarehouseName()
     this.getSupplier()

  }

  uploadDataFile(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.dataFile = event.target.files[0];


    }
  }
  uploadDataDocument(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.dataDocument = event.target.files[0];


    }
  }
  ngOnChanges() {
    if(this.inwardDetails ==null && this.inwardDetails ==undefined){
      this.inwardImportForm=new FormGroup({
        id: new FormControl('',Validators.required),
        discom: new FormControl('',Validators.required),
        warehouseName: new FormControl('',Validators.required),
        supplier: new FormControl('',Validators.required),
        invoiceNo: new FormControl('',Validators.required),
        invoiceDate: new FormControl('',Validators.required),
        ginNo:new FormControl('',Validators.required),
        ginDate:new FormControl('',Validators.required),
        itemModelName: new FormControl('',Validators.required),
        itemGroup: new FormControl('',Validators.required),
        itemSupplier: new FormControl('',Validators.required),
        itemCategory: new FormControl('',Validators.required),
        itemStatus: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        transporter: new FormControl('',Validators.required),
        lrNo: new FormControl('',Validators.required),
        lrDate:new FormControl('',Validators.required),
        vehicleNo: new FormControl('',Validators.required),
        //  Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
        driverName: new FormControl('',Validators.required),
        contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
     //   warrantyMonth: new FormControl('',Validators.required),
        pdiDate: new FormControl('',Validators.required),
        stockType:new FormControl('', Validators.required),
        remark: new FormControl('',Validators.required),

       });
    }else{
      this.inwardImportForm=new FormGroup({
        id: new FormControl(this.inwardDetails.id),
        discom: new FormControl(this.inwardDetails.discom,),
        warehouseName: new FormControl({value:this.inwardDetails.warehouseName,disabled:this.isEditable||this.isNavigation},),
        supplier: new FormControl(this.inwardDetails.supplier,),
        invoiceNo: new FormControl(this.inwardDetails.invoiceNo,),
        invoiceDate: new FormControl(this.inwardDetails.invoiceDate,),
        ginNo: new FormControl(this.inwardDetails.ginNo,),
        ginDate: new FormControl(this.inwardDetails.ginDate),
        itemGroup: new FormControl(this.inwardDetails.itemGroup),
        itemModelName: new FormControl(this.inwardDetails.itemModelName),
        itemSupplier: new FormControl(this.inwardDetails.itemSupplier),
        itemCategory: new FormControl(this.inwardDetails.itemCategory),
        quantity: new FormControl(this.inwardDetails.quantity),
        itemStatus: new FormControl(this.inwardDetails.itemStatus),
        transporter: new FormControl(this.inwardDetails.transporter),
        lrNo: new FormControl(this.inwardDetails.lrNo),
        lrDate: new FormControl(this.inwardDetails.lrDate),
        vehicleNo: new FormControl(this.inwardDetails.vehicleNo),
        driverName: new FormControl(this.inwardDetails.driverName),
        contactNo: new FormControl(this.inwardDetails.contactNo),
        remark: new FormControl(this.inwardDetails.remark),
       // warrantyMonth: new FormControl(this.inwardDetails.warrantyMonth),
        pdiDate: new FormControl(this.inwardDetails.pdiDate),
        stockType:new FormControl(this.inwardDetails.stockType),
       });
    }
    }

  saveInwardImport(){
     // if(!this.inwardImportForm.valid){
    //   return;
    // }
      var formData=new FormData();
      formData.append("data",new Blob([JSON.stringify(this.inwardImportForm.getRawValue())], {
        type: 'application/json',
      }));
       formData.append("dataFile",this.dataFile);
       formData.append("dataDocument",this.dataDocument);
          this.restClient.uploadFilePost('/inventory/saveInwardFromSupplier', formData).subscribe({
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

              this.spinner = false;
            },
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
        this.itemModelNameValues=result.data;
      }
    })
  }

itemNameLookUp(event:any){

  var queryParam:any={};
  queryParam['itemModelName']=event.value;
  queryParam['itemGroup']=this.itemGroup;

  this.restClient.getwithParam('/inventory/lookupItemName',queryParam).subscribe({
    next:(result:any)=>{

      this.inwardImportForm.get('itemSupplier')?.setValue(result.data.supplier);
      this.inwardImportForm.get('itemCategory')?.setValue(result.data.itemCategory);
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

  this.restClient.getwithParam(environment.SHOW_SERIAL_DATA_INWARDIMPORT_API+this.inwardDetails.id,queryParams)
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

export interface ItemStatusList{
  name:string;
}
export interface StockTypeList{
  name:string;
}
