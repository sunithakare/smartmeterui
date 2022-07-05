import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { AimsIndentApproverFields, IndentAproData } from '../indent-approver.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-indent-approver-details',
  templateUrl: './indent-approver-details.component.html',
  styleUrls: ['./indent-approver-details.component.css']
})
export class IndentApproverDetailsComponent implements OnInit {

  indentApproverForm:FormGroup;

  @Input()
  indentAproData:IndentAproData;

    dataSource = new MatTableDataSource<any>();

    @Input()
    isNavigation: boolean = false;
    @Input()
    isEditable: boolean = false;
    @Output()
    dataSaved: EventEmitter<number> = new EventEmitter();

    spinner:Boolean=false;
  selectedIndex = 0;
  totalRows= 0;
  pageSize= 15;
  currentPage= 0;
  isLoading=false;
  filtered=false;

  displayedColumns: string[] = [
    'sNo',
    'itemGroup',
    'itemCategory',
    'itemModelName',
    'supplier',
    'qty',
    'approverQty',
    'action',
    'remove',
  ];

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.indentApproverForm = new FormGroup({
      agencyType: new FormControl('',Validators.required),
      agencyName: new FormControl('',Validators.required),
      warehouse: new FormControl('',Validators.required),
      indentDate: new FormControl('',Validators.required),
      authPerson: new FormControl('',Validators.required),
      contactNo: new FormControl('',Validators.required),
      indentNo: new FormControl('',Validators.required),
     // id: new FormControl('',Validators.required),
      remark:new FormControl('',Validators.required),
      items:new FormArray([]),
    });

    this.getItemGroup();
  }

  ngOnChanges(){
    if(this.indentAproData!=null && this.indentAproData!=undefined){
      this.indentApproverForm = new FormGroup({
        agencyType: new FormControl(this.indentAproData.agencyType,Validators.required),
        agencyName: new FormControl(this.indentAproData.agencyName,Validators.required),
        warehouse: new FormControl(this.indentAproData.warehouse,Validators.required),
        indentDate: new FormControl(this.indentAproData.indentDate,Validators.required),
        authPerson: new FormControl(this.indentAproData.authPerson,Validators.required),
        contactNo: new FormControl(this.indentAproData.contactNo,Validators.required),
        indentNo: new FormControl(this.indentAproData.indentNo,Validators.required),
       // id: new FormControl(this.indentAproData.id,Validators.required),
        remark:new FormControl(this.indentAproData.remark,Validators.required),
        items:new FormArray([]),
      });

    }
       var identApproverFormArray=new FormArray(this.indentAproData.items.map(this.getIndentApproverListAsForm));
     // this.indentApproverForm.setControl('indentItemList',identApproverFormArray);

     this.indentAproData.items.forEach(element => {
      alert(element.itemGroup);
      this.getItemGroup();

    this.getItemCategoryByGroup(element.itemGroup);
    this.getItemModelByItemCategory(element.itemCategory);
    this.getSupplierByItemModelName(element.itemModelName);
    this.getSupplierByQty(element.qty);
    this.getSupplierByApproverQty(element.approverQty);



      (<FormArray>this.indentApproverForm.get('items')).push(new FormGroup({itemGroup:new FormControl(element.itemGroup,Validators.required),
    itemCategory:new FormControl(element.itemCategory,Validators.required),
    itemModelName:new FormControl(element.itemModelName,Validators.required),
    supplier:new FormControl(element.supplier,Validators.required),
    qty:new FormControl(element.qty,Validators.required),
    approverQty:new FormControl(element.approverQty,Validators.required),
    action:new FormControl(element.action,Validators.required)

    }));



    this.dataSource.data = (<FormArray>this.indentApproverForm.get('items')).controls;
    this.dataSource.data = this.dataSource.data;

    });


}

getItemGroup(){

}
getItemCategoryByGroup(event:any){

}

getItemModelByItemCategory(event:any){

}

getSupplierByItemModelName(event:any){

}
getSupplierByQty(event:any){

}
getSupplierByApproverQty(event:any){

}

addNewIndentApprover(){
  if (!this.indentApproverForm.valid) {

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

  (<FormArray>this.indentApproverForm.get('items')).push(new FormGroup({
    itemGroup:new FormControl('',Validators.required),
    itemCategory:new FormControl('',Validators.required),
    itemModelName:new FormControl('',Validators.required),
    supplier:new FormControl('',Validators.required),
    qty:new FormControl('',Validators.required),
    approverQty:new FormControl('',Validators.required),
    action:new FormControl('',Validators.required)
  }));

  this.dataSource.data = (<FormArray>this.indentApproverForm.get('items')).controls;
  this.dataSource.data = this.dataSource.data;


}

getIndentApproverListAsForm(itemGroup:AimsIndentApproverFields):FormGroup{
  return new FormGroup({
    itemGroup:new FormControl({value:itemGroup.itemGroup},Validators.required),
    itemCategory:new FormControl({value:itemGroup.itemCategory},Validators.required),
    itemModelName:new FormControl({value:itemGroup.itemModelName},Validators.required),
    supplier:new FormControl({value:itemGroup.supplier},Validators.required),
    qty:new FormControl({value:itemGroup.qty},Validators.required),
    approverQty: new FormControl({value:itemGroup.approverQty},Validators.required),
    action: new FormControl({value:itemGroup.action},Validators.required)
  })

  }

removeSupplier(i:number){
  (<FormArray>this.indentApproverForm.get('items')).removeAt(i);
  //this.discomArray.splice(i, 1);
  this.dataSource.data = this.dataSource.data;
 // this.selectedDiscomsList.splice(i, 1);
}

  saveIndentApprover(){
    alert("saving function called..!");
    alert(this.indentApproverForm.getRawValue().item)
    var reqbody=this.indentApproverForm.getRawValue();
    this.restClient.post(environment.BASE_URL+'/approver/saveIndentApprover',reqbody).subscribe({
      next:(result:APIResponse)=>{
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
        console.log('Data Saved');

        this.spinner = false;
      },
    });
  }

  backToList(){
    this.dataSaved.emit(0);
  }

}
