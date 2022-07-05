import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { ItemClass } from '../item.component';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit ,OnChanges{

  @Input()
  isNavigation: boolean = false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  spinner:boolean=false;

 CategoryCode:any;
 storeCode:any;
 SupplierCode:any;

@Input()
  itemData:ItemClass;

  itemForm:FormGroup;

  currentPage=0;
  pageSize = 10;

  // itemGroup:itemGroupList[]=[
  //   {name:'select'},
  //   {name:'A'},
  //   {name:'B'}
  // ]
  // itemModelName : itemModelNameList[]=[
  //   {name:'select'},
  //   {name:'SAMPLE'},
  //   {name:'TEST'}
  // ]
  // supplier : supplierList[]=[
  //   {name:'select'},
  //   {name:'YES'},
  //   {name:'NO'}
  // ]
  // itemCategory : itemCategoryList[]=[
  //   {name:'select'},
  //   {name:'SAMPLE'},
  //   {name:'TEST'}
  // ]
  uom : uomList[]=[
    {name:'Qty'},
    {name:'Meters'},
    {name:'Kg'},
    {name:'Sets'}
  ]


  constructor(private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService,
   ){ }

  ngOnInit(): void {



    this.itemForm= new FormGroup({
      id:new FormControl(''),
      itemGroup:new FormControl('',Validators.required),
      itemModelName:new FormControl('',[Validators.required,Validators.maxLength(60)]),
      itemCategory:new FormControl('',Validators.required),
      supplier:new FormControl('',Validators.required),
      uom:new FormControl('',Validators.required),
      itemDescription:new FormControl('',Validators.required),
      itemHsn:new FormControl('',Validators.required),
      warrantyMonth:new FormControl('',Validators.required),
      remarks:new FormControl('',Validators.required),

    });
    this.getItemGroup();
    this.getItemCategory();
    this.getSupplier();
  }

ngOnChanges(changes: SimpleChanges): void {
  if(this.itemData==null || this.itemData == undefined){
  this.itemForm= new FormGroup({
    itemGroup:new FormControl('',Validators.required),
    itemModelName:new FormControl('',Validators.required),
    itemCategory:new FormControl('',Validators.required),
    supplier:new FormControl('',Validators.required),
    uom:new FormControl('',Validators.required),
    itemDescription:new FormControl('',Validators.required),
    itemHsn:new FormControl('',Validators.required),
    warrantyMonth:new FormControl('',Validators.required),
    remarks:new FormControl('',Validators.required),

  })
}else{
  // alert(this.itemData.id)
  this.itemForm= new FormGroup({

    id: new FormControl(this.itemData.id),
    itemGroup:new FormControl(this.itemData.itemGroup,Validators.required),
    itemModelName:new FormControl(this.itemData.itemModelName,Validators.required),
    itemCategory:new FormControl(this.itemData.itemCategory,Validators.required),
    supplier:new FormControl(this.itemData.supplier,Validators.required),
    uom:new FormControl(this.itemData.uom,Validators.required),
    itemDescription:new FormControl(this.itemData.itemDescription,Validators.required),
    itemHsn:new FormControl(this.itemData.itemHsn,Validators.required),
    warrantyMonth:new FormControl(this.itemData.warrantyMonth,Validators.required),
    remarks:new FormControl(this.itemData.remarks,Validators.required),

  });
  this.itemForm.controls['itemModelName'].valueChanges.subscribe(value => {
    this.itemForm.controls['itemModelName'].patchValue(this.itemForm.controls['itemModelName'].value.toUpperCase(), {emitEvent: false});
  });
}
}



saveItem(){
  if(!this.itemForm.valid){
    return;
  }
  this.spinner = true;
  var queryParams: any = {};
  let apiURL='';

    apiURL=environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_SAVE_DATA;


  this.restClient.post(apiURL, this.itemForm.getRawValue()).subscribe({
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
      console.log('Item Category Saved');
      this.spinner = false;
    },
  });
  }

  // saveItem(){
  //   if(!this.itemForm.valid){
  //     // alert("not valid")
  //     return;
  //   }
  //   // alert("valid")
  //   var reqBody:ItemClassDetails={
  //     id:this.itemForm.getRawValue().id,
  //     itemGroup:this.itemForm.getRawValue().itemGroup,
  //     itemHsn:this.itemForm.getRawValue().itemHsn,
  // itemModelName:this.itemForm.getRawValue().itemModelName,
  // itemDescription:this.itemForm.getRawValue().itemDescription,
  // itemCategory:this.itemForm.getRawValue().itemCategory,
  // supplier:this.itemForm.getRawValue().supplier,
  // warrantyMonth:this.itemForm.getRawValue().warrantyMonth,
  // remarks:this.itemForm.getRawValue().remarks,
  // uom:this.itemForm.getRawValue().uom,
  //   }
  //   this.restClient.post(environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_SAVE_DATA,reqBody).subscribe({
  //     next:(result:any)=>{
  //   this.dataSaved.emit(0);
  //     }
  //   })

  // }


 getItemGroup(){
      var queryParam:any={};
      queryParam['page']=this.currentPage;
queryParam['size']=this.pageSize;

      this.restClient.getwithParam(environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_FETCH_ITEM_GROUP,queryParam).subscribe({
        next:(res:any)=>{
          this.storeCode=res.data;
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


 getItemCategory(){
      var queryParam:any={};

      this.restClient.get(environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_FETCH_ITEM_CATEGORY).subscribe({
        next:(res:any)=>{
          this.CategoryCode=res.data;
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



 getSupplier(){
       var queryParam:any={};
       this.restClient.get(environment.INVENTORY_MASTERS_ITEM_MODEL_NAME_FETCH_ITEM_SUPPLIER).subscribe({
        next:(res:any)=>{
          this.SupplierCode=res.data;
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

  backToList(){
    this.dataSaved.emit(0);
  }

}
// export interface itemGroupList{
//   name:string;
// }
export interface itemModelNameList{
  name:string;
}
export interface supplierList{
  name:string;
}
export interface itemCategoryList{
  name:string;
}
export interface uomList{
  name:string;
}

export interface ItemClassDetails{
  id:number
  itemGroup:string;
  itemHsn:string;
  itemModelName:string;
  itemDescription:string;
  supplier:string;
  itemCategory:string;
  warrantyMonth:number;
  remarks:string;
  uom:string;
}
