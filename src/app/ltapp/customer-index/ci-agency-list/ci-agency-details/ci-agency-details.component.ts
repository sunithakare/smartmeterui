import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AgencyData, AgencyDataSearch, AgencyDetailsResponse } from '../ci-agency-list.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ci-agency-details',
  templateUrl: './ci-agency-details.component.html',
  styleUrls: ['./ci-agency-details.component.css']
})
export class CiAgencyDetailsComponent implements OnInit {
 
  @Input()
  isNavigation:boolean=false;
   @Input()
   isEditable: boolean=false;

   @Input()
   agencyDetails:AgencyDetailsResponse;


  spinner:any;
 // selectedIndex=0;
 @Output()
 dataSaved: EventEmitter<number> = new EventEmitter();
 
 agencyCreationForm: FormGroup;

  agencydetails: AgencyData[]= [];
  asignedAgency: AgencyData[]=[];

   permissionFilterStr:FormControl=new FormControl('');
   assignedPermissionFilterStr:FormControl=new FormControl('');


  constructor(
    public restClient:HttpclientService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
     this.agencyCreationForm=new FormGroup({
      agencyType: new FormControl(''),
       agencyName: new FormControl(''),
       agencyCode: new FormControl(''),
       agencyManager: new FormControl(''),
       landmark: new FormControl(''),
       mobile: new FormControl(''),
       email: new FormControl(''),
       status: new FormControl(''),
     }); 
     
    }

  ngOnChanges() {
  if(this.agencyDetails ==null && this.agencyDetails ==undefined){
    this.agencyCreationForm=new FormGroup({
      agencyType: new FormControl(''),
       agencyName: new FormControl(''),
       agencyCode: new FormControl(''),
       agencyManager: new FormControl(''),
       landmark: new FormControl(''),
       mobile: new FormControl(''),
       email: new FormControl(''),
       status: new FormControl(''),
     }); 
  }else{
    this.agencyCreationForm=new FormGroup({
      agencyType: new FormControl([this.agencyDetails.agencyType]),
       agencyName: new FormControl(this.agencyDetails.agencyName),
       agencyCode: new FormControl(this.agencyDetails.agencyCode),
       agencyManager: new FormControl(this.agencyDetails.agencyManager),
       landmark: new FormControl(this.agencyDetails.landmark),
       mobile: new FormControl(this.agencyDetails.mobile),
       email: new FormControl(this.agencyDetails.email),
       status: new FormControl(this.agencyDetails.status),
     }); 
  }
  
  
  }

saveagencyCreationData(){
   if(!this.agencyCreationForm.valid){
   return;
   }
    this.spinner =true;

    var queryParams: any ={};
    let apiURL='';
    if(this.isNavigation){

      apiURL = environment.UPDATE_AGENCY_CREATION_API;

    }
    else{

      apiURL = environment.SAVE_AGENCY_CREATION_API;
      
      
    }
  
     this.restClient.post(apiURL, this.agencyCreationForm.getRawValue()).subscribe({

      next:(result:APIResponse)=>{

        let snackBarRef = this.snackBar.open(
          'Data saved successfully','close',

          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 4000,
          }
          
        );
      
        this.dataSaved.emit(0);
      },
     error:(err: any) =>{
       console.log(err);

       let snackBarRef= this.snackBar.open('server error','close',{
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4000,
       });
       this.spinner= false;
     },
      complete: () =>{
        console.log('Data Saved');
        this.spinner =false;
      },
     });
}


fetchdataforlookup(): void{
  this.spinner = true;
  var queryParams: any ={};

  queryParams['agencyName'] =this.agencyCreationForm.getRawValue().agencyName;
  queryParams['agencyCode'] =this.agencyCreationForm.getRawValue().agencyCode;
  this.restClient.getwithParam("/AgencyCreation/lookupdata",queryParams).subscribe({

    next:(result:APIResponse) =>{
    var response= result.data as AgencynameAndAgencyCodeLookupAPIResp;
    this.agencyCreationForm.controls['agencyType'].setValue(response.agencyType);
    this.agencyCreationForm.controls['mobile'].setValue(response.mobile);
    this.agencyCreationForm.controls['landmark'].setValue(response.landmark);
    },
    error:(err:any) =>{
      console.log(err);
      this.spinner =false;
    },
    complete: () => {
      this.spinner= false;
    },
  });
}
}

export interface AgencynameAndAgencyCodeLookupAPIResp{

  agencyType:[];
  agencyCode: string;
  agencyName: string;
  agencyManager: string;
  email: string;
   mobile: string;
  landmark:string;
  status: string;
}
