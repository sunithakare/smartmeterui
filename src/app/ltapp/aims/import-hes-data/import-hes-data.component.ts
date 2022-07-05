import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-import-hes-data',
  templateUrl: './import-hes-data.component.html',
  styleUrls: ['./import-hes-data.component.css']
})
export class ImportHesDataComponent implements OnInit {
  selectedIndex=0;
  counterSearch:string='';
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
  displayedColumns:string[]=['uploadDate','counter','count','action','download'];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
    this.isDetailsEditable=true;
  }
  loadData() {
    var content: ImportHesDataClass[]=[{uploadDate:"12/2/22" , counter:"DVVNL", count:"Test",action:'Test',download:'Test'
   }] as ImportHesDataClass[];
    this.dataSource.data=content;
  }

  navToDetails(row:any){
    this.selectedIndex=1;
  }
  onChangePage(event:any){

  }
  addNewHesData(){
    this.selectedIndex=1;
  }
  loadListTab(){
    this.selectedIndex = 0;
    this.loadData();
  }

}
export interface ImportHesDataClass{
  uploadDate:string;
  counter:string;
  count:string;
  action:string;
  download:string;
}
