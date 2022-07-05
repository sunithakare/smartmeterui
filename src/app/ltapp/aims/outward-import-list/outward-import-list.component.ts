import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { RoleList } from '../return-from-subcontractor-list/return-from-subcontractor-list.component';

@Component({
  selector: 'app-outward-import-list',
  templateUrl: './outward-import-list.component.html',
  styleUrls: ['./outward-import-list.component.css']
})
export class OutwardImportListComponent implements OnInit {
isLoading=false;
isEditable=false;
selectedIndex= 0;
spinner = false;
isNavigation: boolean = false;
totalRows= 0;
pageSize= 15;
currentPage= 0;
pageSizeOptions: number[]=[20,40,60,80,100];
 @ViewChild(MatPaginator) paginator:MatPaginator;
 @ViewChild(MatSort) sort:MatSort | undefined;
 filtered=false;

 isChecked:boolean=false;

displayedColumns: string[] = ['trnStatus','transactionId','discom','warehouse','dispatchDate','indentNo','indentDate',
                              'subcontractor','itemGroup','itemModelName','supplier','itemCategory','itemStatus','reqQty','appQty','disQty','viewDocument'];
  dataSource= new MatTableDataSource<any>();

  discomSearch:string='';
warehouseSearch:string='';
subcontractorTypeSearch:string='';
subcontractorSearch:string='';
itemGroupSearch:string='';
itemStatusSearch:string='';
itemModelNameSearch:string='';
itemCategorySearch:string='';
supplierSearch:string='';

  outwardImportResponse:OutwadImportData={
  id: '',
  trnStatus:'',
  discom: '',
  warehouseName:'',
  subcontractor: '',
  subcontractorType:'',
  indentNo: '',
  indentDate: '',
  dispatchDate: '',
  itemGroup: '',
  itemModelName: '',
  supplier: '',
  itemCategory:'',
  itemStatus: '',
  vehicleNo:'',
  contactNo:'',
  driverName:'',
  quantity:0,
  transporter:'',
  lrNo:'',
  lrDate:'',
  remark:'',
  reqQty:'',
 appQty:'',
 disQty:'',
 
 viewDocument:'',
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
    this.isEditable=true;

  }

  onChangePage(pe: PageEvent) {
    // this.pageSize = pe.pageSize;
    // this.currentPage = pe.pageIndex;
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = pe.pageIndex;
    queryParams['size'] = pe.pageSize;
    queryParams['discom']=this.loaddiscom;

    this.restClient
      .getwithParam(environment.INVENTORY_OUTWARD_IMPORT_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: OutwadImportData[] = result.data.content as OutwadImportData[];

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

 loaddiscom='DVVNL'
  loadoutwardData(){
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom']=this.loaddiscom;

    this.restClient
      .getwithParam(environment.INVENTORY_OUTWARD_IMPORT_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: OutwadImportData[] = result.data.content as OutwadImportData[];

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

  internalValue:string;
  latestValue:string;

  navToDetails(row:any){
    this.selectedIndex =1;
    this.outwardImportResponse=row;

    // this.isChecked=true;

     var queryParams: any ={};
     queryParams['mannualSerialDetailList']=row.id;
    //  queryParams['id']=row.id;

     this.restClient.getwithParam(environment.BASE_URL +"/inventory/findByManualSerialOutwardImport",queryParams)
     .subscribe({
       next:(results:APIResponse) =>{
         this.outwardImportResponse.mannualGroupDetailList=results.data;
         this.internalValue=results.data.internalSrNo;
         this.latestValue=results.data.latestSrNo;


         this.isNavigation= true;
         this.selectedIndex= 1;
        this.isEditable=true;
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
         console.log('Outward Import List Fetch Complete');
         this.spinner =false;
       },
      });
  }
  addNewOutwardImport(){
    this.outwardImportResponse={
      id: '',
      trnStatus:'',
      discom: '',
      warehouseName: '',
      subcontractor: '',
      subcontractorType:'',
      indentNo: '',
      indentDate: '',
      dispatchDate: '',
      itemGroup: '',
      itemModelName: '',
      supplier: '',
      itemCategory: '',
      itemStatus: '',
      vehicleNo:'',
      driverName:'',
      contactNo:'',
      quantity:0,
      transporter:'',
      lrNo:'',
      lrDate:'',
      reqQty:'',
      appQty:'',
      disQty:'',
      viewDocument:'',
      remark:'',
      scannerDetailList:[],
      mannualGroupDetailList:[],
      mannualSerialDetailList:[],

    }
    this.isChecked=false;
    this.isNavigation=false;
    this.selectedIndex=1;
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
    queryParams['discom'] = this.discomSearch;
    queryParams['warehouseName'] = this.warehouseSearch;
    queryParams['subcontractorType'] = this.subcontractorTypeSearch;
    queryParams['subcontractor'] = this.subcontractorSearch;
    queryParams['itemGroup'] = this.itemGroupSearch;
    queryParams['itemStatus'] = this.itemStatusSearch;
    queryParams['itemModelName'] = this.itemModelNameSearch;
    queryParams['itemCategory'] = this.itemStatusSearch;
    queryParams['supplier'] = this.supplierSearch;

    this.restClient.getwithParam('/inventory/fetchOutwardToSubcontractorFilter',queryParams)
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

  DownloadMyFile(){

  }
  

  }

export interface OutwadImportData{
  id: string
  trnStatus:string
  discom: string
  warehouseName: string
  subcontractor: string
  subcontractorType:string
  indentNo: any
  indentDate: string
  dispatchDate: string
  itemGroup: string
  itemModelName: string
  supplier: string
  contactNo:string
  itemCategory: string
  itemStatus: string
  vehicleNo:string
  driverName:string
  quantity:number
  transporter:string
  lrNo:string
  lrDate:string
  reqQty: string
  appQty: string
  disQty: string
  remark:string
  viewDocument: string
  scannerDetailList:OutWardListFeildData[];
  mannualGroupDetailList:OutWardGroupListFeildData[];
  mannualSerialDetailList:  MannualSerialDetailList[]
}
export interface OutWardListFeildData{
  demo:string;
}
export interface OutWardGroupListFeildData{
  internalSrNo:string;
  latestSrNo:string;

}
export interface MannualSerialDetailList{
  srNo:string;
}