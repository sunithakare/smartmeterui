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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role-creation',
  templateUrl: './role-creation.component.html',
  styleUrls: ['./role-creation.component.css'],
})
export class RoleCreationComponent implements OnInit {
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

  displayedColumns: string[] = ['roleName', 'roleType'];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<RoleList>();

  detailResponse: RoleDetail = {
    module: '',
    roleName: '',
    roleType: '',
    roleDesc: '',
    permissionsList: [],
    asignedPermission: [],
  };

  roleNameSearch: string = '';
  roleTypeSearch: string = 'VIEWER';
  filtered: boolean = false;
  roleTypeSelector: ConfigCode[] = [];

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
    this.fetchRoleTypeList();
    this.isDetailsEditable=this.authservice.checkPermission(roleType.ADMIN,roleConfig.RoleCreation) || this.authservice.checkPermission(roleType.MANAGER,roleConfig.RoleCreation);

  }

  loadData() {
    this.isLoading = true;
    this.filtered = false;
    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;

    this.restClient
      .getwithParam(environment.FETCH_ROLES_API, queryParams)
      .subscribe({
        next: (result: PageableResponse) => {
          var content: RoleList[] = result.data.content as RoleList[];

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
    queryParams['roleName'] = this.roleNameSearch;
    queryParams['roleType'] = this.roleTypeSearch;

    this.restClient
      .getwithParam(
        environment.FETCH_ROLES_WITH_FILTER_API,
        queryParams
      )
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

  fetchRoleTypeList() {
    this.spinner = true;

    var queryParams: any = {};
    queryParams['type'] = 'ROLETYPE';

    this.restClient
      .getwithParam(
        environment.FETCH_CONFIG_CODE_LIST_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.roleTypeSelector = result.data as ConfigCode[];
        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
          this.spinner = false;
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
    queryParams['roleType'] = row.roleType;
    queryParams['roleName'] = row.roleName;

    this.restClient
      .getwithParam(
        environment.FETCH_ROLE_DETAILS_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          let roledata = result.data as RoleDetailsResponse;
          this.detailResponse = {
            module: '',
            roleName: roledata.roleName,
            roleType: roledata.roleType,
            roleDesc: roledata.roleDesc,
            permissionsList: [],
            asignedPermission: roledata.systemAccess,
          };
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

  addNewRole() {
    this.detailResponse = {
      module: '',
      roleName: '',
      roleType: '',
      roleDesc: '',
      permissionsList: [],
      asignedPermission: [],
    };

    this.isNavigation = false;
    this.selectedIndex = 1;
  }

  loadListTab() {
    this.selectedIndex = 0;
    this.loadData();
  }
}

export interface RoleDetail {
  module: string;
  roleName: string;
  roleType: string;
  roleDesc: string;
  permissionsList: SystemAccess[];
  asignedPermission: SystemAccess[];
}

export interface RoleList {
  roleDesc?: string;
  roleType?: string;
  roleName?: string;
}

export interface RoleDetailsResponse {
  roleDesc: string;
  roleName: string;
  roleType: string;
  systemAccess: SystemAccess[];
}

export interface SystemAccess {
  module: string;
  desc: string;
  privilegeName: string;
  privilegeType: string;
}
