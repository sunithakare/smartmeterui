import { saveAs } from 'file-saver';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-warehouse-creation',
  templateUrl: './warehouse-creation.component.html',
  styleUrls: ['./warehouse-creation.component.css']
})
export class WarehouseCreationComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  isLoading=false;
  totalRows = 0;
  pageSize= 15;
  currentPage= 0;
  pageSizeOptions: number[]=[20,40,60,80,100];
  filtered:false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort:MatSort;
@Input()
isNavigation: boolean = false;
@Input()
isEditable: boolean = false;

paginatorRef:any={};


warehouseList:WarehouseListData={
  id:'',
  srno:'',
  // discom:'',
  warehouseName:'',
  warehouseCode:'',
  contactPerson:'',
  address:'',
  // state:'',
  // city:'',
  pincode:'',
  contactNumber:'',
  emailId:'',
  space:'',
  status:'',
  uom:'',
  discomDetails:[],
  deleteItem:[],

};

  dataSource = new MatTableDataSource<any>();
  discomSearch:string='';
  stateSearch:string='';
  citySearch:string='';
  displayedColumns: string[]=['srno','discom','warehouseName','warehouseCode','contactPerson','address','state','city','pincode','contactNumber','emailId','space'];

  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isEditable=true;





  }

  loadData():void{
    var queryParam:any={};
    queryParam['page']=this.currentPage;
    queryParam['size']=this.pageSize;


        this.restClient.getwithParam(environment.BASE_URL+'/warehouse/',queryParam).subscribe({
          next:(result:PageableResponse)=>{
            var content:WarehouseListData[]=result.data.content as WarehouseListData[];
            this.dataSource.data=content;
            this.totalRows = result.data.totalElements;
          }
        })
  }

  navToDetails(row:any){
    // this.selectedIndex=1;

    // var queryParam:any={};
    // queryParam['warehouseName']=row.warehouseName;
    // this.warehouseList=row;


    this.isNavigation=true;
    this.selectedIndex=1;
    this.warehouseList=row;

// this.restClient.getwithParam(environment.BASE_URL+'/AimsMastersWarehouse/findByWarehouseName',queryParam).subscribe({
//   next:(result:APIResponse)=>{
//     this.warehouseList=result.data as WarehouseListData;
//     this.isNavigation = false;

//   }

// })


  }



  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if (this.filtered) {
      this.fetchFilteredData();
    } else {
      this.loadData();
    }
  }



  addNewWarehouse(){
    this.isNavigation = true;
    this.selectedIndex = 1;
    this.warehouseList={
      id:'',
      srno:'',
      // discom:'',
      warehouseName:'',
      warehouseCode:'',
      contactPerson:'',
      address:'',
      // state:'',
      // city:'',
      pincode:'',
      contactNumber:'',
      emailId:'',
      space:'',
      status:'',
      uom:'',
      discomDetails:[],
      deleteItem:[],
    };
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
    this.filtered=false;

    var queryParams : any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom'] = this.discomSearch;
    queryParams['state'] = this.stateSearch;
    queryParams['city'] = this.citySearch;

    this.restClient.getwithParam('/itemModelName/getAllItemFilter',queryParams)
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

export interface WarehouseListData{
  id:string;
  srno:string;
  // discom:string;
  warehouseName:string;
  warehouseCode:string;
  contactPerson:string;
  address:string;
  // state:string;
  // city:string;
  pincode:string;
  contactNumber:string;
  emailId:string;
  space:string;
  status:string;
  uom:string;
  discomDetails:WarehouseItems[];
  deleteItem:[];


}
export interface WarehouseItems{
  id:string;
  state:string;
  discom:string;
  city:string;
}

export interface DeleteList{
  id:string;
}

export interface RoleList {
  discom?: string;
  state? :string;
  city? : string;
}

