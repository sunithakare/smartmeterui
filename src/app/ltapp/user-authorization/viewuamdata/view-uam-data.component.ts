import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jsPDF, { jsPDFOptions } from 'jspdf';
import domtoimage from 'dom-to-image';
import { APIResponse, ConfigCode, HttpclientService } from 'src/app/services/httpclient.service';
import { ApprovalDialogComponent } from 'src/app/shared/component/approval-dialog/approval-dialog.component';
import { environment } from 'src/environments/environment';
import { UAMInputForm } from '../list-all-application/list-all-application.component';
import { SpocDetails } from 'src/app/public/register/model/SpocDetails';

@Component({
  selector: 'app-view-uam-data',
  templateUrl: './view-uam-data.component.html',
  styleUrls: ['./view-uam-data.component.css']
})
export class ViewUamDataComponent implements OnInit {


@Input()
inputForm:UAMInputForm;

@Input()
refId:string;

@Input()
listview:boolean;


@Output() dataSaved: EventEmitter<number> = new EventEmitter();

  userdetails: FormGroup;
  employmentDetails: FormGroup;
  locationDetails: FormGroup;
  applicationDetails: FormGroup;
  applicationAccess: FormArray;
  VPNDetails: FormGroup;
  remarksData: FormGroup;
  approverRemarks: FormArray;
  spocdetails: FormArray;
  appAccessDataSource = new MatTableDataSource<any>();
  approverRemarksDataSource = new MatTableDataSource<any>();
  spocDetailDataSource = new MatTableDataSource<any>();

  selectedDiscoms: ConfigCode[] = [];

  displayedColumns: string[] = [
    'sNo',
    'applciationName',
    'accesType',
    'remarks',
    'status',
    'range',
  ];

  displayedApproverRemarks: string[] = [
    'sNo',
    'approverLevel',
    'approverName',
    'changedDate',
    'remarks'
  ];
  displayedSpocData: string[] = [
    'username',
    'appUrls',
    'ouName',
    'securityGroups',
    'systemDestinationIpSubnets',
    'serviceSshHttps',
    'customPorts',
    'action'

  ];

