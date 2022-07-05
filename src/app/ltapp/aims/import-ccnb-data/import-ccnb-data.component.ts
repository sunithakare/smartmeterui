import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-ccnb-data',
  templateUrl: './import-ccnb-data.component.html',
  styleUrls: ['./import-ccnb-data.component.css']
})
export class ImportCcnbDataComponent implements OnInit {

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
    var content: ImportCCnBDataClass[]=[{uploadDate:"12/2/22" , counter:"DVVNL", count:"Test",action:'Test',download:'Test'
   }] as ImportCCnBDataClass[];
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
export interface ImportCCnBDataClass{
  uploadDate:string;
  counter:string;
  count:string;
  action:string;
  download:string;
}


