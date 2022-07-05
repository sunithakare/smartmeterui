import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import {
  APIResponse,
  HttpclientService,
  PageableResponse,
} from 'src/app/services/httpclient.service';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { environment } from 'src/environments/environment';

import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSelectChange } from '@angular/material/select';
import { SLAReportContent } from './interface/SLAReportContent';
import { DownloadReport } from './interface/DownloadReport';
import { StateData } from '../../shared/interface/StateData';
import { UserDiscomData } from 'src/app/shared/interface/UserDiscomData';
import { StateDiscomData } from 'src/app/shared/interface/StateDiscomData';

const moment = _rollupMoment || _moment;
export const DATE_FORMATS = {
  parse: {
    dateInput: 'MMMM/YYYY',
  },
  display: {
    dateInput: 'MMMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-sla-reports',
  templateUrl: './sla-reports.component.html',
  styleUrls: ['./sla-reports.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0',display:'hidden'})),
      state('expanded', style({height: '100%'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SlaReportsComponent implements OnInit {
  isLoading = true;
  spinner = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [ 10,15, 20, 25, 100];
  module: string = '';
  minDate: Date | undefined;
  maxDate: Date = new Date();
  displayedColumns: string[] = [
    'module',
    'rfpNoType',
    'reportName',
    'timeframe',
    // 'action',
  ];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<SLAReportContent>();

  expandedElement: SLAReportContent|null;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  selectedQuarter: string = 'Q1';
  // selectedYear: number = new Date().getFullYear();
  selectedYear: number;
  selectedState: string = '';
  selectedDiscom: string = '';
  reportdate = new FormControl(moment().date(0));
  billdate = new FormControl(moment().add(1,"month").date(0));

  currentYear: number=new Date().getFullYear();
  yearSelectorList:number[]=[];
  fetchUrl: string='';
  rfpNoSearch: string = '';
  reportNameoSearch: string = '';

// stateList:StateData[]=[];
// discomList:DiscomData[]=[];
stateList:StateData[]=[];
discomList:UserDiscomData[]=[];


  constructor(
    public dialog: MatDialog,
    private restClient: HttpclientService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    for (let index = -11; index < 1; index++) {
      this.yearSelectorList.push(this.currentYear+index);

    }
    // this.reportdate=this.reportdate.value.month(this.reportdate.value.month()-1)
  }

  ngOnInit(): void {
    // this.restClient.post().subscribe({
    //   next: (result: any) => {
    //     this.dataSource.data=result.data;
    //     console.log(result);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   }
    //   });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.activatedRoute.params.subscribe((params) => {
      // this.billdate = new FormControl(moment());
      // this.billdate.value.month(this.reportdate.value.month() + 1);
      this.module = params['module'];
      this.fetchUrl = environment.SLAREPORTS_API;
      if (this.module != undefined || this.module != null) {
        this.fetchUrl = this.fetchUrl + '/' + this.module;
      }
      this.loadData();
    });
  }

  openPdf(element: SLAReportContent) {


    this.getPdf(element,false);

  }

  formatted_string(pad: string, user_str: string, pad_pos: string) {
    if (typeof user_str === 'undefined') return pad;
    if (pad_pos == 'l') {
      return (pad + user_str).slice(-pad.length);
    } else {
      return (user_str + pad).substring(0, pad.length);
    }
  }

  downloadPdf(element: SLAReportContent) {
    this.getPdf(element,true);
  }


  getPdf(element: SLAReportContent,isdownload:boolean) {
    this.spinner = true;

    let downloadBody: DownloadReport = {
      discom: this.selectedDiscom,
      state: this.selectedState,
      month: this.formatted_string('00', this.reportdate.value.month()+1, 'l'),
      year: this.reportdate.value.year(),
      day: this.reportdate.value.date(),
      reportName: element.reportName,
      reportModule: element.module,
      quarter:this.selectedQuarter
    };
    var downloadURL=environment.SLAREPORTS_DOWNLOAD_API;
    if(this.module!=null || this.module!=undefined){
      downloadURL=downloadURL+"?module="+this.module;
    }
    this.restClient
      .downloadusingPost(downloadURL, downloadBody)
      .subscribe({
        next: (result: any) => {
          let blob: any = new Blob([result], {
            type: 'application/pdf; charset=utf-8',
          });
          // const url = window.URL.createObjectURL(blob);
          //window.open(url);
          //window.location.href = response.url;
          this.spinner = false;
          if (result.type =='application/zip') {
            isdownload=true;
          }
          if (isdownload) {
            console.log(result.type);
            var filename=
            element.reportName +'_' +
              (this.reportdate.value.month()+1) +
              '_' +
              this.reportdate.value.year() +
              '.pdf'
            if (result.type =='application/zip') {
              filename=
            element.reportName +'_' +
            (this.reportdate.value.month()+1) +
              '_' +
              this.reportdate.value.year() +
              '.zip'
            }
            saveAs(blob,filename);
          }else{
            const dialogRef = this.dialog.open(NgxExtendedPdfViewerComponent, {
              maxWidth: '100vw',
              maxHeight: '100vh',
              height: '80%',
              width: '80%',
              panelClass: 'full-screen-modal',
            });
            dialogRef.componentInstance.src = blob;

            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
          }

        },
        error: (err: any) => {
          var errorMsg='Report Not Available';
          if (err instanceof HttpErrorResponse) {
          if ( (err as HttpErrorResponse).status==404) {
            errorMsg=element.reportName +" Report Not Available for the Selected Timeframe"

          console.log(JSON.stringify(err.error));
          }
          }
          let snackBarRef = this.snackBar.open(errorMsg, 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          console.log(JSON.stringify(err));
          console.log(err);
          this.spinner = false;
        },
        complete: () => {
          console.log('complete');
          this.spinner = false;
        },
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.isLoading = true;

    this.restClient
      .getPageablforURL(this.fetchUrl, this.currentPage, this.pageSize)
      .subscribe({
        next: (result: APIResponse) => {
          var content: SLAReportContent[] = result.data as SLAReportContent[];

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
    this.restClient
      .getResponse(environment.USER_DISCOM_DATA_API)
      .subscribe({
        next: (result: APIResponse) => {
          var content: StateDiscomData[] = result.data as StateDiscomData[];
          content.forEach(resp=>{
            if (resp.isdefault) {
              this.selectedDiscom=resp.discomName;
              this.selectedState=resp.state;
            }
            if (!this.discomList.some(discom=>{return discom.discomName==resp.discomName})) {
              this.discomList.push({discomName:resp.discomName,isdefault:resp.isdefault});
            }
            if (!this.stateList.some(discom=>{return discom.state==resp.state})) {
              this.stateList.push({state:resp.state,isdefault:resp.isdefault});
            }

          });


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
  fetchFilteredDataInTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // below method is not need for client--always fetch complete data
  fetchFilteredData() {
    this.isLoading = true;
    if (this.rfpNoSearch === '' && this.reportNameoSearch === '') {
      this.loadData();
      return;
    }
    this.currentPage = 0;
    let filterUrl = environment.SLAREPORTS_FILTER_API;
    if (this.module != undefined || this.module != null) {
      filterUrl = filterUrl + '/' + this.module;
    }

    this.restClient
      .getResponse(
        filterUrl +
          '?page=' +
          this.currentPage +
          '&size=' +
          this.pageSize +
          '&rfpNo=' +
          this.rfpNoSearch +
          '&reportName=' +
          this.reportNameoSearch
      )
      .subscribe({
        next: (result: PageableResponse) => {
          var content: SLAReportContent[] = result.data.content as SLAReportContent[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
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

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    // if (this.rfpNoSearch === '' && this.reportNameoSearch === '') {
    //   this.loadData();
    // } else {
    //   this.fetchFilteredData();
    // }
  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    let ctrlValue = this.reportdate.value;
    ctrlValue.year(normalizedYear.year());
    this.reportdate.setValue(ctrlValue);
    let tempValue = this.billdate.value;
    tempValue.year(normalizedYear.year());
    this.billdate.setValue(tempValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {

if (this.expandedElement) {
  if (this.expandedElement.timeframe=='Monthly') {
      datepicker.close();
  }
}

    let ctrlValue = this.reportdate.value;
    ctrlValue.month(normalizedMonth.month());
    this.reportdate.setValue(ctrlValue);
    let tempValue = this.billdate.value;
    tempValue.month(normalizedMonth.month() + 1);
    this.billdate.setValue(tempValue);

  }



  onClickExpandRow(row:SLAReportContent):void{
    this.expandedElement = this.expandedElement === row ? null : row;

    if (row.timeframe=="Monthly") {

      DATE_FORMATS.display.dateInput="MMMM/YYYY";
    }else if (row.timeframe=="Daily") {
      DATE_FORMATS.display.dateInput="DD/MMMM/YYYY";
    }

  }

  YearSelected(event:MatSelectChange){

    let ctrlValue = this.reportdate.value;
    ctrlValue.year(event.value);
    this.reportdate.setValue(ctrlValue);
    let tempValue = this.billdate.value;
    tempValue.year(event.value);
    this.billdate.setValue(tempValue);
  }

}

// function saveAs(data: Response, arg1: string): any {
//   throw new Error('Function not implemented.');
// }
