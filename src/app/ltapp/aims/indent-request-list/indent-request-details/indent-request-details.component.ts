import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { AimsIndentFeilds, IndentReqData, IndentReqDetailsData } from '../indent-request-list.component';

@Component({
  selector: 'app-indent-request-details',
  templateUrl: './indent-request-details.component.html',
  styleUrls: ['./indent-request-details.component.css']
})
export class IndentRequestDetailsComponent implements OnInit ,OnChanges{

  @Input()
  indentReqData!:IndentReqData;
  simIndentForm:FormGroup;
@Input()
  warehouseAct:IndentReqDetailsData;

  isDisabled=false;

  agencyTypeValuesDD:any;

  agencyTypeAutoLookup:any;
  agencyNameAutoLookup:any;
  warehouseAutoLookup:any;

  itemSupplierValues:string;


  groupValues:any;
  itemCategoryValues:any;
  itemModelValues:any;

  @Input()
  makeReadOnly:boolean;

  dataSource = new MatTableDataSource<any>();

  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();


  displayedColumns: string[] = [
    'sNo',
    'itemGroup',
    'itemCategory',
    'itemModelName',
    'supplier',
    'approvQuantity',
    'action',
  ];


  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    // this.makeReadOnly=false;
    this.agencyTypeAutoLook();
    this.agencyNameAutoLook();
    this.wareHouseAutoLook();
    alert(this.agencyTypeAutoLookup)
    this.simIndentForm = new FormGroup({
      agencyType: new FormControl('',Validators.required),
      agencyName: new FormControl('',Validators.required),
      warehouse: new FormControl('',Validators.required),
      indentDate: new FormControl('',Validators.required),
      authPerson: new FormControl('',Validators.required),
      contactNo: new FormControl('',Validators.required),
      approver: new FormControl('',Validators.required),
      remarks:new FormControl('',Validators.required),
      items:new FormArray([]),
    });

