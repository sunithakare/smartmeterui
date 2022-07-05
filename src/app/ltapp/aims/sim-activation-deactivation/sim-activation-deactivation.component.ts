import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sim-activation-deactivation',
  templateUrl: './sim-activation-deactivation.component.html',
  styleUrls: ['./sim-activation-deactivation.component.css']
})
export class SimActivationDeactivationComponent implements OnInit {
  selectedIndex = 0;
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

displayedColumns:string[]=['discom','warehouseName','activationDeactivationDate','simStatus','qty','action'];

dataSource = new MatTableDataSource<any>();

discom:string='';

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isEditable=true;
  }

  loadData():void{
    var content: SimActDeactDataList[] = [{discom:'discom1',warehouseName:'warehouseName1',activationDeactivationDate:'11-03-2022',simStatus:'active',qty:'200',action:'complete'}] as SimActDeactDataList[];
    this.dataSource.data = content;
  }

  navToDetails(row:any){
    this.selectedIndex=1;
  }
  fetchFilteredData(){}

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if (this.filtered) {
      this.fetchFilteredData();
    } else {
      this.loadData();
    }
  }

  addNewSimActivationDeactivation():void{
    this.isNavigation = false;
    this.selectedIndex = 1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
  }


}
export interface SimActDeactDataList{
  discom:string;
  warehouseName:string;
  activationDeactivationDate:string;
  simStatus:string;
  qty:string;
  action:string;
}
