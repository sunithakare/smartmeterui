import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-masters-supplier-list',
  templateUrl: './masters-supplier-list.component.html',
  styleUrls: ['./masters-supplier-list.component.css']
})
export class MastersSupplierListComponent implements OnInit {
  selectedIndex=0;
  isLoading=false;
  spinner = false;
  totalRows = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  filtered=false;
  currentPage=0;
  isDetailsEditable: boolean=false;
  isNavigation: boolean=false;
  paginator: any;
  dataSource=new MatTableDataSource<any>();
  // @ViewChild
  // (MatPaginator) paginator:MatPaginator;
  @ViewChild
  (MatSort) sort:MatSort
  displayedColumns:string[]=[
    'sno','supplierCode','supplier','contactPerson',
  'state','city','mobileNumber','gstinNo','status'];

  contactPersonSearch:string='';
  supplierCodeSearch:string='';
  supplierSearch:string='';
  // supplierDetailsResponse:supplierData={
  //   supplier:'',
  //   contactPerson:'',
  //   state:'',
  //   supplierCode:'',
  //   city:'',
  //   address:'',
  //   mobileNumber:0,
  //   email:'',
  //   status:'',
  //   gstinNo:'',
  //   remark:'',

  //   itemGroupList:[]
  // }

  supplierDetailsResponse:supplierData={
    id:"",
    supplier:'',
    contactPerson:'',
    state:'',
    supplierCode:'',
    city:'',
    address:'',
    mobileNumber:0,
    email:'',
    status:'',
    gstinNo:'',
    remark:'',
    groups:[{groupName:'item1'},{groupName:'item2'}]
  }
  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.dataSource.paginator = this.paginator;
    this.isDetailsEditable=true;
  }
  loadData(){
    this.isDetailsEditable=true;
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
   // queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_MASTER_LIST_FETCH, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: supplierData[] = result.data.content as supplierData[];

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
  navToDetails(row:any){
    this.isNavigation=true;
    this.selectedIndex=1;
    this.supplierDetailsResponse=row;

  }

// navToDetails(row:any){
//   this.spinner = true;

//   var queryParams: any ={};
//  // queryParams['supplier'] = row.supplier;
//  // queryParams['itemGroup'] = row.itemGroup;
//   // queryParams['page'] = this.currentPage;
//   //   queryParams['size'] = this.pageSize;
//   this.restClient.get(environment.INVENTORY_MASTERS_AIMS_SUPPLIER_DETAILS)
//   .subscribe({
//     next:(result: APIResponse) => {
//       let supplierDetailsData = result.data as supplierData;
//       this.supplierDetailsResponse = {
//         supplier: supplierDetailsData.supplier,
//         contactPerson: supplierDetailsData.contactPerson,
//         state: supplierDetailsData.state,
//         supplierCode: supplierDetailsData.supplierCode,
//         city:supplierDetailsData.city,
//         address:supplierDetailsData.address,
//         mobileNumber:supplierDetailsData.mobileNumber,
//         email:supplierDetailsData.email,
//         status:supplierDetailsData.status,
//         gstinNo:supplierDetailsData.gstinNo,
//         remark:supplierDetailsData.remark,
//         groups:supplierDetailsData.groups
//       };
//       this.isNavigation=true;
//       this.selectedIndex=1;
//     },
//     error: (err: any) => {
//      console.log(err);
//      let snackBarRef = this.snackBar.open('Server Error', 'close', {
//        horizontalPosition: 'center',
//        verticalPosition: 'bottom',
//        duration: 3000,
//      });
//      this.spinner = false;
//    },
//    complete: () => {
//      console.log('Item Category Fetch Complete ');
//      this.spinner = false;
//    }
//   });


//  }

  onChangePage(pe: PageEvent){
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;

  }
  addNewMasterSupplier(){
    this.isNavigation=false;
    this.selectedIndex=1;
    this.supplierDetailsResponse={
      id:"",
      supplier:'',
      contactPerson:'',
      state:'',
      supplierCode:'',
      city:'',
      address:'',
      mobileNumber:0,
      email:'',
      status:'',
      gstinNo:'',
      remark:'',
      groups:[]
    }
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
  }

  searchWithFilter(){
    this.currentPage = 0;
    this.fetchFilteredData();
  }
  fetchFilteredData():void{
    this.isLoading=true;
    this.filtered=true;

    var queryParams : any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['contactPerson'] = this.contactPersonSearch;
    queryParams['supplier'] = this.supplierSearch;
    queryParams['supplierCode'] = this.supplierCodeSearch;

    this.restClient.getwithParam('/supplier/getAllSupplierFilter',queryParams)
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
export interface supplierData{
  id:string;
  supplier:string
	contactPerson:string
	state:string
	supplierCode:string
	city:string
	address:string
	mobileNumber:number
	email:string
	status:string
	gstinNo:string
	remark:string
  groups:SupplierItems[]

}
export interface SupplierItems{
  groupName:string

}
export interface RoleList {
  supplierCode?: string;
  supplier? :string;
  contactPerson? : string;
}
