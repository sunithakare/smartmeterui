import { WarehouseNameList } from './../return-to-supplier/return-to-supplier-details/return-to-supplier-detaisl.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-mi-data',
  templateUrl: './import-mi-data.component.html',
  styleUrls: ['./import-mi-data.component.css']
})
export class ImportMiDataComponent implements OnInit {


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
  displayedColumns:string[]=['action','discom','warehouse','city','state','count'];


  constructor() { }

  ngOnInit(): void {
    this.loadData();
    this.isDetailsEditable=true;
  }


  navToDetails(row:any){
    this.selectedIndex=1;
  }


  onChangePage(event:any){

  }

  loadData() {
    var content: ImportMiDataClass[]=[{action:"1" , discom:"DVVNL", warehouse:"Test",city:'hyd',state:'up',count:'12'
  }] as ImportMiDataClass[];
    this.dataSource.data=content;
  }

  addNewIndentWise(){
    this.selectedIndex=1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
  }

}

export interface ImportMiDataClass{
  action:string;
  discom:string;
  warehouse:string;
  city:string;
  state:string;
  count:string;
}
