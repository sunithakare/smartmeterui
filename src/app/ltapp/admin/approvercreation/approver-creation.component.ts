import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, ConfigCode, HttpclientService, PageableResponse } from 'src/app/services/httpclient.service';
import { environment, roleConfig, roleType } from 'src/environments/environment';

@Component({
  selector: 'app-approver-creation',
  templateUrl: './approver-creation.component.html',
  styleUrls: ['./approver-creation.component.css']
})
export class ApproverCreationComponent implements OnInit {
  selectedIndex = 0;
  spinner = false;
 // for tab 1
 isLoading = false;
 totalRows = 0;
 pageSize = 15;
 currentPage = 0;
 pageSizeOptions: number[] = [15, 20, 25, 100];
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

 displayedColumns: string[] = ['userName', 'approverType'];
 // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
 dataSource = new MatTableDataSource<ApproverDetail>();
userName:string='';
 userNameSearch: string = '';
 approverIdentitySearch: string = 'VIEWER';
 filtered: boolean = false;
 approverIdentitySelector: ConfigCode[] = [];

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
   this.fetchApproverTypeList();
   this.isDetailsEditable=this.authservice.checkPermission(roleType.ADMIN,roleConfig.ApproverCreation) || this.authservice.checkPermission(roleType.MANAGER,roleConfig.ApproverCreation);

 }

 ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
 loadData() {
   this.isLoading = true;
   this.filtered = false;
   var queryParams: any = {};
   queryParams['page'] = this.currentPage;
   queryParams['size'] = this.pageSize;

   this.restClient
     .getwithParam(environment.FETCH_APPROVER_API, queryParams)
     .subscribe({
       next: (result: PageableResponse) => {
         var content: ApproverDetail[] = result.data.content as ApproverDetail[];

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
         console.log('Approver List Fetch Complete ');
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
   queryParams['userName'] = this.userNameSearch;
   queryParams['approverIdentity'] = this.approverIdentitySearch;

   this.restClient
     .getwithParam(
       environment.FETCH_APPROVER_WITH_FILTER_API,
       queryParams
     )
     .subscribe({
       next: (result: PageableResponse) => {
         var content: ApproverDetail[] = result.data.content as ApproverDetail[];

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

 fetchApproverTypeList() {
   this.spinner = true;

   var queryParams: any = {};
   queryParams['type'] = 'APPROVERTYPE';

   this.restClient
     .getwithParam(
       environment.FETCH_CONFIG_CODE_LIST_API,
       queryParams
     )
     .subscribe({
       next: (result: APIResponse) => {
         this.approverIdentitySelector = result.data as ConfigCode[];
       },
       error: (err: any) => {
         console.log(err);
         this.spinner = false;
       },
       complete: () => {
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

         this.isNavigation = true;
         this.selectedIndex = 1;
         this.userName=row.userName;
 }

 addNewApprover() {
  //  this.detailResponse = {
  //    module: '',
  //    roleName: '',
  //    roleType: '',
  //    roleDesc: '',
  //    permissionsList: [],
  //    asignedPermission: [],
  //  };

   this.isNavigation = false;
   this.selectedIndex = 1;
   this.userName = "";
 }

 loadListTab() {
   this.selectedIndex = 0;
   this.loadData();
 }
}
export class ApproverDetail {
  approverIdentity?: string;
  userName?: string;
  // approvalFilter?: string='';
  approverFilter?: string;
  // approvalLevel?: string='';
  approvalFor?: string;
}
