import { SupplierItems } from './../masters-supplier-list.component';
import { SupplierList } from './../../../return-to-supplier/return-to-supplier-details/return-to-supplier-detaisl.component';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIResponse, ConfigCode, HttpclientService } from 'src/app/services/httpclient.service';
import { Router } from '@angular/router';
import { supplierData } from '../masters-supplier-list.component';
import { environment } from 'src/environments/environment';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-masters-supplier-details',
  templateUrl: './masters-supplier-details.component.html',
  styleUrls: ['./masters-supplier-details.component.css']
})
export class MastersSupplierDetailsComponent implements OnInit {

  @Input()
  isEditable: boolean = false;
  @Input()
  isNavigation: boolean = false;
  @Input()
  supplierDetailsData:supplierData;
  currentPage=0;
  pageSize=15;

   @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  supplierForm:FormGroup;
  dataSource = new MatTableDataSource<any>();
  spinner: boolean = false;

  storeCode:any;

  displayedColumns: string[] = [
    'sNo',
    'groupName',
    'action',
  ];
  searcher:any={
    state:"",
  discom:"",
  }

  totalStatesList: ConfigCode[] = [];
  discomList: ConfigCode[] = [];
  deleteItems: number[] = [];
  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.supplierForm = new FormGroup({
      supplier :new FormControl('',Validators.required),
      contactPerson: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      mobileNumber: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
      address: new FormControl('',Validators.required),
      status: new FormControl('',Validators.required),
      city: new FormControl(''),
      supplierCode: new FormControl({value:'', disabled:true}),
      remark: new FormControl(''),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),]),
      gstinNo: new FormControl('',Validators.required),
      groups:new FormArray([])
    });
    this.dataSource = new MatTableDataSource<any>();
    this.getAllState();
    this.getItemGroup();
    this.deleteItems = [];
  }
  ngOnChanges(){
     if(this.supplierDetailsData==null || this.supplierDetailsData == undefined){
       this.supplierForm = new FormGroup({
        supplier :new FormControl('',Validators.required),
        contactPerson: new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        mobileNumber: new FormControl('',[Validators.required,  Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")]),
        address: new FormControl('',Validators.required),
        status: new FormControl('',Validators.required),
        city: new FormControl(''),
        supplierCode: new FormControl({ value: '', disabled: !this.isEditable },[Validators.required]),
        remark: new FormControl(''),
        email: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),]),
        gstinNo: new FormControl('',Validators.required),
        groups:new FormArray([])
       })
     }else{
       this.supplierForm=new FormGroup({
         id:new FormControl(this.supplierDetailsData.id),
        supplier:new FormControl(this.supplierDetailsData.supplier,[Validators.required]),
        contactPerson:new FormControl(this.supplierDetailsData.contactPerson,[Validators.required]),
        state:new FormControl(this.supplierDetailsData.state,[Validators.required]),
        mobileNumber:new FormControl(this.supplierDetailsData.mobileNumber,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        address:new FormControl(this.supplierDetailsData.address,[Validators.required]),
        status:new FormControl(this.supplierDetailsData.status,[Validators.required]),
        email:new FormControl(this.supplierDetailsData.email,[Validators.required]),
        gstinNo:new FormControl(this.supplierDetailsData.gstinNo,[Validators.required]),
        city:new FormControl(this.supplierDetailsData.city),
        supplierCode:new FormControl({value: this.supplierDetailsData.supplierCode,disabled: true,}),
        remark:new FormControl(this.supplierDetailsData.remark),
        groups:new FormArray([])
       });

       var itemGroupFormArray=new FormArray(this.supplierDetailsData.groups.map(this.getItemGroupListAsForm));
      //  this.supplierForm.setControl('groups',itemGroupFormArray);
      this.supplierDetailsData.groups.forEach(element => {

        (<FormArray>this.supplierForm.get('groups')).push(new FormGroup({groupName:new FormControl(element.groupName)}));


      });
      this.dataSource.data = (<FormArray>this.supplierForm.get('groups')).controls;
    this.dataSource.data = this.dataSource.data;

     }
    // this.supplierForm.controls['itemCatsupplieregory'].valueChanges.subscribe(value => {
    //   this.supplierForm.controls['supplier'].patchValue(this.supplierForm.controls['supplier'].value.toUpperCase(), {emitEvent: false});
    // });


  }

  id:any;
  saveSupplierMapping(){
    if(!this.supplierForm.valid){
      return;
    }

    this.spinner = true;
var queryParams: any = {};
let apiURL='';
if(this.isNavigation){
  apiURL=environment.INVENTORY_MASTER_UPDATE_SUPPLIER;

}else{
  apiURL=environment.INVENTORY_MASTER_SAVE_SUPPLIER;
}

this.restClient.post(apiURL, this.supplierForm.getRawValue()).subscribe({
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
  createApprover(): void {
  }

getItemGroupListAsForm(itemGroup:SupplierItems):FormGroup{
return new FormGroup({itemGroup:new FormControl({value:itemGroup.groupName},Validators.required)})
}

  addNewSupplier(){
    if (!this.supplierForm.valid) {

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
    (<FormArray>this.supplierForm.get('groups')).push(new FormGroup({groupName:new FormControl('',Validators.required)}));

    this.dataSource.data = (<FormArray>this.supplierForm.get('groups')).controls;
    this.dataSource.data = this.dataSource.data;


  }

  getAllState(): void {
    this.spinner = true;
    var queryParams: any = {};
    queryParams['type'] = 'STATE';

    this.restClient
      .getwithParam(environment.FETCH_CONFIG_CODE_LIST_API, queryParams)
      .subscribe({
        next: (result: APIResponse) => {
          this.totalStatesList = result.data as ConfigCode[];
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

  getItemGroup(){
    // var queryParam:any={};
    // queryParam['page']=this.currentPage;
    // queryParam['size']=this.pageSize;

    // this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_TYPE_FETCH_ITEM_GROUP,queryParam).subscribe({
    //   next:(res:any)=>{

    //     this.storeCode=res.data.content;
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     this.spinner = false;
    //   },
    //   complete: () => {
    //     this.spinner = false;
    //   },

    var queryParam:any={};

    this.restClient.get(environment.INVENTORY_MASTERS_ITEM_CATEGORY_FETCH_ITEM_GROUP).subscribe({
      next:(result: APIResponse)=>{
        this.storeCode=result.data;
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


  removeSupplier(i:number){
    (<FormArray>this.supplierForm.get('groups')).removeAt(i);
    //this.discomArray.splice(i, 1);
    this.deleteItems.push(i);
    this.dataSource.data = this.dataSource.data;
   // this.selectedDiscomsList.splice(i, 1);
  }

}
export interface AllAgencyList{
  shortCode:string;
}