    this.getItemGroup();




  }


  ngOnChanges(){

      if(this.indentReqData!=null && this.indentReqData!=undefined){
        this.simIndentForm = new FormGroup({
          id:new FormControl(this.indentReqData.id),
          agencyType: new FormControl(this.indentReqData.agencyType,Validators.required),
          agencyName: new FormControl(this.indentReqData.agencyName,Validators.required),
          warehouse: new FormControl(this.indentReqData.warehouse,Validators.required),
          indentDate: new FormControl(this.indentReqData.indentDate,Validators.required),
          authPerson: new FormControl(this.indentReqData.authPerson,Validators.required),
          contactNo: new FormControl(this.indentReqData.contactNo,Validators.required),
          approver: new FormControl(this.indentReqData.approver,Validators.required),
          items:new FormArray([]),
        });

      }

      this.findAgencyType();
      var itemGroupFormArray=new FormArray(this.indentReqData.items.map(this.getItemGroupListAsForm));
      //  this.simIndentForm.setControl('items',itemGroupFormArray);

      this.indentReqData.items.forEach(element => {
        alert(element.itemGroup);
        this.getItemGroup();

      this.getItemCategoryByGroup(element.itemGroup);
      this.getItemModelByItemCategory(element.itemCategory);
      this.getSupplierByItemModelName(element.itemModelName);



        (<FormArray>this.simIndentForm.get('items')).push(new FormGroup({itemGroup:new FormControl(element.itemGroup,Validators.required),
      itemCategory:new FormControl(element.itemCategory,Validators.required)
    ,itemModelName:new FormControl(element.itemModelName,Validators.required)
    ,supplier:new FormControl(element.supplier,Validators.required)
    ,approvQuantity:new FormControl(element.approvQuantity,Validators.required)
      }));



      this.dataSource.data = (<FormArray>this.simIndentForm.get('items')).controls;
      this.dataSource.data = this.dataSource.data;

      });






  }


  findAgencyType(){

    var queryParam:any={};
    queryParam['type']='AGENCY_TYPE';

    this.restClient.getwithParam(environment.FETCH_CONFIG_CODE_LIST_API,queryParam).subscribe({
      next:(result:APIResponse)=>{
        this.agencyTypeValuesDD=result.data;
      }
    })
  }


  agencyTypeAutoLook(){
    this.agencyTypeAutoLookup='agency1'
  }

  wareHouseAutoLook(){
    this.warehouseAutoLookup='warehouse1'
  }

  agencyNameAutoLook(){
   this.agencyNameAutoLookup='agency1'
 }


 getItemGroup(){

  this.restClient.get(environment.BASE_URL+"/itemModelName/findGroup").subscribe({
    next:(result:APIResponse)=>{
      this.groupValues=result.data;

    }
  })
 }

 getItemCategoryByGroup(event:any){

var queryParam:any={}
if(event.value==undefined){
  queryParam['itemGroup']=event;
}else{
  queryParam['itemGroup']=event.value;
}

this.restClient.getwithParam(environment.BASE_URL+'/itemModelName/findItemCategory',queryParam).subscribe({
  next:(result:APIResponse)=>{
    this.itemCategoryValues=result.data;
  }
})

 }

 getItemModelByItemCategory(event:any){

  var queryParam:any={}
  if(event.value==undefined){
    queryParam['itemCategory']=event;
  }else{
    queryParam['itemCategory']=event.value;
  }

  this.restClient.getwithParam(environment.BASE_URL+'/itemModelName/findItemModelName',queryParam).subscribe({
    next:(result:APIResponse)=>{
      this.itemModelValues=result.data;
    }
  })

   }

   getSupplierByItemModelName(event:any){

    var queryParam:any={}
    if(event.value==undefined){
      queryParam['itemModelName']=event;
    }else{
      queryParam['itemModelName']=event.value;
    }

    this.restClient.getwithParam(environment.BASE_URL+'/itemModelName/findSupplier',queryParam).subscribe({
      next:(result:APIResponse)=>{
        this.itemSupplierValues=result.data.supplier;

      }
    })

     }




  addNewIndentReq(){
    if (!this.simIndentForm.valid) {

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

    (<FormArray>this.simIndentForm.get('items')).push(new FormGroup({itemGroup:new FormControl('',Validators.required),
    itemCategory:new FormControl('',Validators.required)
  ,itemModelName:new FormControl('',Validators.required)
  ,supplier:new FormControl('',Validators.required)
  ,approvQuantity:new FormControl('',Validators.required)
    }));

    this.dataSource.data = (<FormArray>this.simIndentForm.get('items')).controls;
    this.dataSource.data = this.dataSource.data;


  }

  getItemGroupListAsForm(itemGroup:AimsIndentFeilds):FormGroup{

    return new FormGroup({itemGroup:new FormControl({value:itemGroup.itemGroup},Validators.required)
  ,itemCategory:new FormControl({value:itemGroup.itemCategory},Validators.required),
  itemModelName:new FormControl({value:itemGroup.itemModelName},Validators.required),
  supplier:new FormControl({value:itemGroup.supplier},Validators.required),
  approvQuantity:new FormControl({value:itemGroup.approvQuantity},Validators.required)})
    }



  removeSupplier(i:number){
    (<FormArray>this.simIndentForm.get('items')).removeAt(i);
    //this.discomArray.splice(i, 1);
    this.dataSource.data = this.dataSource.data;
   // this.selectedDiscomsList.splice(i, 1);
  }


  saveAimsWareHouse(){
    alert("saving function called..!");
    alert(this.simIndentForm.getRawValue().item)
    var reqbody=this.simIndentForm.getRawValue();
    this.restClient.post(environment.BASE_URL+'/indent/saveIndentRequest',reqbody).subscribe({
      next:(result:APIResponse)=>{
        alert(result.data.item)
        this.dataSaved.emit(0);
      }
    })
  }

  backToList(){
    this.dataSaved.emit(0);
  }

}

// export interface AimsIndentReqDetails{
//   agencyType:string;
// agencyName:string;
// warehouse:string;
// indentDate:string;
// authPerson:string;
// contactNo:string;
// approver:string;
// indentItemList:AimsIndentFeilds[];
// }

