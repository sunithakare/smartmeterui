import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-indent-approver',
  templateUrl: './indent-approver.component.html',
  styleUrls: ['./indent-approver.component.css']
})
export class IndentApproverComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

isNavigation: boolean = false;

isEditable: boolean = false;
filtered=false;


indentAproData:IndentAproData={
  warehouse: '',
  indentDate: '',
  agencyName: '',
  agencyType: '',
  authPerson: '',
  items: [],
  remark: '',
  contactNo: '',
  indentNo: '',
  id:''
}

discom: string='';
dataSource = new MatTableDataSource<any>();
displayedColumns:string[] = ['warehouse','id','indentDate'
,'agencyName','agencyType','authPerson','itemGroup','itemName'
,'supplier','reqQty','appQty','DispatchedQty','status'];


  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.isEditable=true;
  }

  loadData():void{
    // var content: IndentApproverData[] = [{warehouse:'warehouse1',indentNo:'warehouse1',indentDate:'warehouse1'
    // ,agencyName:'warehouse1',agencyType:'warehouse1',authPerson:'warehouse1',itemGroup:'warehouse1',itemName:'warehouse1'
    // ,supplier:'warehouse1',reqQty:'warehouse1',appQty:'warehouse1',DispatchedQty:'warehouse1',status:'active'}] as IndentApproverData[];
    // this.dataSource.data = content;

    var queryParam:any={};
    queryParam['page']=this.currentPage;
    queryParam['size']=this.pageSize;

    this.restClient.getwithParam(environment.BASE_URL+'/approver/fetchAll',queryParam)
    .subscribe({
      next:(result:APIResponse)=>{
        var content=result.data.content;
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
        console.log('Indent Approver List Fetch Complete ');
        this.isLoading = false;
      },
    })

  }

  loadListTab(){
    this.selectedIndex=0;
    this.loadData();
  }

  addNewIndentApprover():void{

    this.indentAproData={
      warehouse: '',
      indentDate: '',
      agencyName: '',
      agencyType: '',
      authPerson: '',
      items: [],
      remark: '',
      contactNo: '',
      indentNo: '',
      id:'',
    }
    this.isNavigation = false;
    this.selectedIndex = 1;
  }

  navToDetails(row:any){
    this.indentAproData=row;
    this.selectedIndex = 1;
  }

  onChangePage(pe: PageEvent) {
    this.isLoading=true;
    this.filtered=false;
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if (this.filtered) {
      this.fetchFilteredData();
    } else {
      this.loadData();
    }
  }

  fetchFilteredData(){}

}
export interface IndentApproverData{
  id:string;
warehouse:string;
indentNo:string;
indentDate:string;
agencyName:string;
agencyType:string;
authPerson:string;
itemGroup:string;
itemName:string;
supplier:string;
reqQty:string;
appQty:string;
DispatchedQty:string;
status:string;
}

export interface IndentAproData{
warehouse:string;
indentDate:string;
agencyName:string;
agencyType:string;
authPerson:string;
items:AimsIndentApproverFields[];
remark:string;
contactNo:string;
indentNo:string;
id:string;
}

export interface AimsIndentApproverFields{
  itemGroup:string;
  itemCategory:string;
  itemModelName:string;
  supplier:string;
  qty:string;
  approverQty:string;
  action:string;
}



