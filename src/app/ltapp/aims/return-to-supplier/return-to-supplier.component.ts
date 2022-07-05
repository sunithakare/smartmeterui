import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { whtowhinwardimportData } from '../wh-to-wh-inward-list/wh-to-wh-inward-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-return-to-supplier',
  templateUrl: './return-to-supplier.component.html',
  styleUrls: ['./return-to-supplier.component.css']
})
export class ReturnToSupplierComponent implements OnInit {

  selectedIndex=0;

  isLoading=false;
  spinner = false;
  totalRows = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filtered=false;
  currentPage=0;
  isDetailsEditable: boolean=false;
  isNavigation: boolean=false;
  detailData:ReturnToSupplierData;

  discomSearch: string='';
  supplierSearch:string='';
  itemGroupSearch:string='';
  itemModelNameSearch:string='';
  // paginator: any;
  dataSource=new MatTableDataSource<any>();
  displayedColumns:string[]=['discom','warehouseName','supplier','dc',
                           'itemGroup','itemModelName','itemSupplier','itemCategory',
                          'transporter','lrNo','vehicleNo','driverName','contactNo','remark'];

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator =this.paginator;
    this.loadData();
    this.isDetailsEditable=true;
  }
  Discom:string='123';
  loadData(){
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_RETURN_TO_SUBCONTRACTOR_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: ReturnToSupplierData[] = result.data.content as ReturnToSupplierData[];

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
    queryParams['supplier'] = this.supplierSearch;
    queryParams['itemGroup'] = this.itemGroupSearch;
    queryParams['itemModelName'] = this.itemModelNameSearch;

    this.restClient.getwithParam('/inventory/filterReturnToSupplier',queryParams)
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
  navToDetails(row:any){
    this.selectedIndex=1;
    this.detailData=row;
  }

  onChangePage(pe: PageEvent){
    // this.pageSize = pe.pageSize;
    //  this.currentPage = pe.pageIndex;
    //  if (this.filtered) {
    //    this.fetchFilteredData();
    //  } else {
    //    this.loadData();
    //  }

    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = pe.pageIndex;
    queryParams['size'] = pe.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_RETURN_TO_SUBCONTRACTOR_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: ReturnToSupplierData[] = result.data.content as ReturnToSupplierData[];

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
  loadListTab(){
    this.selectedIndex=0;
    this.loadData();
  }
  fetchFilteredData() {
    throw new Error('Method not implemented.');
  }

  addNewreturn(){
    this.isNavigation = false;
    this.selectedIndex = 1;
  }


}
export interface ReturnToSupplierData{
  id: string
  discom: string
  warehouseName: string
  supplier: string
  dc: string
  dcDate: string
  dispatchDate: string
  itemGroup: string
  itemModelName: string
  itemSupplier: string
  itemCategory: string
  quantity: number
  itemStatus: string
  transporter: string
  lrNo: string
  vehicleNo: string
  driverName: string
  contactNo: string
  remark: string
  lrDate: string
}

export interface RoleList {
  discom?: string;
  supplier?:string;
  itemGroup? :string;
  itemModelName? : string;
}
