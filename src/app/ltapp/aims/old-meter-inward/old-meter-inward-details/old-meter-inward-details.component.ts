import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { SerialNoList } from '../../display-serial-no-list/display-serial-no-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { OldMeterInwardListData } from '../old-meter-inward.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  selector: 'app-old-meter-inward-details',
  templateUrl: './old-meter-inward-details.component.html',
  styleUrls: ['./old-meter-inward-details.component.css'],
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
export class OldMeterInwardDetailsComponent implements OnInit {

  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Input()
  detailData: OldMeterInwardListData;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  file:File;
  spinner:boolean=false;
  selectedIndex = 0;
  totalRows= 0;
  pageSize= 15;
  currentPage= 0;
  isLoading=false;
  filtered=false;

  serialNoList: SerialNoList[];
  showSerialData:Boolean=false;
  dataSource=new  MatTableDataSource<any>();

  oldMeterInwardForm: FormGroup;

discoms:DiscomList[] = [ {name:"123"},{ name: "DVVNL" }, { name: "PVVNL" }, { name: "MVVNL" },{ name: "PUVNL" },];
warehouses:WarehouseList[]=[{name:"warehouse1"},{name:"warehouse2"}];
subcontractorTypes:subcontractorTypeList[]=[{name:'SubConType1'},{name:'SubConType2'}];
subcontractors:subcontractorList[]=[{name:'SubCon1'},{name:'SubCon2'}];
itemstatus:ItemStatusList[]=[{name:'OLD METER'},{name:'NEW METER'}];


  constructor(
    private snackBar: MatSnackBar,
  private restClient: HttpclientService,
  private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.oldMeterInwardForm = new FormGroup({
     discom: new FormControl('',Validators.required),
     warehouse: new FormControl('',Validators.required),
     subcontractorType: new FormControl('',Validators.required),
     subcontractor: new FormControl('',Validators.required),
     docNo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
     invoiceDate: new FormControl('',Validators.required),
     ginNo:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
     grnDate:new FormControl('',Validators.required),
     itemStatus: new FormControl('',Validators.required),
     quantity: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
     transporter: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
     lrNo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
     vehicleNo: new FormControl('',[Validators.required ,Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
     driverName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
     contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
     remark: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    });
  }

  ngOnChanges(){

    if(this.detailData == null && this.detailData == undefined){
      this.oldMeterInwardForm = new FormGroup({
        discom: new FormControl('',Validators.required),
        warehouse: new FormControl('',Validators.required),
        subcontractorType: new FormControl('',Validators.required),
        subcontractor: new FormControl('',Validators.required),
        docNo: new FormControl('',Validators.required),
        invoiceDate: new FormControl('',Validators.required),
        ginNo:new FormControl('',Validators.required),
        grnDate:new FormControl('',Validators.required),
        itemStatus: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        transporter: new FormControl('',Validators.required),
        lrNo: new FormControl('',Validators.required),
        vehicleNo: new FormControl('',[Validators.required ,Validators.pattern("^[A-Z]{2}[ -]{0,1}[0-9]{2}[ -]{0,1}[A-Z]{1,2}[ -]{0,1}[0-9]{1,4}$")]),
        driverName: new FormControl('',Validators.required),
        contactNo: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
        remark: new FormControl('',Validators.required),
       });
    }
    else{
      this.oldMeterInwardForm = new FormGroup({
        id: new FormControl(this.detailData.id),
        discom: new FormControl(this.detailData.discom,Validators.required),
        warehouse: new FormControl(this.detailData.warehouse,Validators.required),
        subcontractorType: new FormControl(this.detailData.subcontractorType,Validators.required),
        subcontractor: new FormControl(this.detailData.subcontractor,Validators.required),
        docNo: new FormControl(this.detailData.docNo,Validators.required),
        invoiceDate: new FormControl(this.detailData.invoiceDate,Validators.required),
        ginNo:new FormControl(this.detailData.ginNo,Validators.required),
        grnDate:new FormControl(this.detailData.grnDate,Validators.required),
        itemStatus: new FormControl(this.detailData.itemStatus,Validators.required),
        quantity: new FormControl(this.detailData.quantity,Validators.required),
        transporter: new FormControl(this.detailData.transporter,Validators.required),
        lrNo: new FormControl(this.detailData.lrNo,Validators.required),
        vehicleNo: new FormControl(this.detailData.vehicleNo,Validators.required),
        driverName: new FormControl(this.detailData.driverName,Validators.required),
        contactNo: new FormControl(this.detailData.contactNo,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        remark: new FormControl(this.detailData.remark),
       });
    }
  }

  uploadFile(event: any):void {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  saveOldMeterInward(){
    if(!this.oldMeterInwardForm.valid){
      return;
    }

      var formData=new FormData();
      formData.append("data",new Blob([JSON.stringify(this.oldMeterInwardForm.getRawValue())], {
        type: 'application/json',
      }));
      formData.append("dataFile",this.file);
          this.restClient.uploadFilePost('/inventory/oldMeterInward', formData).subscribe({
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



  backToList(){
    this.dataSaved.emit(0);
  }


//navigation details to serialNoList page
 showSerialNoListDetails() {
  this.isLoading = true;
  this.filtered = false;
  var queryParams: any ={};
  queryParams['page'] = this.currentPage;
  queryParams['size'] = this.pageSize;

  this.restClient.getwithParam(environment.SHOW_SERIAL_DATA_OLDMETERINWARD_API+this.detailData.id,queryParams)
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
export interface WarehouseList{
  name:string;
}
export interface subcontractorTypeList{
  name: string;
}
export interface subcontractorList{
  name: string;
}
export interface ItemStatusList{
  name:string;
}
