import { saveAs } from 'file-saver';
import { APIResponse } from './../../../services/httpclient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wh-to-wh-inward-list',
  templateUrl: './wh-to-wh-inward-list.component.html',
  styleUrls: ['./wh-to-wh-inward-list.component.css']
})
export class WhToWhInwardListComponent implements OnInit {


isLoading=false;
selectedIndex= 0;
spinner = false;
isEditable: boolean = false;
isNavigation: boolean = false;
totalRows= 0;
pageSize= 15;
currentPage= 0;
pageSizeOptions: number[]=[20,40,60,80,100];
 @ViewChild(MatPaginator) paginator:MatPaginator;
 @ViewChild(MatSort) sort:MatSort;
 filtered=false;

displayedColumns: string[]=['trnStatus','transactionID','discomFrom','discomTo','inwardDate','dcNo',
'itemGroup','itemModelName','supplier','itemStatus','disQty','rcdQty','docUpload'];
dataSource=new  MatTableDataSource<any>();

discomSearch:string='';
itemGroupSearch='';
itemNameSearch='';

detailData:whtowhinwardimportData={
  id: '',
  discomFrom: '',
  receiver: '',
  discomTo: '',
  sender: '',
  dcNo: '',
  dcDate: '',
  ginNo:'',
  inwardDate: '',
  itemGroup: '',
  itemModelName: '',
  supplier: '',
  itemCategory: '',
  itemStatus: '',
  quantity: '',
  transporter: '',
  lrNo: '',
  lrDate:'',
  vehicleNo: '',
  driverName: '',
  contactNo: '',
  remark: '',
  scannerDetailList:[],
  mannualGroupDetailList:[],
 mannualSerialDetailList:[],
};

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loadwhtowhinwardData();
this.isEditable=true;
  }

  onChangePage(pe: PageEvent) {
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = pe.pageIndex;
    queryParams['size'] = pe.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_WAREHOUSE_INWARD, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: whtowhinwardimportData[] = result.data.content as whtowhinwardimportData[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Server Error', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.isLoading = false;
        },
        complete: () => {
          console.log('InwardImport List Fetch Complete ');
          this.isLoading = false;
        },
      });

  }

  downloadDocument(docuemntId: any): void {
    this.spinner = true;
alert(docuemntId)

    var queryParams: any = {};
    queryParams['docId'] = 1;

    this.restClient
      .downloadusingGet(environment.FILE_DOWNLOAD_API, queryParams)
      .subscribe({
        next: (result: any) => {
          saveAs(result);
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

  Discom:string='123';
  loadwhtowhinwardData(){
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    // queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_WAREHOUSE_INWARD, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: whtowhinwardimportData[] = result.data.content as whtowhinwardimportData[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Server Error', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.isLoading = false;
        },
        complete: () => {
          console.log('InwardImport List Fetch Complete ');
          this.isLoading = false;
        },
      });

  }

  latestSrNoValue:any;
  internalSrNoValue:any;

  navToDetails(row:any){
    this.detailData=row;
    this.selectedIndex=1;

//     var queryParams:any={};
// queryParams['mannualSerialDetailList']=row.id;

//     this.restClient.getwithParam(environment.BASE_URL+'/inventory/findByManualSerialInward',queryParams).subscribe({
//       next:(result:APIResponse)=>{
//         this.detailData.mannualGroupDetailList=result.data;
//         this.latestSrNoValue=result.data.latestSrNo;
//         this.internalSrNoValue=result.data.internalSrNo;


//       }
//     })

  }
  addNewWHtoWHInwardImport(){
   this.detailData={
    id: '',
    discomFrom: '',
    receiver: '',
    discomTo: '',
    sender: '',
    dcNo: '',
    dcDate: '',
    ginNo:'',
    inwardDate: '',
    itemGroup: '',
    itemModelName:'',
    supplier: '',
    itemCategory:'',
    itemStatus: '',
    quantity: '',
    transporter:'',
    lrNo: '',
    lrDate:'',
    vehicleNo: '',
    driverName: '',
    contactNo: '',
    remark: '',
    scannerDetailList:[],
    mannualGroupDetailList:[],
    mannualSerialDetailList: []
   }

    this.isNavigation=false;
    this.selectedIndex=1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadwhtowhinwardData();
  }

  searchWithFilter(){

    this.currentPage=0;
    this.fetchFilterData();

  }

  fetchFilterData():void{
    this.isLoading=true;
    this.filtered=true;

    var queryParams : any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discomFrom'] = this.discomSearch;
    queryParams['itemGroup'] = this.itemGroupSearch;
    queryParams['itemModelName'] = this.itemNameSearch;

    this.restClient.getwithParam('/inventory/getAllDataInwardFilter',queryParams)
    .subscribe({
      next: (result: PageableResponse) => {
        var content: RoleList[] = result.data.content as RoleList[];

        this.dataSource.data = content;
        this.totalRows = result.data.totalElements;
        if (content.length == 0) {
          let snackBarRef = this.snackBar.open(
            'No Data Found For the Filter',
            'close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            }
          );
        }
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('complete');
        this.isLoading = false;
      },
    });

  }

}

export interface whtowhinwardimportData{
  id: string
  discomFrom: string
  receiver: string
  discomTo: string
  sender: string
  dcNo: string
  dcDate: string
  ginNo:string
  inwardDate: string
  itemGroup: string
  itemModelName: string
  supplier: string
  itemCategory: string
  itemStatus: string
  quantity: string
  transporter: string
  lrNo: string
  lrDate:string
  vehicleNo: string
  driverName: string
  contactNo: string
  remark: string
  scannerDetailList:WhToWhInWard[]
  mannualGroupDetailList:OutWardGroupListFeildData[];
  mannualSerialDetailList:  MannualSerialDetailList[]

}

export interface WhToWhInWard{
  id:string;
  demo:string;
}
export interface OutWardGroupListFeildData{
  id:string;
  internalSrNo:string;
  latestSrNo:string;

}

export interface MannualSerialDetailList{
  // id:string;
  srNo:string;
}
export interface RoleList {
  discomFrom?: string;
  itemGroup? :string;
  itemModelName? : string;
}
