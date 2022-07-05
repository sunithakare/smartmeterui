import { MatTableDataSource } from '@angular/material/table';
import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display-serial-no-list',
  templateUrl: './display-serial-no-list.component.html',
  styleUrls: ['./display-serial-no-list.component.css']
})
export class DisplaySerialNoListComponent implements OnInit {

  displayedColumns: string[] = ['srNo','boxNumber','internalSrNo','latestSrNo','remarks'];

  totalRows= 0;
  pageSize= 15;
  currentPage= 0;
  pageSizeOptions: number[]=[20,40,60,80,100];
  dataSource= new MatTableDataSource<any>();

  @Output()
  returnToDetails: EventEmitter<number> = new EventEmitter();

  @Input()
  serialNoList:SerialNoList[];

  constructor(
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void { }


  ngOnChanges():void {

    this.dataSource.data = this.serialNoList;

  }
  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
  }
  returnToDetailsTab(event:any):void{

    this.returnToDetails.emit(0);
  }
}


export interface SerialNoList {
  srNo: string
  boxNumber: string
  internalSrNo: string
  latestSrNo: string
  remarks: string
}
