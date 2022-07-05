import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
} from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { RoleList } from '../../rolecreation/rolecreation.component';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Input()
  isEditable: boolean = false;
  @Input()
  isNavigation: boolean = false;
  @Input()
  userdetails: UserData;

  @Output() dataSaved: EventEmitter<number> = new EventEmitter();

  userForm: FormGroup;
  // roleName:FormControl =new FormControl();
  // module:FormControl =new FormControl();
  // roleType =new FormControl();
  // selectedIndex = -1;
  spinner = false;
  roleTypeList: ConfigCode[] = [];

  rolesList:RoleList[]  = [];

  asignedRoles:RoleList[] = [];



  stateList:StateList[]= [];
  discomArray:DiscomTableIterator[]= [];



  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['sNo','state', 'discomName', 'isDefault','range',"action"];

  selected:number=-1;
  minDate:Date=new Date();

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      orgName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      employeeId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phonoNo: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      discomDataList: this.formBuilder.array([])
    });

    let arrayResposne:DiscomData[]=[]
    let discomFGArray=arrayResposne.map(this.DiscomDataAsFormGroup,{isEditable:this.isEditable});


    this.userForm.setControl('discomDataList', new FormArray(discomFGArray) );

    this.dataSource = new MatTableDataSource((this.userForm.get('discomDataList') as FormArray).controls);

    this.fetchRoleTypeList();
    this.getAllState();

    // this.spinner = true;


    // this.restClient
    //   .getResponse(
    //     environment.FETCH_USER_DATA_API
    //   )
    //   .subscribe({
    //     next: (result: APIResponse) => {
    //      let  userResponse = result.data as UserData;

    //      userResponse.discomDataList.forEach((discom,index)=>this.discomArray.push({discomList:[]}));

    //      userResponse.discomDataList.forEach((discom,index)=>this.getDiscomDataForState(discom.state,index));
    //       this.userForm= this.getFormGroup(userResponse);
    //       this.dataSource = new MatTableDataSource((this.userForm.get('discomDataList') as FormArray).controls);
    //       this.asignedRoles=userResponse.userRolesList;
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //       this.spinner = false;
    //     },
    //     complete: () => {
    //       console.log('User Data Fetch Complete ');
    //       this.spinner = false;
    //     },
    //   });



  }

addNewDiscom(){
  if (this.userForm.value.discomDataList.length>0) {
    var lastItem = this.userForm.value.discomDataList[this.userForm.value.discomDataList.length-1];
    if (lastItem.discomName==="") {
          let snackBarRef = this.snackBar.open(
            'Please Verify Existing Record',
            'close',
            {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
            }
          );
      return;
    }
  }


  (<FormArray>this.userForm.get('discomDataList')).push(this.DiscomDataAsFormGroup(new DiscomData()));
  this.dataSource.data = this.dataSource.data;

  this.discomArray.push({discomList:[]});
}

