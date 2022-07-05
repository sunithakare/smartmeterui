import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { EmployeeRoleEditComponent } from './employee-role-edit/employee-role-edit.component';

@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {

  isLoading = true;
  spinner = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [ 10,15, 20, 25, 100];

  displayedColumns: string[] = [
    'roleName',
    'roleCategory',
    'roleDesc',
    'action',
  ];
  dataSource = new MatTableDataSource<EmployeeRoleDetail>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restClient: HttpclientService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {

    }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadData();
  }

  fetchFilteredDataInTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.isLoading = true;

    this.restClient
      .getwithParam(environment.SLAREPORTS_FETCH_EMPLOYEE_ROLES_API,{})
      .subscribe({
        next: (result: APIResponse) => {
          var content: EmployeeRoleDetail[] = result.data as EmployeeRoleDetail[];

          this.dataSource.data = content;
          this.totalRows = result.data.length;
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


    OpenEditDialog(row:EmployeeRoleDetail,option:string):void{
      const dialogRef = this.dialog.open(EmployeeRoleEditComponent, {
        width: '50%',
        // height: '50%',
        data:{
          roleName: row.roleName,
          roleCategory: row.roleCategory,
          roleDesc: row.roleDesc,
          option:option,
        } ,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result=='RELOAD'){
          this.loadData();
        }
      });
    }
    addRole():void{
      const dialogRef = this.dialog.open(EmployeeRoleEditComponent, {
        width: '50%',
        // height: '50%',
        data:{
          roleName: '',
          roleCategory: '',
          roleDesc: '',
          option:"ADD",
        } ,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result=='RELOAD'){
          this.loadData();
        }
        });
    }
}

export interface EmployeeRoleDetail {
  roleName: string;
  roleCategory: string;
  roleDesc: string;
}
