import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jsPDF, { jsPDFOptions } from 'jspdf';
import domtoimage from 'dom-to-image';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
} from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { ShowReferenceIdDialogComponent } from './showreferenceiddialog/show-reference-id-dialog.component';


@Component({
  selector: 'app-view-form-before-submit',
  templateUrl: './view-form-before-submit.component.html',
  styleUrls: ['./view-form-before-submit.component.css'],

  encapsulation: ViewEncapsulation.None,
})
export class ViewFormBeforeSubmitComponent implements OnInit {

  @Input()
  finalForm:any;

  @Output() editForm = new EventEmitter<boolean>();

  userdetails: FormGroup;
  employmentDetails: FormGroup;
  locationDetails: FormGroup;
  applicationDetails: FormGroup;
  applicationAccess: FormArray;
  VPNDetails: FormGroup;
  remarksData: FormGroup;
  nextApproverData:NextApproverData={
    name: "",
    org: "",
    empId: "",
    email: "",
    phone: ""
};
  appAccessDataSource = new MatTableDataSource<any>();

  accepted:Boolean=false;

  selectedDiscoms: ConfigCode[] = [];

  displayedColumns: string[] = [
    'sNo',
    'applciationName',
    'accesType',
    'remarks',
    'range',
    'action',
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
    // const navigation = this.router.getCurrentNavigation();
    // if (navigation != null && navigation.extras.state != null) {
    //   const state = navigation.extras.state as {
    //     userdetails: FormGroup;
    //     employmentDetails: FormGroup;
    //     locationDetails: FormGroup;
    //     applicationDetails: FormGroup;
    //     applicationAccess: FormArray;
    //     selectedDiscoms: ConfigCode[];
    //     VPNDetails: FormGroup;
    //   };

    //   this.userdetails = state.userdetails;
    //   this.employmentDetails = state.employmentDetails;
    //   this.locationDetails = state.locationDetails;
    //   this.applicationDetails = state.applicationDetails;
    //   this.applicationAccess = state.applicationAccess;
    //   this.selectedDiscoms = state.selectedDiscoms;
    //   this.VPNDetails = state.VPNDetails;

    //   this.appAccessDataSource = new MatTableDataSource(
    //     this.applicationAccess.controls
    //   );
    // }
    // this.remarksData=new FormGroup({
    //     userRemarks: new FormControl(
    //       { value: '', disabled: false }),
    //      spocRemarks: new FormControl(
    //       { value: '', disabled: false }
    //     ),
    // });
  }

  ngOnInit(): void {
    // this.userdetails = new FormGroup({
    //   salutation: new FormControl(
    //     { value: 'ssss', disabled: false },
    //     Validators.required
    //   ),
    //   firstName: new FormControl(
    //     { value: 'ss', disabled: false },
    //     Validators.required
    //   ),
    //   lastName: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   mobileNo: new FormControl({ value: '', disabled: false }, [
    //     Validators.required,
    //     Validators.pattern('[6-9]\\d{9}'),
    //   ]),
    //   email: new FormControl({ value: '', disabled: false }, [
    //     Validators.required,
    //     Validators.email,
    //   ]),
    // });
    // this.employmentDetails = new FormGroup({
    //   employeeId: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   designation: new FormControl({ value: '', disabled: false }),
    //   department: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    // });
    // this.locationDetails = new FormGroup({
    //   discomName: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   city: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   zone: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   circle: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   division: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   subdivision: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    // });
    // this.applicationDetails = new FormGroup({
    //   userType: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   requestFor: new FormControl(
    //     { value: '', disabled: false },
    //     Validators.required
    //   ),
    //   existingVPNName: new FormControl({ value: '', disabled: false }),
    //   stateList: new FormControl({ disabled: false }),
    // });
    // this.VPNDetails = new FormGroup({
    //   macAddress: new FormControl(
    //     { value: '', disabled: false },
    //     [Validators.pattern("^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$"),
    //     Validators.required]
    //   ),
    //   vpnAccessFromIndia: new FormControl(
    //     { value: 'Yes', disabled: false },
    //     Validators.required
    //   ),
    //   countryName: new FormControl({ value: '', disabled: true },
    //   Validators.required),
    // });

    // this.applicationAccess = this.formBuilder.array([]);

    // this.userdetails.disable();
    // this.employmentDetails.disable();
    // this.locationDetails.disable();
    // this.applicationDetails.disable();
    // this.applicationAccess.disable();
    // this.VPNDetails.disable();
  }


  ngOnChanges() {

      if (this.finalForm !=undefined && this.finalForm !=null) {


            const state = this.finalForm as {
              userdetails: FormGroup;
              employmentDetails: FormGroup;
              locationDetails: FormGroup;
              applicationDetails: FormGroup;
              applicationAccess: FormArray;
              selectedDiscoms: ConfigCode[];
              VPNDetails: FormGroup;
            };

            this.userdetails = state.userdetails;
            this.employmentDetails = state.employmentDetails;
            this.locationDetails = state.locationDetails;
            this.applicationDetails = state.applicationDetails;
            this.applicationAccess = state.applicationAccess;
            this.selectedDiscoms = state.selectedDiscoms;
            this.VPNDetails = state.VPNDetails;

            this.appAccessDataSource = new MatTableDataSource(
              this.applicationAccess.controls
            );

          this.remarksData=new FormGroup({
              userRemarks: new FormControl(
                { value: '', disabled: false }),
              spocRemarks: new FormControl(
                { value: '', disabled: false }
              ),
          });



          this.userdetails.disable();
          this.employmentDetails.disable();
          this.locationDetails.disable();
          this.applicationDetails.disable();
          this.applicationAccess.disable();
          this.VPNDetails.disable();

          this.fetchApproverData();
        }
  }