removeDiscom(i:number){
  (<FormArray>this.userForm.get('discomDataList')).removeAt(i);
  this.discomArray.splice(i,1);
  this.dataSource.data = this.dataSource.data;

}
changeDefault(element:FormGroup,i:number,event:MatCheckboxChange){
if (event.checked) {
  this.selected = i;
}else{

  this.selected = -1;
}
}
checkUserNameAlreadyExists(){

  var queryParams: any = {
user:this.userForm.controls['userId'].value

  };

  this.restClient
    .getwithParam(
      environment.CHECK_USER_NAME_API ,
      queryParams
    )
    .subscribe({
      next: (result: APIResponse) => {
        this.userForm.controls['userId'].setErrors({'incorrect': true});
      },
      error: (err: any) => {
        this.userForm.controls['userId'].setErrors(null);
      },
      complete: () => {
        console.log('User Name check Complete ');
      },
    });


}


  ngOnChanges() {
    this.spinner = true;
    if (this.userdetails == undefined || this.userdetails == null || !this.isNavigation) {
          let userdata:UserData={
            firstName:      '',
            lastName:       '',
            orgName:        '',
            employeeId:     '',
            email:          '',
            phonoNo:        '',
            userId:        '',
            discomDataList: [],
            userRolesList:  []
          }


      this.userForm = this.getFormGroup(userdata);

      this.discomArray=[];
      this.dataSource = new MatTableDataSource((this.userForm.get('discomDataList') as FormArray).controls);
    } else {
this.userdetails.discomDataList.forEach((x,i)=>{
if (x.userDefault) {
  this.selected=i;
}

})

      this.userForm = this.getFormGroup(this.userdetails);
      this.asignedRoles = JSON.parse(
        JSON.stringify(this.userdetails.userRolesList)
      );
      this.discomArray=[];
      this.userdetails.discomDataList.forEach((discom,index)=>this.discomArray.push({discomList:[]}));

      this.userdetails.discomDataList.forEach((discom,index)=>this.getDiscomDataForState(discom.state,index));
      this.dataSource = new MatTableDataSource((this.userForm.get('discomDataList') as FormArray).controls);
    }
    this.spinner = false;
  }
  fetchStateList() {

    var queryParams: any = {};

    this.restClient
      .getwithParam(
        environment.FETCH_CONFIG_CODE_LIST_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.roleTypeList = result.data as ConfigCode[];
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
        },
      });
  }
  fetchRoleTypeList() {

    var queryParams: any = {};
    queryParams['type'] = 'ROLETYPE';

    this.restClient
      .getwithParam(
        environment.FETCH_CONFIG_CODE_LIST_API,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.roleTypeList = result.data as ConfigCode[];
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
        },
      });
  }
  drop(event: CdkDragDrop<RoleList[]>) {
    console.log(event.previousContainer.data);
    console.log(event.previousIndex);
    console.log(event.currentIndex);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (
        event.container.data.some(
          (item) =>
            item.roleName ===
              event.previousContainer.data[event.previousIndex].roleName &&
            item.roleType ===
              event.previousContainer.data[event.previousIndex].roleType
        )
      ) {
        event.previousContainer.data.splice(event.previousIndex, 1);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

    // this.spinner = false;
    // this.selectedIndex = 1;
  }

  fetchRolesForType(event: MatSelectChange) {
    let roleType = event.value;
    this.fetchRolesList(roleType);
    // fetch permission list here
  }
  fetchRolesList(roleType: string) {
    this.spinner = true;

    var queryParams: any = {};

    this.restClient
      .getwithParam(
        environment.FETCH_ALL_ROLES_FOR_TYPE_API + '/' + roleType,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.rolesList = result.data as RoleList[];
        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
          this.spinner = false;
        },
      });
  }
resetForm(stepper:MatStepper){

  stepper.reset();
  this.discomArray=[];
  this.userForm.setControl('discomDataList', this.formBuilder.array([]) );
  this.dataSource =  new MatTableDataSource((this.userForm.get('discomDataList') as FormArray).controls);
}
  saveUserData(stepper:MatStepper) {
    if (!this.userForm.valid) {
      return;
    }

    let requestBody=this.userForm.getRawValue();
    requestBody['userRolesList']=this.asignedRoles;
    this.spinner = true;


    var queryParams: any = {};
let apiURL='';
if(this.isNavigation){
  apiURL=environment.SAVE_USER_API;
}else{
  apiURL=environment.CREATE_USER_API;
}

    this.restClient.post(apiURL, requestBody).subscribe({
      next: (result: APIResponse) => {
        let snackBarRef = this.snackBar.open(
          'Data Saved SuccessFully',
          'close',
          {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 3000,
          }
        );
        this.resetForm(stepper);
        this.dataSaved.emit(0);
      },
      error: (err: any) => {
        console.log(err);

        let snackBarRef = this.snackBar.open('Server Error', 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        });
        this.spinner = false;
      },
      complete: () => {
        console.log('User Saved');

        this.spinner = false;
      },
    });
  }
  getAllState(){
    this.spinner = true;
      this.restClient
        .getResponse(
          environment.FETCH_ALL_STATES_API
        )
        .subscribe({
          next: (result: APIResponse) => {
          this.stateList=result.data as StateList[];


          },
          error: (err: any) => {
            console.log(err);
            this.spinner = false;
          },
          complete: () => {
            console.log('Discom List Fetch Complete ');
            this.spinner = false;
          },
        });
  }




