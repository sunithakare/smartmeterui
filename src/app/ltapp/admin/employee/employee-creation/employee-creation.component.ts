import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment, roleConfig, roleType } from 'src/environments/environment';

@Component({
  selector: 'app-employee-creation',
  templateUrl: './employee-creation.component.html',
  styleUrls: ['./employee-creation.component.css']
})
export class EmployeeCreationComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  isLoading = false;

  userNameSearch:string='';
  empIdSearch:string='';
  roleSearch:string='';
  detailResponse:EmployeeDetails;

  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  displayedColumns: string[] = ['userName', 'empId','state','doj', 'dor','roleName','roleCategory','active'];

  dataSource = new MatTableDataSource<EmployeeListDetails>();



  filtered: boolean = false;

  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;


  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isDetailsEditable=this.authservice.checkPermission(roleType.ADMIN,roleConfig.EmployeeCreation) || this.authservice.checkPermission(roleType.MANAGER,roleConfig.EmployeeCreation);

  }

  loadData() {
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;

    this.restClient
      .getwithParam(environment.SLAREPORTS_EMPLOYEE_LIST_API, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: EmployeeListDetails[] = result.data.content as EmployeeListDetails[];

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
          console.log('Role List Fetch Complete ');
          this.isLoading = false;
        },
      });
  }


  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchFilteredData() {
    this.isLoading = true;
    this.filtered = true;

    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['userName'] = this.userNameSearch;
    queryParams['role'] = this.roleSearch;
    queryParams['empId'] = this.empIdSearch;

    this.restClient
      .getwithParam(
        environment.SLAREPORTS_EMPLOYEE_LIST_FILTER_API,
        queryParams
      )
      .subscribe({
        next: (result: PageableResponse) => {
          var content: EmployeeListDetails[] = result.data.content as EmployeeListDetails[];

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
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if (this.filtered) {
      this.fetchFilteredData();
    } else {
      this.loadData();
    }
  }

  showDetails(row: any) {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['empId'] = row.employeeId;

    this.restClient
      .getwithParam(
        environment.SLAREPORTS_FETCH_EMPLOYEE,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          let empData = result.data as EmployeeDetails;
          this.detailResponse = empData;
          this.isNavigation = true;
          this.selectedIndex = 1;
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Server Error', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.spinner = false;
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
          this.spinner = false;
        },
      });
  }

  addNewEmployee() {
    this.detailResponse = {
      active:true,
      doj:new Date(),
      dor:null,
      empId: '',
      empName: '',
      role:  '',
      roleCategory:'',
      state:   '',
      documentList: [],
    }

    this.isNavigation = false;
    this.selectedIndex = 1;
  }

  loadListTab() {
    this.selectedIndex = 0;
    this.loadData();
  }

}
export interface EmployeeListDetails {
  state:        string;
  active:       boolean;
  employeeId:   string;
  roleName:     string;
  roleCategory: string;
  employeeName: string;
  dor:          Date;
  doj:          Date;
}
export interface EmployeeDetails {
  active:       boolean;
  doj:          Date;
  dor:          Date|null;
  empId:        string;
  empName:      string;
  role:         string;
  roleCategory: string;
  state:        string;
  documentList: EmployeeDocumentList[];
}

export interface EmployeeDocumentList {
  documentType: string;
  documentName: string;
  documentId:   string;
}
