import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-indent-wise-outward-import',
  templateUrl: './indent-wise-outward-import.component.html',
  styleUrls: ['./indent-wise-outward-import.component.css']
})
export class IndentWiseOutwardImportComponent implements OnInit {
  selectedIndex=0;
  discomSearch:string='';
  isLoading=false;
  spinner = false;
  totalRows = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  filtered=false;
  currentPage=0;
  isDetailsEditable: boolean=false;
  isNavigation: boolean=false;
  paginator: any;

  dataSource=new MatTableDataSource<any>();
  displayedColumns:string[]=['sn','otSrn','discom','warehouseName','dispatchDate','indentNo','subcontractor',
   'itemName','itemMake','qty','driverName','contactNo','ginNo','vehicleNo'];
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator =this.paginator;
    this.loadData();
    this.isDetailsEditable=true;
  }

  loadData() {
    var content: IndentWiseOutwardImportClass[]=[{sn:"1" ,otSrn:"abc", discom:"DVVNL", warehouseName:"Test",
    dispatchDate:"21/2/2022", indentNo:"AB11",subcontractor:"NITESH",itemName:"sample",itemMake:"test",
    qty:"4",driverName:"ABCD",contactNo:"55555",ginNo:"567",vehicleNo:"AS02B"
  }] as IndentWiseOutwardImportClass[];
    this.dataSource.data=content;
  }
  searchWithFilter(){

  }
  navToDetails(row:any){
    this.selectedIndex=1;
  }
  onChangePage(pe: PageEvent){

  }
  addNewIndentWise(){
    this.isNavigation = false;
    this.selectedIndex = 1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
  }

}
export interface IndentWiseOutwardImportClass{
  sn:string;
  otSrn:string;
  discom:string;
  warehouseName:string;
  dispatchDate:string;
  indentNo:string;
  subcontractor:string;
  itemName:string;
  itemMake:string;
  qty:string;
  driverName:string;
  contactNo:string;
  ginNo:string;
  vehicleNo: string;
}
