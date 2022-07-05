import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { HttpclientService, PageableResponse ,APIResponse } from 'src/app/services/httpclient.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-ci-field-user-list',
  templateUrl: './ci-field-user-list.component.html',
  styleUrls: ['./ci-field-user-list.component.css']
})
export class CiFieldUserListComponent implements OnInit {

  selectedIndex = 0;
  spinner = false;
  isLoading = false;
  isDetailsEditable: boolean = false;
  isNavigation: boolean = false;
  isEditable:boolean=false;
  totalRows = 0;
  pageSize = 15;
  currentPage = 0;
  pageSizeOptions: number[] = [15, 20, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filtered=false;

 
  displayedColumns: string[] = ['agencyName','fieldUserCode', 'fieldUserName',  'mobile','status'];
  // dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>();

  

  fieldUserNameSearch:string='';
  fieldUserCodeSearch:string='';
  agencyName :string='';
  mobileSearch : string='';
  statusSearch : string='';
  //statusList:statusList[]=[];
  
  UserDetailsResponse : UserDetail ={
    agencyName: '',
    fieldUserCode:'',
    mobile : '',
    userId: '',
    status : '',
    userFirstName : '',
    userLastName : '',
    email : '',
    password : '',
    idProof : '',
    fileId : '',

  };


  constructor(
    private snackBar: MatSnackBar,
    private restClient: HttpclientService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.isDetailsEditable=true;
    // this.getStatus();
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex;
    if (this.filtered) {
      this.fetchFilteredData();
    } else {
      this.loadData();
    }
  }

  

  searchWithFilter() {
    this.currentPage = 0;
    this.fetchFilteredData();
  }



  



  fetchFilteredData():void{

    this.isLoading = true;
    this.filtered = true;

    var queryParams: any = {};
    queryParams['page'] = this.currentPage;
    queryParams['size'] = this.pageSize;
    queryParams['fieldUserName'] = this.fieldUserNameSearch;
    queryParams['fieldUserCode'] = this.fieldUserCodeSearch;
    queryParams['agencyName'] = this.agencyName;
    queryParams['mobile'] = this.mobileSearch;
    queryParams['status'] =this.statusSearch;
   

    this.restClient
      .getwithParam(environment.FETCH_BY_FIELD_USER_NAME,
        queryParams
      )
      .subscribe({
        next: (result: PageableResponse) => {
          var content: RoleList[] = result.data.content as RoleList[];

          this.dataSource.data = content;
          this.totalRows = result.data.totalElements;
          if (content.length == 0) {
            let snackBarRef = this.snackBar.open(
              'No Data Found For the Filter',
              'close',
              {
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                duration: 3000,
              }
            );
          }
        },
        error: (err: any) => {
          console.log(err);
          this.isLoading = false;
        },
        complete: () => {
          console.log('complete');
          this.isLoading = false;
        },
      });
  

  }




  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


 // loadData():void{
//this.dataSource.data=[]
 // }



 

 loadData() {
  this.isLoading = true;
  this.filtered = false;
  var queryParams: any = {};
  queryParams['page'] = this.currentPage;
  queryParams['size'] = this.pageSize;

  this.restClient
    .getwithParam(environment.FETCH_FIELD_USER_DATA,
     queryParams)
    .subscribe({
      next: (result: PageableResponse) => {



        var content: FieldUserCreationData[] = result.data.content as FieldUserCreationData[];

        this.dataSource.data = content;
        this.totalRows = result.data.totalElements;
      },
      error: (err: any) => {
        console.log(err);
        let snackBarRef = this.snackBar.open('Server Error', 'close', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
        });
        this.isLoading = false;
      },
      complete: () => {
        console.log('FieldUserCreationData List Fetch Complete ');
        this.isLoading = false;
      },
    });
}


  showDetails(row: any) {
    this.spinner=true;

    var queryParams: any = {};
    //queryParams['agencyName']= row.agencyName;
    queryParams['fieldUserCode'] = row.fieldUserCode;

    this.restClient.getwithParam(
      environment.USER_CREATION_DETAILS,
      queryParams
    )
    .subscribe({
      next: (results: APIResponse) =>{
        let userData = results.data as UserCreationDetailsResponse;
      this.UserDetailsResponse={
        agencyName : userData.agencyName,
	      fieldUserCode : userData.fieldUserCode,
	      mobile : userData.mobile,
	      userId : userData.userId,
        status : userData.status,
	      userFirstName : userData.userFirstName,
	      userLastName : userData.userLastName,
	      email : userData.email,
        password : userData.password,
	      idProof : userData.idProof,
	      fileId : userData.fileId,
      };
      this.isNavigation =true;
      this.selectedIndex = 1;
    },
    error: (err: any) => {
      console.log(err);
      let snackBarRef = this.snackBar.open('Server Error', 'close', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000,
   });
   this.spinner =false ;
  },
  complete: () => {
    console.log('User Creation Fetch Complete ');
    this.spinner = false;
  },
});
  }

  addNewAgency(){
    this.UserDetailsResponse = {
      

      agencyName: '',
      fieldUserCode:'',
      mobile : '',
      userId: '',
      status : '',
      userFirstName : '',
      userLastName : '',
      email : '',
      password : '',
      idProof : '',
      fileId : '',
    };
    

    this.isNavigation = false;
    this.selectedIndex = 1;
  }
  loadListTab() {
    this.selectedIndex = 0;
    this.loadData();
  }
}
export interface FieldUserCreationData{
  agencyName : string;
  fieldUserCode : string;
  fieldUserName : string;
  mobile :string;
  status : string;
}
export interface UserDetail{
  agencyName: string;
  fieldUserCode:string;
  mobile :string;
  userId:string;
  status : string;
  userFirstName : string;
  userLastName : string;
  email : string;
  password : string;
  idProof : string;
  fileId : string;
}


export interface UserCreationDetailsResponse{

   agencyName: string;
	 fieldUserCode:string;
	 mobile :string;
	 userId:string;
	 status : string;
	 userFirstName : string;
	 userLastName : string;
	 email : string;
	 password : string;
	 idProof : string;
	 fileId : string;
}

export interface RoleList {
  fieldUserName?: string;
  fieldUserCode? :string;
  agencyName? : string;
  mobile? :string;
  status? : string;
 
}
// export interface statusList{
//   status? : string;
// }
