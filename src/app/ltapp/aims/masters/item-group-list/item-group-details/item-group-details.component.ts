import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { ItemGroupData, UserErrorMsgData } from '../item-group-list.component';

@Component({
  selector: 'app-item-group-details',
  templateUrl: './item-group-details.component.html',
  styleUrls: ['./item-group-details.component.css']
})
export class ItemGroupDetailsComponent implements OnInit {
  selectedIndex=0;
  spinner:boolean=false;
  @Input()
  isNavigation: boolean=false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  @Input()
  itemGroupDetails: ItemGroupData;

  @Input()
  isDisabled:boolean;
  itemgroupform:FormGroup;
  dataSource= new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'srNo',
    'errorCode',
    'errorDescription',
    'action',
  ];


  constructor(
    private authservice: AuthService,
    private restClient:HttpclientService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.itemgroupform = new FormGroup({
      itemGroup: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      transactionMechnsm:new FormControl('',Validators.required),
      errors:new FormArray([])

      // status: new FormControl(false,[Validators.required]),
      // id: new FormControl('',[Validators.required]),

    });
  }

  ngOnChanges(){
    if(this.itemGroupDetails==null || this.itemGroupDetails==undefined){
      this.itemgroupform = new FormGroup({
        id:new FormControl(''),
      itemGroup: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      transactionMechnsm:new FormControl('',Validators.required),
      errors:new FormArray([])
      })
    }else{
        this.itemgroupform = new FormGroup({
        id:new FormControl(this.itemGroupDetails.id),
          itemGroup: new FormControl({value:this.itemGroupDetails.itemGroup,disabled:!this.isDisabled},[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
          transactionMechnsm:new FormControl(this.itemGroupDetails.transactionMechnsm),

          // transactionMechnsm:new FormArray([]),

          // status:new FormControl(this.itemGroupDetails.status),
          // id: new FormControl(this.itemGroupDetails.id,[Validators.required]),
          errors:new FormArray([])
      });
      var userErrorMsgFormArray=new FormArray(this.itemGroupDetails.errors.map(this.getUserErrorMsgAsForm));
  // this.itemgroupform.setControl('errors',userErrorMsgFormArray);

  this.itemGroupDetails.errors.forEach(element => {

  (<FormArray>this.itemgroupform.get('errors')).push(new FormGroup({errorCode:new FormControl(element.errorCode,Validators.required),errorDescription:new FormControl(element.errorDescription,Validators.required)}));

  });


    this.dataSource.data = (<FormArray>this.itemgroupform.get('errors')).controls;
    this.dataSource.data = this.dataSource.data;
      }
  }
  saveItemGroupData(){
    if(!this.itemgroupform.valid){
      return;
    }
    // alert(this.itemgroupform.getRawValue().errors)
    this.spinner = true;
    var queryParams: any = {};
    let apiURL='';

      apiURL=environment.INVENTORY_MASTERS_ITEM_GROUP_SAVE_DATA;

    this.restClient.post(apiURL, this.itemgroupform.getRawValue()).subscribe({
      next: (result: APIResponse) => {
        let snackBarRef = this.snackBar.open(
          'Data Saved Successfully','close',
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
        console.log('Field User Allotment Saved');
        this.spinner = false;
      },
    });
  }
  backToList(){
    this.dataSaved.emit(0);

  }
  getUserErrorMsgAsForm(userErrorMessage:UserErrorMsgData):FormGroup{
    return new FormGroup({errorCode:new FormControl({value:userErrorMessage.errorCode},Validators.required),errorDescription:new FormControl({value:userErrorMessage.errorDescription},)
    // return new FormGroup({errorDescription:new FormControl({value:itemGroup.itemGroupName},Validators.required)},)
  });
  }

    addNewUserErrorMessage(){
    if (!this.itemgroupform.valid) {

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
    (<FormArray>this.itemgroupform.get('errors')).push(new FormGroup({errorCode:new FormControl('',Validators.required),errorDescription:new FormControl('',Validators.required)}));


    this.dataSource.data = (<FormArray>this.itemgroupform.get('errors')).controls;
    this.dataSource.data = this.dataSource.data;}
    removeUserErrorMsg(i:number){
      (<FormArray>this.itemgroupform.get('errors')).removeAt(i);
      this.dataSource.data = this.dataSource.data;

    }
    removeSupplier(i:number){
      (<FormArray>this.itemgroupform.get('errors')).removeAt(i);
      this.dataSource.data = this.dataSource.data;

    }
}
// export interface ItemGroupDetailData{

//   itemGroup:string
//   transactionMechnsm:string

// }
