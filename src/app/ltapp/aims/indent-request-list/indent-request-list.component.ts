import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-indent-request-list',
  templateUrl: './indent-request-list.component.html',
  styleUrls: ['./indent-request-list.component.css']
})
export class IndentRequestListComponent implements OnInit {


  selectedIndex=0;
  spinner = false;
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100]
  @ViewChild(MatPaginator) paginator: MatPaginator;
@Input()
isNavigation: boolean = false;
@Input()
isEditable: boolean = false;
filtered=false;

indentReqData:IndentReqData={
  id:'',
  agencyType:'',
  agencyName:'',
  warehouse:'',
  indentDate:'',
  authPerson:'',
  contactNo:'',
  approver:'',
  remark:'',
  items:[]
}

makeReadOnly:boolean=false;

displayedColumns:string[]=['warehouse','indentNo','indentDate'
,'agencyName','agencyType','authPerson','itemGroup','itemName'
,'supplier','reqQty','appQty','DispatchedQty','status'];

dataSource = new MatTableDataSource<any>();

  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.loadData();
    this.isEditable=true;
  }

  loadListTab(){
    this.selectedIndex=0;
    this.loadData();
  }

  addNewIndentReq():void{
    this.isNavigation = false;
    this.selectedIndex = 1;
    this.makeReadOnly=false;
    alert(this.makeReadOnly)
    this.indentReqData={
    //   warehouse:'',
    // indentNo:'',
    // indentDate:'',
    // agencyName:'',
    // agencyType:'',
    // authPerson:'',
    // itemGroup:'',
    // itemName:'',
    // supplier:'',
    // reqQty:'',
    // appQty:'',
    // DispatchedQty:'',
    // status:'',
    id:'',
  agencyType:'',
  agencyName:'',
  warehouse:'',
  indentDate:'',
  authPerson:'',
  contactNo:'',
  approver:'',
  remark:'',
  items:[]
    }
  }

  loadData():void{

    var queryParam:any={};
    queryParam['page']=this.currentPage;
    queryParam['size']=this.pageSize;

    this.restClient.getwithParam(environment.BASE_URL+'/indent/',queryParam).subscribe({
      next:(result:APIResponse)=>{
        var content=result.data.content;
        this.dataSource.data=content;
      }
    })

    // var content: IndentReqData[] = [{warehouse:'warehouse1',indentNo:'warehouse1',indentDate:'warehouse1'
    // ,agencyName:'warehouse1',agencyType:'warehouse1',authPerson:'warehouse1',itemGroup:'warehouse1',itemName:'warehouse1'
    // ,supplier:'warehouse1',reqQty:'warehouse1',appQty:'warehouse1',DispatchedQty:'warehouse1',status:'active'}] as IndentReqData[];
    // this.dataSource.data = content;
  }
  

  navToDetails(row:any){
    this.selectedIndex=1;
    this.makeReadOnly=true;
    this.indentReqData=row;

var queryParam:any={};
queryParam['indentNo']=row.id;

    this.restClient.getwithParam(environment.BASE_URL+'/indent/getByIndentNo',queryParam).subscribe({
      next:(result:APIResponse)=>{
        this.indentReqData.items=result.data;
        
      }
    })
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

  fetchFilteredData(){}

  


}

export interface IndentReqData{
  id:string ,
  agencyType:string ,
  agencyName:string ,
  warehouse:string ,
  indentDate:string ,
  authPerson:string ,
  contactNo:string ,
  approver:string ,
  remark:string ,
  items:AimsIndentFeilds[]
}

export interface ItemsList{
  id: string,
  itemGroup: string,
  itemCategory: string,
  itemModelName: string,
  supplier: string,
  reqQuantity: string,
  approvQuantity: string,
  dispatchedQuantity: string,
  status: string
}

export interface IndentReqDetailsData{
  warehouse:string;
// indentNo:string;
indentDate:string;
agencyName:string;
agencyType:string;
authPerson:string;
indentItemList:AimsIndentFeilds[];
// itemGroup:string;
// itemName:string;
// supplier:string;
// reqQty:string;
// appQty:string;
// DispatchedQty:string;
// status:string;
remarks:string;
contactNo:string;
approver:string;
}

export interface AimsIndentFeilds{
  id:string;
  itemGroup:string;
  itemCategory:string;
  itemModelName:string;
  supplier:string;
  approvQuantity:string;
}