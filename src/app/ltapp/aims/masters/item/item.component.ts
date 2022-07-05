import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  selectedIndex=0;
  iteamModelNameSearch:string='';
  isLoading=false;
  spinner = false;
  totalRows = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  filtered=false;
  currentPage=0;
  isDetailsEditable: boolean=false;
  isNavigation: boolean=false;
  dataSource=new MatTableDataSource<any>();
  displayedColumns:string[]=['itemGroup','itemCategory','supplier','itemModelName','id','uom',
   'itemHsn', 'warrantyMonth','remarks'];
   itemData:ItemClass={
    id:0,
    itemGroup:'',
    itemModelName:'',
    itemDescription:'',
    // itemModelCode:'',
    itemCategory:'',
    itemHsn:'',
    supplier:'',
    warrantyMonth:'',
    remarks:'',
    uom:'',
    status:'',
  }
  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.loadData();
    this.isDetailsEditable=true;
    this.dataSource.paginator = this.paginator;
  }


  loadData() {
    this.isLoading = true;
    this.filtered = false;
var queryParam:any={};
queryParam['page']=this.currentPage;
queryParam['size']=this.pageSize;

this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_FIND_ALL_ITEM_DATA,queryParam).subscribe({
  next:(result:any)=>{
    var content : ItemClass[] = result.data.content as ItemClass[];

    this.dataSource.data=content;
    this.totalRows=result.data.totalElements;
  },
  error: (err: any) => {
    console.log(err);

    let snackBarRef = this.snackBar.open('Server Error', 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
    // this.spinner = false;
  },
  complete: () => {
    console.log('item fetched');

    // this.spinner = false;
  },
})

    
  }

  filterItemModelName(){
    this.iteamModelNameSearch;
    var queryParam:any={};
    // queryParam['itemM']=this.iteamNameSearch;
    queryParam['page']=this.currentPage;
    queryParam['size']=this.pageSize;
    this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_FILTER_BY_ITEM_MAKE,queryParam).subscribe({
      next:(result:any)=>{
        alert(result.data.content)
        var content : ItemClass[] = result.data.content as ItemClass[];

    this.dataSource.data=content;
      }
    })
  }

  // navToDetails(row:any){
  //   this.spinner = true;
 
  //   var queryParams: any ={};
  //   queryParams['itemModelName'] = row.itemModelName;
  //   this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_NAV_TO_DETAILS_DATA, queryParams)
  //   .subscribe({
  //     next:(result: APIResponse) => {
  //       let ItemModuleName = result.data as ItemClass;
        
  //       this.itemData = {
  //         id:ItemModuleName.id,
  //         ItemGroup:ItemModuleName.ItemGroup,
  //         itemModelName:ItemModuleName.itemModelName,
  //         itemCategory:ItemModuleName.itemCategory,
  //         supplier:ItemModuleName.supplier,
  //         itemDescription:ItemModuleName.itemDescription,
  //         itemModelCode:ItemModuleName.itemModelCode,
  //         itemHsn:ItemModuleName.itemHsn,
  //         warrantyMonth:ItemModuleName.warrantyMonth,
  //         remarks:ItemModuleName.remarks,
  //         uom:ItemModuleName.uom,
  //         status:ItemModuleName.status,

         
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
  //    // this.itemCategoryResponse=row;
 
  //  }

  onChangePage(pe:PageEvent) {
    this.pageSize=pe.pageSize;
    this.currentPage=pe.pageIndex;
    if(this.filtered){
      this.filterItemModelName();
    }else{
      this.loadData();
    }

  }
    navToDetails(row:any){
      this.isNavigation=true;
      this.selectedIndex=1;
      this.itemData=row;
  
    }
 
  addNewItem(){
    this.selectedIndex=1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
  }


}
export interface ItemClass{
  id:number
  itemGroup:string;
  itemModelName:string;
  // itemModelCode:string;
  itemCategory:string;
  supplier:string;
  itemDescription:string;
  itemHsn:string;
  warrantyMonth:string;
  remarks:string;
  uom:string;
   status:string;
 
}

