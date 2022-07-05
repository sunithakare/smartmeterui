import { HttpClient } from '@angular/common/http';
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
import { DiscomList } from '../admin/usercreation/userdetails/userdetails.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
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
  selector: 'app-slareports',
  templateUrl: './slareports.component.html',
  styleUrls: ['./slareports.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SlareportsComponent implements OnInit {
  isLoading = true;
  spinner = false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [ 15, 20, 25, 100];
  module: string = '';
  minDate: Date | undefined;
  maxDate: Date = new Date();
  displayedColumns: string[] = [
    'module',
    'rfpNoType',
    'reportName',
    'timeframe',
    'action',
  ];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<SLAReportContent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  selectedState: string = '';
  selectedDiscom: string = '';
  reportdate = new FormControl(moment());
  billdate = new FormControl(moment());

  fetchUrl: string='';
  rfpNoSearch: string = '';
  reportNameoSearch: string = '';

stateList:StateData[]=[];
discomList:DiscomData[]=[];


  constructor(
    public dialog: MatDialog,
    private restClient: HttpclientService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

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
      // discom: this.selectedDiscom,
      // state: this.selectedState,
      discom:'MVVNL',
      state:'UP',
      month: this.formatted_string('00', this.reportdate.value.month()+1, 'l'),
      year: this.reportdate.value.year(),
      reportName: element.reportName,
      reportModule: element.module,
    };
    this.restClient
      .downloadusingPost(environment.SLAREPORTS_DOWNLOAD_API, downloadBody)
      .subscribe({
        next: (result: any) => {
          let blob: any = new Blob([result], {
            type: 'application/pdf; charset=utf-8',
          });
          // const url = window.URL.createObjectURL(blob);
          //window.open(url);
          //window.location.href = response.url;
          this.spinner = false;
          if (isdownload) {
            saveAs(
              blob,
              element.reportName +
                this.reportdate.value.month() +
                '_' +
                this.reportdate.value.year() +
                '.pdf'
            );
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
          let snackBarRef = this.snackBar.open('Report Not Available', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
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
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  loadData() {
    this.isLoading = true;

    this.restClient
      .getPageablforURL(this.fetchUrl, this.currentPage, this.pageSize)
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
    if (this.rfpNoSearch === '' && this.reportNameoSearch === '') {
      this.loadData();
    } else {
      this.fetchFilteredData();
    }
  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    let ctrlValue = this.reportdate.value;
    ctrlValue.year(normalizedYear.year());
    this.reportdate.setValue(ctrlValue);
    let tempValue = this.billdate.value;
    tempValue.month(this.billdate.value.month() + 1);
    this.billdate.setValue(tempValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    datepicker.close();
    let ctrlValue = this.reportdate.value;
    ctrlValue.month(normalizedMonth.month());
    this.reportdate.setValue(ctrlValue);
    let tempValue = this.billdate.value;
    tempValue.month(normalizedMonth.month() + 1);
    this.billdate.setValue(tempValue);

  }


}

// function saveAs(data: Response, arg1: string): any {
//   throw new Error('Function not implemented.');
// }

export interface SLAReportContent {
  module: string;
  reportName: string;
  rfpNoType: string;
  timeframe: string;
  reportType: string;
  active: boolean;
}
export interface DownloadReport {
  discom: string;
  state: string;
  month: string;
  year: string;
  reportName: string;
  reportModule: string;
}
export interface StateDiscomData {
  discomName: string;
  state: string;
  isdefault: boolean;
}
export interface DiscomData {
  discomName: string;
  isdefault: boolean;
}

export interface StateData {
  state: string;
  isdefault: boolean;
}