  fetchApproverData(): void {
    this.spinner = true;
    var queryParams: any = {};
    var discomList=this.applicationDetails.getRawValue().discomList;
    if(discomList.length>1){
      queryParams['status'] = 'Awaiting Approval';
    }else{
      queryParams['status'] = 'In Progress';
      queryParams['discom'] = discomList[0].shortCode;
    }
    // queryParams['discom'] = '';

    this.restClient
      .publicgetwithParam(environment.UAM_GET_NEXT_APPROVER_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.nextApproverData = result.data as NextApproverData;
        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
        },
        complete: () => {
          this.spinner = false;
        },
      });
  }
  saveData() {
    var requestBody = {
      userDetails: this.userdetails.getRawValue(),
      employmentDetails: this.employmentDetails.getRawValue(),
      locationDetails: this.locationDetails.getRawValue(),
      applicationDetails: this.applicationDetails.getRawValue(),
      applicationAccess: this.applicationAccess.getRawValue(),
      vpnDetails: this.VPNDetails.getRawValue(),
      remarksData:this.remarksData.getRawValue(),
    };

    this.spinner = true;
    // console.log(JSON.stringify(requestBody));
    this.restClient
      .publicPost(environment.UAM_REGISTER_API, requestBody)
      .subscribe({
        next: (result: APIResponse) => {
          var dialogRef = this.dialog.open(ShowReferenceIdDialogComponent);
          var comp = dialogRef.componentInstance;
          comp.message = result.data.referenceNo;
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/home']);
          });
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
          console.log('Role Saved');

          this.spinner = false;
        },
      });
  }


  // @ViewChild('content') content: ElementRef;
  // public SavePDF(): void {
  //   let content=this.content.nativeElement;
  //   let doc = new jsPDF('p', 'pt', [2000, 3000]);
  //   let _elementHandlers =
  //   {
  //     '#editor':function(element:any,renderer:any){
  //       return true;
  //     }
  //   };
  //   doc.html(document.body, {
  //     callback: function (pdf) {
  //       doc.save('DOC.pdf');
  //     }
  //  })

  // }


  // @ViewChild('content') content: ElementRef;
  public navigateToEditForm(): void {



    this.userdetails.enable();
    this.employmentDetails.enable();
    this.locationDetails.enable();
    this.applicationDetails.enable();
    this.applicationAccess.enable();
    this.applicationAccess.enable();
    this.VPNDetails.enable();

    this.editForm.emit(true);

  }
  public SavePDF(): void {
    this.spinner=true;
    let DATA = document.getElementById('content1');
    let TableData = document.getElementById('content2');
    let remarksData = document.getElementById('content3');
    var pdfOptions:jsPDFOptions ={
      orientation: "p",
      compress: true,
    }
    let PDF = new jsPDF(pdfOptions);
    var options = {
      // quality: 0.99,
      // width: 1280,
      // height: 720,
  }
    domtoimage.toPng(DATA!,options)
    .then(dataUrl=>
    {
        PDF.addImage(dataUrl, 'PNG', 0, 0, 208, 134.12);
        domtoimage.toPng(TableData!,options)
        .then(dataUrl=>
        {
            PDF.addPage();
            PDF=PDF.setPage(2);
            PDF.addImage(dataUrl, 'PNG', 0, 0, 208, 134.12);
            domtoimage.toPng(remarksData!,options)
            .then(dataUrl=>
            {
                PDF.addPage();
                PDF=PDF.setPage(3);
                PDF.addImage(dataUrl, 'PNG', 0, 0, 208, 134.12);
                PDF.save('ApprovalForm.pdf');

                this.spinner=false;
            })
        })

    });
//  html2canvas(DATA!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

//         let fileWidth = 208;
//         let fileHeight = canvas.height * fileWidth / canvas.width;

//         const FILEURI = canvas.toDataURL('image/png')
//         let position = 0;
//         PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

//     // this.spinner=false;
//     //     PDF.save('Applciation Form.pdf');
//     });
//     html2canvas(TableData!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

//           let fileWidth = 208;
//           let fileHeight = canvas.height * fileWidth / canvas.width;

//           const FILEURI = canvas.toDataURL('image/png')
//           let position = 0;
//           PDF.addPage();
//           PDF=PDF.setPage(2);
//           PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

//           // this.spinner=false;
//           // PDF.save('Applciation Form.pdf');
//       });
//       html2canvas(remarksData!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

//                 let fileWidth = 208;
//                 let fileHeight = canvas.height * fileWidth / canvas.width;

//                 const FILEURI = canvas.toDataURL('image/png')
//                 let position = 0;
//                 PDF.addPage();
//                 PDF=PDF.setPage(3);
//                 PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

//                 this.spinner=false;
//                 PDF.save('Applciation Form.pdf');
//             });

    // html2canvas(DATA!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

    //     let fileWidth = 208;
    //     let fileHeight = canvas.height * fileWidth / canvas.width;

    //     const FILEURI = canvas.toDataURL('image/png')
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

    // // this.spinner=false;
    // //     PDF.save('Applciation Form.pdf');
    // }).then(canvas=>{
    //   html2canvas(TableData!,{foreignObjectRendering:false,removeContainer:true}).then(canvas => {

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

export interface NextApproverData {
  name:  string;
  org:   string;
  empId: string;
  email: string;
  phone: string;
}
