import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-old-meter-inward',
  templateUrl: './old-meter-inward.component.html',
  styleUrls: ['./old-meter-inward.component.css']
})
export class OldMeterInwardComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  detailData:OldMeterInwardListData;
@Input()
isNavigation: boolean = false;
@Input()
isEditable: boolean = false;
filtered=false;
dataSource = new MatTableDataSource<any>();

discomFilter:string='';
 discom:string='';
 displayedColumns: string[] = ['discom','warehouse','subcontractorType','subcontractor','docNo','invoiceDate','ginNo','grnDate',
                               'itemStatus','quantity','transporter','lrNo','vehicleNo','driverName','contactNo','remark'];

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService,

  ) {

  }


  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isEditable=true;
  }

  Discom:string='123';
  loadData():void{
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_OLD_METER_INWARD_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: OldMeterInwardListData[] = result.data.content as OldMeterInwardListData[];

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
  fetchFilteredData(){}

  navToDetails(row:any){
    this.selectedIndex=1;
    this.detailData=row;
  }
  addNewOldInwardMeter():void{
    this.isNavigation=false;
    this.selectedIndex=1;
  }
  onChangePage(pe: PageEvent) {
    // this.pageSize = pe.pageSize;
    // this.currentPage = pe.pageIndex;
    // if (this.filtered) {
    //   this.fetchFilteredData();
    // } else {
    //   this.loadData();
    // }
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = pe.pageIndex;
    queryParams['size'] = pe.pageSize;
    queryParams['discom']=this.Discom;
    this.restClient
      .getwithParam(environment.INVENTORY_OLD_METER_INWARD_LIST_DATA, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: OldMeterInwardListData[] = result.data.content as OldMeterInwardListData[];

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
    this.selectedIndex = 0;
    this.loadData();
  }

}
export interface OldMeterInwardListData{
  id: string
  discom: string
  warehouse: string
  subcontractorType: string
  subcontractor: string
  docNo: string
  invoiceDate: string
  ginNo: string
  grnDate: string
  itemStatus: string
  quantity: string
  transporter: string
  lrNo: string
  vehicleNo: string
  driverName: string
  contactNo: string
  remark: string
}
