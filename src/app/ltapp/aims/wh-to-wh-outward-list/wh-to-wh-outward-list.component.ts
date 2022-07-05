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
  selector: 'app-wh-to-wh-outward-list',
  templateUrl: './wh-to-wh-outward-list.component.html',
  styleUrls: ['./wh-to-wh-outward-list.component.css']
})
export class WhToWhOutwardListComponent implements OnInit {

  isLoading=false;
selectedIndex= 0;
spinner = false;
isDetailsEditable: boolean = false;
isEditable: boolean = false;
isNavigation: boolean = false;
totalRows= 0;
pageSize= 15;
currentPage= 0;
pageSizeOptions: number[]=[20,40,60,80,100];
 @ViewChild(MatPaginator) paginator:MatPaginator;
 @ViewChild(MatSort) sort:MatSort;

 displayedColumns: string[] = ['trnStatus','transactionID','discomFrom','discomTo','dispatchDate','docNo',
 'itemGroup','itemModelName','supplier','itemStatus','disQty','viewDocument'
];
 dataSource= new MatTableDataSource<any>();


discomSearch:string='';
itemGroupSearch='';
itemNameSearch='';

 filtered=false;

 detailData:whtowhoutwardData={
  id: '',
  discomFrom: '',
  sender: '',
  discomTo: '',
  receiver: '',
  docNo: '',
  docDate: '',
  dispatchDate: '',
  itemGroup: '',
  itemModelName: '',
  supplier: '',
  itemCategory: '',
  quantity: 0,
  itemStatus: '',
  transporter: '',
  lrNo: '',
  lrDate:'',
  vehicleNo: '',
  driverName: '',
  contactNo: '',
  remark: '',
  docUpload:'',
  scannerDetailList:[],
  mannualGroupDetailList:[],
 mannualSerialDetailList:[],
 }

 constructor(
  private snackBar: MatSnackBar,
  private restClient: HttpclientService,
  private authservice: AuthService
 ) { }

  ngOnInit(): void {
this.loadoutwardData();
this.isDetailsEditable=true;

  }

  onChangePage(pe: PageEvent) {
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = pe.pageIndex;
    queryParams['size'] = pe.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_WAREHOUSE_OUTWARD, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: whtowhoutwardData[] = result.data.content as whtowhoutwardData[];

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
  Discom:string='123';
  loadoutwardData(){
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_WAREHOUSE_OUTWARD, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: whtowhoutwardData[] = result.data.content as whtowhoutwardData[];

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

    // alert(row.id);

var queryParams:any={};
queryParams['mannualSerialDetailList']=row.id;

    this.restClient.getwithParam(environment.BASE_URL+'/inventory/findByManualSerial',queryParams).subscribe({
      next:(result:APIResponse)=>{
        this.detailData.mannualGroupDetailList=result.data;
        this.latestSrNoValue=result.data.latestSrNo;
        this.internalSrNoValue=result.data.internalSrNo;
        // alert(this.latestSrNoValue)

      }
    })
  }

  addNewWHtoWHOutward(){
    this.isNavigation=false;
    this.selectedIndex=1;
    this.detailData={
      id: '',
  discomFrom: '',
  sender: '',
  discomTo: '',
  receiver: '',
  docNo: '',
  docDate: '',
  dispatchDate: '',
  itemGroup: '',
  itemModelName: '',
  supplier: '',
  itemCategory: '',
  quantity: 0,
  itemStatus: '',
  transporter: '',
  lrNo: '',
  lrDate:'',
  vehicleNo: '',
  driverName: '',
  contactNo: '',
  remark: '',
  docUpload:'',
  scannerDetailList:[],
  mannualGroupDetailList:[],
 mannualSerialDetailList:[],
    }
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadoutwardData();
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

    this.restClient.getwithParam('/inventory/getAllDataOutwardFilter',queryParams)
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
export interface whtowhoutwardData{
  id: string
  discomFrom: string
  sender: string
  discomTo: string
  receiver: string
  docNo: string
  docDate: string
  dispatchDate: string
  itemGroup: string
  itemModelName: string
  supplier: string
  itemCategory: string
  quantity: number
  itemStatus: string
  transporter: string
  lrNo: string
  lrDate:string
  vehicleNo: string
  driverName: string
  contactNo: string
  remark: string
  docUpload:string
  scannerDetailList:WhToWhOutWard[]
  mannualGroupDetailList:OutWardGroupListFeildData[];
  mannualSerialDetailList:  MannualSerialDetailList[]
}
export interface WhToWhOutWard{
  srNo:string;
}
export interface OutWardGroupListFeildData{
  internalSrNo:string;
  latestSrNo:string;

}

export interface MannualSerialDetailList{
  srNo:string;
}

export interface RoleList {
  discomFrom?: string;
  itemGroup? :string;
  itemModelName? : string;
}
