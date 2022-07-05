import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-group-list',
  templateUrl: './item-group-list.component.html',
  styleUrls: ['./item-group-list.component.css']
})
export class ItemGroupListComponent implements OnInit {
  filtered=false;
  isLoading =false;
  selectedIndex = 0;
  spinner = false;
  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;
  totalRows= 0;
  pageSize= 15;
  currentPage= 0;
  pageSizeOptions: number[]=[15, 20, 25, 100];
   @ViewChild(MatPaginator) paginator:MatPaginator;
   @ViewChild(MatSort) sort:MatSort;

   displayedColumns: string[]=['id','itemGroup', 'transactionMechnsm'];
   dataSource= new MatTableDataSource<any>();

   isDisabled=false;

   itemGroup='';
  //  status='';

  //  itemGroupDetails:ItemGroupData={
  //  itemGroup:'',
  //  transactionMechnsm:'',
  //  itemCode:'',
  //  status:'',
  //  userErrorMsgList:[]
  //  }

   itemGroupResponse:ItemGroupData={
   id:0,
   itemGroup:'',
   transactionMechnsm:'',
   status:'',
   errors:[]
   }
  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loadItemGroupData();
    this.dataSource.paginator = this.paginator;
    this.isDetailsEditable=true;
  }
  loadItemGroupData(){
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    this.restClient
    .getwithParam(environment. INVENTORY_MASTERS_ITEM_GROUP_LIST_DATA, queryParams)
    .subscribe({
      next: (result: PageableResponse) => {
        var content: ItemGroupData[] = result.data.content as ItemGroupData[];

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
        console.log('Item Group List Fetch Complete ');
        this.isLoading = false;
        this.selectedIndex=0;
      },
    });

  }
  fetchFilteredData(){
    this.isLoading=true;
    this.filtered=true;

    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['itemGroup'] = this.itemGroup;
    // queryParams['status'] =this.status;

    this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_GROUP_FILTER_DATA, queryParams ).subscribe({
      next: (result: PageableResponse) => {
        var content: ItemGroupData[] = result.data.content as ItemGroupData[];

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
  onChangePage(pe: PageEvent) {
    this.pageSize=pe.pageSize;
    this.currentPage=pe.pageIndex;
    if(this.filtered){
      this.fetchFilteredData();
    }else{
      this.loadItemGroupData();
    }

   }
  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
  }

  navToDetails(row:any){
    // this.spinner = true;

    this.isDisabled=false;
    var queryParams: any ={};
    queryParams['itemGroup'] = row.itemGroup;
    this.isNavigation=true;
        this.selectedIndex=1;
    this.itemGroupResponse=row;

    // this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_GROUP_NAV_TO_DETAILS_DETAILS_DATA, queryParams)
    // .subscribe({
    //   next:(result: APIResponse) => {
    //     let ItemGroupNav = result.data as ItemGroupData;
    //     this.itemGroupResponse = {
    //       id:ItemGroupNav.id,
    //       itemGroup: ItemGroupNav.itemGroup,
    //       transactionMechnsm:ItemGroupNav.transactionMechnsm,
    //       status: ItemGroupNav.status,
    //       errors:ItemGroupNav.errors,

    //     };
    //     this.isNavigation=true;
    //     this.selectedIndex=1;
    //   },
    //   error: (err: any) => {
    //    console.log(err);
    //    let snackBarRef = this.snackBar.open('Server Error', 'close', {
    //      horizontalPosition: 'center',
    //      verticalPosition: 'bottom',
    //      duration: 3000,
    //    });
    //    this.spinner = false;
    //  },
    //  complete: () => {
    //    console.log('Item Category Fetch Complete ');
    //    this.spinner = false;
    //  }
    // });
  }
  addNewItemGroupData(){
    // this.itemGroupResponse=undefined;
    this.itemGroupResponse={
      id:0,
      itemGroup:'',
      transactionMechnsm:'',
      status:'',
      errors:[]
      }
    this.isNavigation=false;
    this.selectedIndex=1;
    this.isDisabled=true;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadItemGroupData();
  }
}
export interface ItemGroupData{
   id:number
  itemGroup:string
  transactionMechnsm:string
  status:string;
  errors:UserErrorMsgData[]
}
export interface UserErrorMsgData{
  errorCode:string
  errorDescription:string

}
