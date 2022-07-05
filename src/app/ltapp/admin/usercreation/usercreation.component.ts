import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
  PageableResponse,
} from 'src/app/services/httpclient.service';
import { environment, roleConfig, roleType } from 'src/environments/environment';
import { RoleDetail, RoleList } from '../rolecreation/rolecreation.component';
import { UserData } from './userdetails/userdetails.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usercreation',
  templateUrl: './usercreation.component.html',
  styleUrls: ['./usercreation.component.css']
})
export class UsercreationComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
  fetchUrl: string = '';
  // for tab 1
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'userName', 'firstName', 'employeeId'];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<UsersList>();

  detailResposne: RoleDetail = {
    module: '',
    roleName: '',
    roleType: '',
    roleDesc: '',
    permissionsList: [],
    asignedPermission: [],
  };

  systemIdSearch: string = '';
  userIdSearch: string = '';
  firstNameSearch: string = '';
  employeeIdSearch: string = '';
  filtered: boolean = false;

  isDetailsEditable: boolean = true;
  isNavigation: boolean = false;

  userDetail: UserData;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) {}


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isDetailsEditable=this.authservice.checkPermission(roleType.ADMIN,roleConfig.UserCreation) || this.authservice.checkPermission(roleType.MANAGER,roleConfig.UserCreation);

  }

  loadData() {
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;

    this.restClient
      .getwithParam(environment.FETCH_USERS_API, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: UsersList[] = result.data.content as UsersList[];
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
          console.log('User List Fetch Complete ');
          this.isLoading = false;
        },
      });
  }
  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
  }
  fetchFilteredData() {
    this.isLoading = true;
    this.filtered = true;

    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['userName'] = this.userIdSearch;
    queryParams['firstName'] = this.firstNameSearch;
    queryParams['employeeId'] = this.employeeIdSearch;

    this.restClient
      .getwithParam(
        environment.FETCH_USERS_WITH_FILTER_API,
        queryParams
      )
      .subscribe({
        next: (result: PageableResponse) => {
          var content: UsersList[] = result.data.content as UsersList[];

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
    queryParams['user'] = row.userName;
   this.restClient
      .getwithParam(
        environment.FETCH_USER_DATA_API,queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.userDetail= result.data as UserData;
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
          console.log('User Data Fetch Complete ');
          this.spinner = false;
        },
      });

  }


  addNewUser() {
    this.userDetail={
      firstName:      '',
      lastName:       '',
      orgName:        '',
      employeeId:     '',
      email:          '',
      phonoNo:        '',
      userId:        '',
      discomDataList: [],
      userRolesList:  []
    }

    this.isNavigation = false;
    this.selectedIndex = 1;
  }
  loadListTab() {
    this.selectedIndex = 0;
    this.loadData();
  }
}
export interface UsersList {
  id:         number;
  userName:   string;
  employeeId: string;
  firstName:  string;
}