getDiscomDataForStateChange(event:MatSelectChange,index:number){
  this.getDiscomDataForState(event.value,index);
}

getDiscomDataForState(stateName:string,index:number){
  this.spinner = true;
    var queryParams: any = {
      state:stateName
    };

    this.restClient
      .getwithParam(
        environment.FETCH_DISCOMS_IN_STATES_API ,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {

          let discomListResponse:DiscomList[]= result.data as DiscomList[];
          if(index<this.discomArray.length){
            this.discomArray[index]={discomList:discomListResponse};
          }else{
            this.discomArray.push({discomList:discomListResponse});
          }


        },
        error: (err: any) => {
          console.log(err);
          this.spinner = false;
        },
        complete: () => {
          console.log('Discom List Fetch Complete ');
          this.spinner = false;
        },
      });
}

getFormGroup(userData: UserData): FormGroup {
  var passwordControl
  if(this.isNavigation){
    passwordControl=new FormControl({value:'',disabled:!this.isEditable});
  }else{
    passwordControl=new FormControl({value:'',disabled:!this.isEditable},[Validators.required]);
  }


  let discomFomm=userData.discomDataList.map(this.DiscomDataAsFormGroup,{isEditable:this.isEditable});
  const fg =new FormGroup({
  firstName: new FormControl({value:userData.firstName,disabled:!this.isEditable},

    [
    Validators.required,
    Validators.maxLength(60),
  ]),
  lastName: new FormControl({value:userData.lastName,disabled:!this.isEditable}, [
    Validators.required,
    Validators.maxLength(60),
  ]),
  orgName: new FormControl({value:userData.orgName,disabled:!this.isEditable}, [
    Validators.required,
    Validators.maxLength(100),
  ]),
  employeeId: new FormControl({value:userData.employeeId,disabled:!this.isEditable}, [Validators.required]),
  email: new FormControl({value:userData.email,disabled:!this.isEditable}, [Validators.required]),
  phonoNo: new FormControl({value:userData.phonoNo,disabled:!this.isEditable}, [Validators.required,Validators.pattern(("[6-9]\\d{9}"))]),
  userId: new FormControl({value:userData.userId,disabled:!this.isEditable}, [Validators.required]),
  password:passwordControl,
  discomDataList: this.formBuilder.array(discomFomm),
  // userRoleList: new FormControl(userData.userRolesList)
});
return fg;
}

DiscomDataAsFormGroup(discomData: DiscomData): FormGroup {
  const fg = new FormGroup({
    discomName: new FormControl({value:discomData.discomName,disabled:!this.isEditable}, Validators.required),
    state: new FormControl({value:discomData.state,disabled:!this.isEditable}, Validators.required),
    userDefault: new FormControl({value:discomData.userDefault,disabled:!this.isEditable}, Validators.required),
    start: new FormControl({value:discomData.start,disabled:!this.isEditable}, Validators.required),
    end: new FormControl({value:discomData.end,disabled:!this.isEditable}, Validators.required)
  });
  return fg;
}
}


export interface StateList {
  state: string;
}
export interface DiscomTableIterator {
  discomList: DiscomList[];
}
export interface DiscomList {
  discomCode: string;
}

export interface UserData {
  firstName:      string;
  lastName:       string;
  orgName:        string;
  employeeId:     string;
  email:          string;
  phonoNo:        string;
  userId:         string;
  discomDataList: DiscomData[];
  userRolesList:  RoleList[];
}


export class DiscomData {
  discomName: string="";
  state: string="";
  userDefault: boolean=false;
  start: Date=new Date();
  end: Date=new Date();;

}