  minDate: Date = new Date();
  spinner: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userdetails = new FormGroup({
      salutation: new FormControl(
        { value: 'ssss', disabled: false },
        Validators.required
      ),
      firstName: new FormControl(
        { value: 'ss', disabled: false },
        Validators.required
      ),
      lastName: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      mobileNo: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern('[6-9]\\d{9}'),
      ]),
      email: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.email,
      ]),
    });
    this.employmentDetails = new FormGroup({
      employeeId: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      designation: new FormControl({ value: '', disabled: false }),
      department: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
    this.locationDetails = new FormGroup({
      discomName: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      city: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      zone: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      circle: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      division: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      subdivision: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
    this.applicationDetails = new FormGroup({
      userType:         new FormControl({ value: '', disabled: false }),
      requestFor:       new FormControl({ value: '', disabled: false }),
      existingVPNName:  new FormControl({ value: '' ,disabled: false }),
      state: new FormControl({ value: '', disabled: false }),
      status: new FormControl({ value: '', disabled: false }),
      discomList: new FormControl({value: '', disabled: false }),
    });

    this.VPNDetails = new FormGroup({
      lanMACAddress: new FormControl({ value: '', disabled: false }),
      wifiMACAddress: new FormControl({ value: '', disabled: false }),
      vpnAccessFromIndia: new FormControl({ value: '', disabled: false }),
      countryName: new FormControl({ value: '', disabled: true }),
    });

    this.remarksData=new FormGroup({
      userRemarks: new FormControl( { value: '', disabled: false }),
       spocRemarks: new FormControl({ value: '', disabled: false })
      });

    this.applicationAccess = this.formBuilder.array([]);
    this.approverRemarks = this.formBuilder.array([]);
    this.spocdetails = this.formBuilder.array([]);

    this.userdetails.disable();
    this.employmentDetails.disable();
    this.locationDetails.disable();
    this.applicationDetails.disable();
    this.applicationAccess.disable();
    this.VPNDetails.disable();
    this.approverRemarks.disable();

    this.remarksData.controls["spocRemarks"].enable();
    var array :SpocDetails[]=[];


    this.spocdetails = new FormArray(array.map(this.spocDetailsAsFormGroup));

    this.spocDetailDataSource = new MatTableDataSource(
      this.spocdetails.controls
    );
  }


  ngOnChanges() {
      if ( this.inputForm!=null && this.inputForm!=undefined) {
      this.userdetails = this.inputForm.userdetails;
      this.employmentDetails = this.inputForm.employmentDetails;
      this.locationDetails = this.inputForm.locationDetails;
      this.applicationDetails = this.inputForm.applicationDetails;
      this.applicationAccess = this.inputForm.applicationAccess;
      this.selectedDiscoms = this.inputForm.selectedDiscoms;
      this.VPNDetails = this.inputForm.VPNDetails;
      this.approverRemarks=this.inputForm.approverRemarks;
      this.spocdetails=this.inputForm.spocdetails;

      this.appAccessDataSource = new MatTableDataSource(
        this.applicationAccess.controls
      );
      this.approverRemarksDataSource = new MatTableDataSource(
        this.approverRemarks.controls
      );


      this.userdetails.disable();
      this.employmentDetails.disable();
      this.locationDetails.disable();
      this.applicationDetails.disable();
      // this.applicationAccess.disable();
      this.VPNDetails.disable();
      this.approverRemarks.disable();
      this.remarksData.controls["spocRemarks"].enable();

if (this.applicationDetails.getRawValue().status == 'Completed') {
      this.applicationAccess.disable();
}


      }

  }
  // saveData() {
  //   var requestBody = {
  //     userDetails: this.userdetails.getRawValue(),
  //     employmentDetails: this.employmentDetails.getRawValue(),
  //     locationDetails: this.locationDetails.getRawValue(),
  //     applicationDetails: this.applicationDetails.getRawValue(),
  //     applicationAccess: this.applicationAccess.getRawValue(),
  //     vpnDetails: this.VPNDetails.getRawValue(),
  //     remarksData:this.remarksData.getRawValue(),
  //   };

  //   this.spinner = true;
  //   // console.log(JSON.stringify(requestBody));
  //   this.restClient
  //     .publicPost(environment.UAM_REGISTER_API, requestBody)
  //     .subscribe({
  //       next: (result: APIResponse) => {
  //         var dialogRef = this.dialog.open(ShowReferenceIdDialogComponent);
  //         var comp = dialogRef.componentInstance;
  //         comp.message = result.data.referenceNo;
  //         dialogRef.afterClosed().subscribe((result) => {
  //           this.router.navigate(['/home']);
  //         });
  //         let snackBarRef = this.snackBar.open(
  //           'Details Submited SuccessFully',
  //           'close',
  //           {
  //             horizontalPosition: 'center',
  //             verticalPosition: 'bottom',
  //             duration: 3000,
  //           }
  //         );
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //         let snackBarRef = this.snackBar.open('Some Error Occoured', 'close', {
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom',
  //           duration: 3000,
  //         });
  //         this.spinner = false;
  //       },
  //       complete: () => {
  //         console.log('Role Saved');

  //         this.spinner = false;
  //       },
  //     });
  // }


  submitData(approveReject:string):void{
    // var requestBody = {
    //   applicationAccess: this.applicationAccess.getRawValue(),
    // };

    var submitUrl=environment.UAM_APPROVE_API+"/"+this.refId;

    const dialogRef = this.dialog.open(ApprovalDialogComponent, {
      width: '50%',
      // height: '50%',
      data: {masterData:this.applicationAccess.getRawValue(),remarks:'',approveReject:approveReject,submitURL:submitUrl}
    });
          dialogRef.afterClosed().subscribe((result) => {
        this.dataSaved.emit(0);
          });
  }

  submitCompletedData():void{
  var requestBody = {
      spocdetails:this.spocdetails.getRawValue(),
      spocRemarks:this.remarksData.controls["spocRemarks"].value,
    };

    this.spinner = true;
    // console.log(JSON.stringify(requestBody));
    this.restClient
      .post(environment.UAM_COMPLETE_API+"/"+this.refId, requestBody)
      .subscribe({
        next: (result: APIResponse) => {

          let snackBarRef = this.snackBar.open(
            'Details Submited SuccessFully',
            'close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            }
          );
        },
        error: (err: any) => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Some Error Occoured', 'close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.spinner = false;
        },
        complete: () => {
          console.log('Data Saved');

          // window.location.reload();

        this.dataSaved.emit(0);
          this.spinner = false;
        },
      });

  }


  spocDetailsAsFormGroup(spocData: SpocDetails): FormGroup {
    const fg = new FormGroup({
      username: new FormControl({ value: spocData.username, disabled: false }),
      appUrls: new FormControl({ value: spocData.appUrls, disabled: false }),
      ouName: new FormControl({ value: spocData.ouName, disabled: false }),
      securityGroups: new FormControl({ value: spocData.securityGroups, disabled: false }),
      systemDestinationIpSubnets: new FormControl({ value: spocData.systemDestinationIpSubnets, disabled: false }),
      serviceSshHttps: new FormControl({ value: spocData.serviceSshHttps, disabled: false }),
      customPorts: new FormControl({ value: spocData.customPorts, disabled: false }),
    });
    return fg;
  }

addSpocData():void{
  this.spocdetails.push(this.spocDetailsAsFormGroup(new SpocDetails()));
  // this.spocDetailDataSource.data=this.spocdetails.controls;

  this.spocDetailDataSource.data=this.spocDetailDataSource.data;
}

removeSpocData(i:number){
  this.spocdetails.removeAt(i);
  this.spocDetailDataSource.data=this.spocDetailDataSource.data;

}
  public savePDF(): void {
    this.spinner=true;
    let DATA = document.getElementById('content1');
    let TableData = document.getElementById('content2');
    let remarksData = document.getElementById('content3');
    var pdfOptions:jsPDFOptions ={
      orientation: "l",
      compress: true,
    }
    let PDF = new jsPDF(pdfOptions);
    // let PDF = new jsPDF('l');
    // let PDF = new jsPDF('p','px','a4');
    var options = {
      quality: 0.99,
      // width: 1280,
      // height: 720,
  }
    domtoimage.toPng(DATA!,options)
    .then(dataUrl=>
    {
        PDF.addImage(dataUrl, 'PNG', 0, 0, 290, 134.12);
        domtoimage.toPng(TableData!,options)
        .then(dataUrl=>
        {
            PDF.addPage();
            PDF=PDF.setPage(2);
            PDF.addImage(dataUrl, 'PNG', 0, 0, 290, 134.12);
            domtoimage.toPng(remarksData!,options)
            .then(dataUrl=>
            {
                PDF.addPage();
                PDF=PDF.setPage(3);
                PDF.addImage(dataUrl, 'PNG', 0, 0, 290, 134.12);
                PDF.save('ApprovalForm_'+this.refId+'.pdf');

                this.spinner=false;
            })
        })

    });

    // html2canvas(DATA!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

    //     let fileWidth = 208;
    //     alert(canvas.height);
    //     alert(canvas.width);
    //     let fileHeight = canvas.height * fileWidth / canvas.width;


    //     const FILEURI = canvas.toDataURL('image/png')
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

    // // this.spinner=false;
    // //     PDF.save('Applciation Form.pdf');
    // }).then(canvas=>{
    //   html2canvas(TableData!,{foreignObjectRendering:false,removeContainer:true,
    //     scale: 2}).then(canvas => {

    //     let fileWidth = 208;
    //     let fileHeight = canvas.height * fileWidth / canvas.width;

    //     const FILEURI = canvas.toDataURL('image/png')
    //     let position = 0;
    //     PDF.addPage();
    //     PDF=PDF.setPage(2);
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

    //     // this.spinner=false;
    //     // PDF.save('Applciation Form.pdf');
    // }).then(canvas=>{
    //       html2canvas(remarksData!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

    //         let fileWidth = 208;
    //         let fileHeight = canvas.height * fileWidth / canvas.width;

    //         const FILEURI = canvas.toDataURL('image/png')
    //         let position = 0;
    //         PDF.addPage();
    //         PDF=PDF.setPage(3);
    //         PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

    //         this.spinner=false;
    //         PDF.save('Applciation Form.pdf');
    //     });



    //     });
    // });

  }



}
