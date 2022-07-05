import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { APIResponse, HttpclientService } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';
import { ItemCategory } from '../item-category-list.component';

@Component({
  selector: 'app-item-category-details',
  templateUrl: './item-category-details.component.html',
  styleUrls: ['./item-category-details.component.css']
})
export class ItemCategoryDetailsComponent implements OnInit {
  @Input()
  isNavigation: boolean=false;
  @Input()
  isEditable: boolean = false;
  @Output()
  dataSaved: EventEmitter<number> = new EventEmitter();
  @Input()
  itemCategoryDetails: ItemCategory;
  spinner: boolean = false;

  storeCode:any;

  itemcategoryform: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.itemcategoryform = new FormGroup({
      itemCategory: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      itemGroup:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      remark: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      status: new FormControl(false,[Validators.required]),
    })
    this.getItemGroup();

  }

  ngOnChanges(){
    if(this.itemCategoryDetails==null || this.itemCategoryDetails==undefined){
      this.itemcategoryform = new FormGroup({
        itemGroup:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        itemCategory: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        remark: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
        status: new FormControl('',[Validators.required]),
      });
    }else{
      this.itemcategoryform = new FormGroup({
        id: new FormControl(this.itemCategoryDetails.id),
        itemGroup: new FormControl(this.itemCategoryDetails.itemGroup,[Validators.required]),
        itemCategory: new FormControl(this.itemCategoryDetails.itemCategory,[Validators.required]),
        remark: new FormControl(this.itemCategoryDetails.remark,[Validators.required]),
        status: new FormControl(this.itemCategoryDetails.status,[Validators.required]),
      });
    }

    this.itemcategoryform.controls['itemCategory'].valueChanges.subscribe(value => {
      this.itemcategoryform.controls['itemCategory'].patchValue(this.itemcategoryform.controls['itemCategory'].value.toUpperCase(), {emitEvent: false});
    });

  }

  saveItemTypeData(){
    if(!this.itemcategoryform.valid){
      return;
    }
    this.spinner = true;
    var queryParams: any = {};
    let apiURL='';
    if(this.isNavigation){
      apiURL=environment.INVENTORY_MASTERS_ITEM_CATEGORY_UPDATE_DATA;

    }else{
      apiURL=environment.INVENTORY_MASTERS_ITEM_CATEGORY_SAVE_DATA;
    }

    this.restClient.post(apiURL, this.itemcategoryform.getRawValue()).subscribe({
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

    backToList(){
      this.dataSaved.emit(0);
    }

    getItemGroup(){
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

}
