import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SupervisorAllotmentDetailsComponent } from './supervisor-allotment-details/supervisor-allotment-details.component';

@Component({
  selector: 'app-supervisor-allotment-list',
  templateUrl: './supervisor-allotment-list.component.html',
  styleUrls: ['./supervisor-allotment-list.component.css']
})
export class SupervisorAllotmentListComponent implements OnInit {

  selectedIndex=0;
  spinner = false;
  displayedColumns: string[] =['state','discom','city','division','agency','supervisor','allotedDivision'];
  dataSource=new MatTableDataSource<any>();
  stateSearch:string='';
  discomSearch:string='';
  citySearch:string='';
  currentPage=0;
  isLoading = false;
  totalRows = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  filtered=false;
  paginator: any;
  isDetailsEditable: boolean=false;
  isNavigation: boolean=false;



  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isDetailsEditable=true;
  }
  loadData() {
    var content: SupervisorAllotmentClass[] =[{ state:"UP" ,discom:"DVVNL",city:"AGRA", division:"UP", agency:"sample",supervisor:"sample",allotedDivision:"sample"}] as SupervisorAllotmentClass[];
    this.dataSource.data=content;
    // this.totalRows = result.Data.totalElements;

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

  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
    var content: RoleList[] =[{  agency:"sample"}] as RoleList[];
    this.dataSource.data=content;
  }

  showDetails(row: any){

  }
  loadListTab() {
    this.selectedIndex = 0;
    this.loadData();
  }

  fetchFilteredData(): void{



   }
   navToDetails(row:any){
     this.selectedIndex=1;
   }
   addNewSupervisor(){
    this.isNavigation = false;
    this.selectedIndex = 1;
   }
}

export interface SupervisorAllotmentClass{
  state:string;
  discom:string;
  city:string;
  division:string;
  agency:string;
  supervisor:string;
  allotedDivision:string;
}
export interface RoleList{
  state?:string;
  discom?:string;
  city?:string;
  division?:string;
  agency?:string;
  supervisor?:string;
  allotedDivision?:string;
}
