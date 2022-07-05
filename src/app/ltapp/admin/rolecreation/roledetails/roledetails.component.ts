import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  APIResponse,
  ConfigCode,
  HttpclientService,
} from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { RoleDetail, SystemAccess } from '../rolecreation.component';

@Component({
  selector: 'app-roledetails',
  templateUrl: './roledetails.component.html',
  styleUrls: ['./roledetails.component.css'],
})
export class RoledetailsComponent implements OnInit {
  @Input()
  isEditable: boolean = false;
  @Input()
  isNavigation: boolean = false;
  @Input()
  roledetails: RoleDetail;

  @Output() dataSaved: EventEmitter<number> = new EventEmitter();

  rolesForm: FormGroup;
  // roleName:FormControl =new FormControl();
  // module:FormControl =new FormControl();
  // roleType =new FormControl();
  selectedIndex = 0;
  spinner = false;
  moduleList: Modules[] = [];
  roleTypeList: ConfigCode[] = [];

  permissionsList: SystemAccess[] = [];

  asignedPermission: SystemAccess[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService
  ) {}

  ngOnInit(): void {
    this.rolesForm = new FormGroup({
      roleName: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      module: new FormControl('', [Validators.required]),
      roleType: new FormControl('', [Validators.required]),
      roleDesc: new FormControl('', [Validators.required]),
    });
    this.fetchRoleTypeList();
    this.fetchModulesList();

    // this.roleName=new FormControl('', [Validators.required, Validators.maxLength(60)]);
    // this.module=new FormControl('', [Validators.required]);
    // this.roleType=new FormControl('', [Validators.required]);
  }
  ngOnChanges() {
    if (this.roledetails == undefined || this.roledetails == null) {
      // this.rolesForm = new FormGroup({
      //   roleName: new FormControl('', [
      //     Validators.required,
      //     Validators.maxLength(60),
      //   ]),
      //   module: new FormControl('', []),
      //   roleType: new FormControl('', [Validators.required]),
      //   roleDesc: new FormControl('', [Validators.required]),
      // });
      this.rolesForm = new FormGroup({
        roleName: new FormControl({value:'',disabled:!this.isEditable || this.isNavigation}, [
          Validators.required,
          Validators.maxLength(60),
        ]),
        module: new FormControl({value:'',disabled:!this.isEditable}, []),
        roleType: new FormControl({value:'',disabled:!this.isEditable || this.isNavigation}, [
          Validators.required,
        ]),
        roleDesc: new FormControl({value:'',disabled:!this.isEditable}, [
          Validators.required,
        ]),
      });

    } else {
      this.rolesForm = new FormGroup({
        roleName: new FormControl({value:this.roledetails.roleName,disabled:!this.isEditable || this.isNavigation}, [
          Validators.required,
          Validators.maxLength(60),
        ]),
        module: new FormControl({value:this.roledetails.module,disabled:!this.isEditable}, []),
        roleType: new FormControl({value:this.roledetails.roleType,disabled:!this.isEditable || this.isNavigation}, [
          Validators.required,
        ]),
        roleDesc: new FormControl({value:this.roledetails.roleDesc,disabled:!this.isEditable}, [
          Validators.required,
        ]),
      });
      this.asignedPermission = JSON.parse(
        JSON.stringify(this.roledetails.asignedPermission)
      );
      this.permissionsList = JSON.parse(
        JSON.stringify(this.roledetails.permissionsList)
      );
    }
  }

  drop(event: CdkDragDrop<SystemAccess[]>) {
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
            item.privilegeName ===
              event.previousContainer.data[event.previousIndex].privilegeName &&
            item.privilegeType ===
              event.previousContainer.data[event.previousIndex].privilegeType
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

    this.spinner = false;
    this.selectedIndex = 1;
  }

  fetchRoleTypeList() {
    this.spinner = true;

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
          this.spinner = false;
        },
        complete: () => {
          console.log('Role List Fetch Complete ');
          this.spinner = false;
        },
      });
  }

  fetchModulesList() {
    this.spinner = true;

    var queryParams: any = {};

    this.restClient
      .getwithParam(environment.FETCH_All_MODULES_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.moduleList = result.data as Modules[];
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

  fetchPermissionList(module: string) {
    this.spinner = true;

    var queryParams: any = {};

    this.restClient
      .getwithParam(
        environment.FETCH_MODULE_ACCESS_API + '/' + module,
        queryParams
      )
      .subscribe({
        next: (result: APIResponse) => {
          this.permissionsList = result.data as SystemAccess[];
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

  saveRoleData() {
    if (!this.rolesForm.valid) {
      return;
    }
    this.spinner = true;
    let requestBody: RoleRequest = {
      roleDesc: this.rolesForm.getRawValue().roleDesc,
      roleName: this.rolesForm.getRawValue().roleName,
      roleType: this.rolesForm.getRawValue().roleType,
      asignedPermission: this.asignedPermission,
    };

    var queryParams: any = {};
let apiURL='';
if(this.isNavigation){
  apiURL=environment.SAVE_ROLE_API;
}else{
  apiURL=environment.CREATE_ROLE_API;
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
        console.log('Role Saved');

        this.spinner = false;
      },
    });
  }

  fetchPermissions(event: MatSelectChange) {
    let newModule = event.value;
    this.fetchPermissionList(newModule);
    // fetch permission list here
  }
}

export interface Modules {
  module: string;
}

export interface RoleRequest {
  roleDesc: string;
  roleName: string;
  roleType: string;
  asignedPermission: SystemAccess[];
}
