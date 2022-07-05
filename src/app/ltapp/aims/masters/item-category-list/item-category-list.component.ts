import { APIResponse } from './../../../../services/httpclient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.css']
})
export class ItemCategoryListComponent implements OnInit {

  filtered=false;
  isLoading =false;
  selectedIndex = 0;
  spinner = false;
  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;
  isEditable: boolean = false;
  totalRows= 0;
  pageSize= 15;
  currentPage= 0;
  pageSizeOptions: number[]=[20,40,60,80,100];
   @ViewChild(MatPaginator) paginator:MatPaginator;
   @ViewChild(MatSort) sort:MatSort;

   displayedColumns: string[]=['id','itemCategory','itemGroup','remark','status'];
   dataSource= new MatTableDataSource<any>();

   itemCategoryResponse:ItemCategory = {
    id: 0,
    itemCategory: '',
    remark: '',
    status: '',
    itemGroup: ''

   };

   itemCategory : string='';
   status : string='';
  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loadItemCategoryData();
    this.dataSource.paginator = this.paginator;
    this.isDetailsEditable=true;
  }
  loadItemCategoryData(){
    this.isLoading = true;
    this.filtered = false;
    var queryParam:any={};
    queryParam['page']=this.currentPage;
    queryParam['size']=this.pageSize;
    this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_CATEGORY_FIND_ALL_ITEM_TYPE,queryParam).subscribe({
      next:(result:APIResponse)=>{
        var content:ItemCategory[]=result.data.content as ItemCategory[];
    this.dataSource.data=content;
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
        console.log('Item Category List Fetch Complete');
        this.isLoading = false;
        this.selectedIndex=0;
      },
    })


  }

  searchWithFilter(){
    this.currentPage = 0;
    this.fetchFilteredData();
  }

  fetchFilteredData():void{
    this.isLoading = true;
    this.filtered =true;

    var queryParams: any = {};
    queryParams['page']=this.currentPage;
    queryParams['size']=this.pageSize;
    queryParams['itemCategory']=this.itemCategory;
    queryParams['status']=this.status;

    this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_CATEGORY_FILTER_API, queryParams)
    .subscribe({
      next: (result:PageableResponse)=>{
        var content: ItemCategory[] = result.data.content as ItemCategory[];
        this.dataSource.data=content;
        this.totalRows=result.data.totalElements;
        if(content.length == 0){
          let snackBarRef=this.snackBar.open(
            'No data found here for filter','close',
            {
              horizontalPosition:'center',
              verticalPosition:'bottom',
              duration:2000,
            }
          );
        }
      },
      error:(err:any)=>{
        console.log(err);
        this.isLoading=false;
      },
      complete:()=>{
        console.log('successful');
        this.isLoading=false;
      },
    });

  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if(this.filtered){
      this.fetchFilteredData();
    }else{
      this.loadItemCategoryData();
    }
  }

  navToDetails(row:any){

   this.isNavigation=true;
    this.selectedIndex=1;
    this.itemCategoryResponse=row;
  // this.spinner = true;
  //  var queryParams: any ={};
  //  queryParams['Active'] = row.status;
  //  this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_CATEGORY_DETAILS_DATA, queryParams)
  //  .subscribe({
  //    next:(result: APIResponse) => {
  //      let itemCategoryData = result.data as ItemCategory;
  //      this.itemCategoryResponse = {
  //        id: itemCategoryData.id,
  //        itemCategory: itemCategoryData.itemCategory,
  //        remark: itemCategoryData.remark,
  //        status: itemCategoryData.status,
  //        itemGroup:itemCategoryData.itemGroup
  //      };
  //      this.isNavigation=true;
  //      this.selectedIndex=1;
  //    },
  //    error: (err: any) => {
  //     console.log(err);
  //     let snackBarRef = this.snackBar.open('Server Error', 'close', {
  //       horizontalPosition: 'center',
  //       verticalPosition: 'bottom',
  //       duration: 3000,
  //     });
  //     this.spinner = false;
  //   },
  //   complete: () => {
  //     console.log('Item Category Fetch Complete ');
  //     this.spinner = false;
  //   }
  //  });

  }
  addNewItemCategoryData(){
    this.itemCategoryResponse = {
      id: 0,
  itemCategory: '',
  remark: '',
  status: '',
  itemGroup: ''
    };
     this.isNavigation=false;
     this.selectedIndex=1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadItemCategoryData();
  }

}

export interface ItemCategory{
  id: number
  itemCategory: string
  remark: string
  status: string
  itemGroup: string
}
