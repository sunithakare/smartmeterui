import { ReturnToSupplierComponent } from './aims/return-to-supplier/return-to-supplier.component';
import { SupervisorAllotmentListComponent } from './customer-index/supervisor-allotment-list/supervisor-allotment-list.component';
import { Component, OnInit } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-ltapp',
  templateUrl: './ltapp.component.html',
  styleUrls: ['./ltapp.component.css']
})
export class LtappComponent implements OnInit {

  constructor(private router: Router,
    private authservice: AuthService) { }

today:Date=new Date();
  userName:string='';
  topMenuList:menuItems[];
//   sideMenuList:menuItems[]=[
//   {label:"SLA DashBoard",icon:"assignment",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
//                                                                               {label:"All SLA Link",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports",role:"ANY",permission:["All SLA Link"],child:[]},
//                                                                               {label:"HES",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/HES",role:"ANY",permission:["HES"],child:[]},
//                                                                               {label:"MDM-A",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/MDM-A",role:"ANY",permission:["MDM-A"],child:[]},
//                                                                               {label:"MDM-B",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/MDM-B",role:"ANY",permission:["MDM-B"],child:[]},
//                                                                               {label:"CSP",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/CSP",role:"ANY",permission:["CSP"],child:[]},
//                                                                               {label:"INVENTORY",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/INVENTORY",role:"ANY",permission:["INVENTORY"],child:[]},
//                                                                               {label:"HELPDESK",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/HELPDESK",role:"ANY",permission:["HELPDESK"],child:[]},
//                                                                               {label:"PROJECTS-A",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/PROJECT-A",role:"ANY",permission:["PROJECT-A"],child:[]},
//                                                                               {label:"PROJECTS-B",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/PROJECT-B",role:"ANY",permission:["PROJECT-B"],child:[]},
//                                                                               {label:"TSP",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/TSP",role:"ANY",permission:["TSP"],child:[]},
//                                                                             ]
//   },
//   {label:"Operational Analytics",icon:"timeline",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
//                                                                                     {label:"Operational Analytics Reports",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                                     {label:"Critical Dashboard Reports",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},

//                                                                                   ]
//   },
//   {label:"Monitoring Dashboard",icon:"visibility",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[]
//   },
//   {label:"WFM",icon:"work",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
//                                                                   {label:"CIMI",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   {label:"NSC",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   {label:"SM2SM",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   {label:"O&M",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   ]
//   },
//   {label:"Inventory",icon:"shopping_cart",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[]
//   },
//   {label:"User Authorization",icon:"supervisor_account",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[]
//   },
//   {label:"CONFIG",icon:"settings",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
//                                                                   {label:"ROLE CATEGORY",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   {label:"ROLE",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   {label:"SYSTEM ROLE CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"rolecreation",role:"ANY",permission:["SRC"],child:[]},
//                                                                   {label:"USER CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   {label:"SYSTEM USER CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"usercreation",role:"ANY",permission:["SUC"],child:[]},
//                                                                   {label:"REPORT UPLOAD",icon:"all_out",isParent:false,islastChild:true,pageLink:"reportupload",role:"ANY",permission:["RFP 18/19 UPLOAD"],child:[]},
//                                                                   {label:"APPROVER CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"approvercreation",role:"ANY",permission:["APPUC"],child:[]},
//                                                                   // {label:"RFP19",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   // {label:"RFP21",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
//                                                                   ]
//   },
// ]


// with childs
sideMenuList:menuItems[]=[
  {label:"SLA DashBoard",icon:"assignment",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                              {label:"All SLA Link",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports",role:"ANY",permission:["All SLA Link"],child:[]},
                                                                              {label:"HES",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/HES",role:"ANY",permission:["HES"],child:[]},
                                                                              {label:"MDM",icon:"all_out",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["MDM-A","MDM-B"],child:[

                                                                                {label:"MDM-A",icon:"all_out",isParent:false,islastChild:false,pageLink:"slareports/MDM-A",role:"ANY",permission:["MDM-A"],child:[]},
                                                                                {label:"MDM-B",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/MDM-B",role:"ANY",permission:["MDM-B"],child:[]},

                                                                              ]},
                                                                              {label:"CSP",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/CSP",role:"ANY",permission:["CSP"],child:[]},
                                                                              {label:"INVENTORY",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/INVENTORY",role:"ANY",permission:["INVENTORY"],child:[]},
                                                                              {label:"HELPDESK",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/HELPDESK",role:"ANY",permission:["HELPDESK"],child:[]},
                                                                              {label:"PROJECTS",icon:"all_out",isParent:true,islastChild:false,pageLink:"slareports/PROJECT-A",role:"ANY",permission:["PROJECT-A","PROJECT-B"],child:[

                                                                                {label:"PROJECTS-A",icon:"all_out",isParent:false,islastChild:false,pageLink:"slareports/PROJECT-A",role:"ANY",permission:["PROJECT-A"],child:[]},
                                                                                {label:"PROJECTS-B",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/PROJECT-B",role:"ANY",permission:["PROJECT-B"],child:[]},
                                                                              ]},
                                                                              {label:"TSP",icon:"all_out",isParent:false,islastChild:true,pageLink:"slareports/TSP",role:"ANY",permission:["TSP"],child:[]},
                                                                            ]
  },
  {label:"Operational Analytics",icon:"timeline",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                                    {label:"Operational Analytics Reports",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                                    {label:"Critical Dashboard Reports",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},

                                                                                  ]
  },
  {label:"Monitoring Dashboard",icon:"visibility",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[]
  },
  {label:"WFM",icon:"work",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                  {label:"CIMI",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"NSC",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"SM2SM",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"O&M",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  ]
  },
  {label:"AIMS",icon:"shopping_cart",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                  {label:"Transactional",icon:"all_out",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[

                                                                    {label:"Indent Request",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/indentrequestlist",role:"ANY",permission:["ANY"],child:[]},
                                                                    {label:"Indent Approver",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/indentApprover",role:"ANY",permission:["ANY"],child:[]},
                                                                    {label:"Outward To Subcontractor",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/outwardImportList",role:"ANY",permission:["ANY"],child:[]},
                                                                    {label:"Inward From Supplier",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/inwardImport",role:"ANY",permission:["ANY"],child:[]},
                                                                    {label:"WH To WH Inward",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/whtowhinwardimportList",role:"ANY",permission:["ANY"],child:[]},
                                                                   {label:"WH To WH Outward",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/whtowhoutwardList",role:"ANY",permission:["ANY"],child:[]},
                                                                   // {label:"Old Meter Inward",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/oldMeterInward",role:"ANY",permission:["ANY"],child:[]},
                                                                   //{label:"Old Meter Outward",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/oldMeterOutward",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Sim Activation/Deactivation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/simActivationDeactivation",role:"ANY",permission:["ANY"],child:[]},



                                                                   {label:"Return From Subcontractor",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/returnFromSubcontractorList",role:"ANY",permission:["ANY"],child:[]},

                                                                   {label:"Return To Supplier",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/returnToSupplier",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Indent Wise Outward Import",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/indentWiseOutwardImport",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Import Mi Data",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/importmidata",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Import Hes Data",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/importhesdata",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Import CCnB Data",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/importccnbdata",role:"ANY",permission:["ANY"],child:[]},



                                                                ]},
                                                                  {label:"Masters",icon:"all_out",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                  // {label:"Discom Creation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/discom",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"Item Group",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/itemgroupList",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"Item Category",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/itemCategoryList",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"Supplier",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/masterSupplier",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"Item Module Name",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/item",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"Warehouse Creation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/warehouseCreation",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Add User",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/addingUser",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"User Error Message",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/userErrorMessage",role:"ANY",permission:["ANY"],child:[]},

                                                                  // {label:"Subcontractor MApping",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/subcontractormapping",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"CI Master",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/cimaster",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"City Warehouse Mapping",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/citywarehousemapping",role:"ANY",permission:["ANY"],child:[]},


                                                                  // {label:"DivisionCreation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/divisioncreationList",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"SubDivision",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/subdivisionList",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Substation Creation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/substationcreationList",role:"ANY",permission:["ANY"],child:[]},

                                                                  // {label:"Item Type",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/itemtypeList",role:"ANY",permission:["ANY"],child:[]},

                                                                  // {label:"Feeder Creation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/feedercreation",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"DTR Creation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/dtrcreation",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Supplier SubContractor",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/suppliersubcontractor",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"Item Make",icon:"all_out",isParent:false,islastChild:true,pageLink:"/aims/itemmake",role:"ANY",permission:["ANY"],child:[]},



                                                                ]},
                                                            ]
  },
  {label:"Customer Indexing",icon:"supervisor_account",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                              {label:"Agency",icon:"all_out",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[

                                                                {label:"View Agency",icon:"all_out",isParent:false,islastChild:true,pageLink:"/customerindex/ciagencydata",role:"ANY",permission:["ANY"],child:[]},
                                                                {label:"Agency Allotment",icon:"all_out",isParent:false,islastChild:true,pageLink:"/customerindex/ciagencyallotment",role:"ANY",permission:["ANY"],child:[]},
                                                              ]},
                                                              {label:"Field User",icon:"all_out",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[

                                                                {label:"Field User Creation",icon:"all_out",isParent:false,islastChild:true,pageLink:"/customerindex/cifielduser",role:"ANY",permission:["ANY"],child:[]},
                                                                {label:"Field User Allotment",icon:"all_out",isParent:false,islastChild:true,pageLink:"/customerindex/cifielduserallotment",role:"ANY",permission:["ANY"],child:[]},

                                                              ]},
                                                              {label:"Supervisor",icon:"all_out",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[

                                                                {label:"Supervisor Allotment",icon:"all_out",isParent:false,islastChild:true,pageLink:"/customerindex/supervisorallotmentlist",role:"ANY",permission:["ANY"],child:[]},
                                                              ]},

                                                                  ]
  },
  {label:"User Authorization",icon:"supervisor_account",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                {label:"View All Applications",icon:"all_out",isParent:false,islastChild:true,pageLink:"/uam/uamUsers",role:"ANY",permission:["UAMVIEW"],child:[]},
                                                                {label:"My Approval Bucket",icon:"all_out",isParent:false,islastChild:true,pageLink:"/uam/myapprovals",role:"ANY",permission:["UAMAPPROVAL"],child:[]},


                                                                  ]
  },
  {label:"CONFIG",icon:"settings",isParent:true,islastChild:false,pageLink:"",role:"ANY",permission:["ANY"],child:[
                                                                  // {label:"ROLE CATEGORY",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"ROLE",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"SYSTEM ROLE CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"rolecreation",role:"ANY",permission:["SRC"],child:[]},
                                                                  // {label:"USER CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  {label:"SYSTEM USER CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"usercreation",role:"ANY",permission:["SUC"],child:[]},
                                                                  {label:"REPORT UPLOAD",icon:"all_out",isParent:false,islastChild:true,pageLink:"reportupload",role:"ANY",permission:["RFP 18/19 UPLOAD"],child:[]},
                                                                  {label:"APPROVER CREATION",icon:"all_out",isParent:false,islastChild:true,pageLink:"approvercreation",role:"ANY",permission:["APPUC"],child:[]},
                                                                  // {label:"RFP19",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  // {label:"RFP21",icon:"all_out",isParent:false,islastChild:true,pageLink:"dashboard",role:"ANY",permission:["ANY"],child:[]},
                                                                  ]
  },
]


  ngOnInit(): void {
    if (!this.authservice.isAuthenticated()) {
      this.router.navigate(['/home'])
      .then(value => {
        // window.location.reload();
    })
    }else{
      this.userName=this.authservice.getUserName();
    }
  }

  checkPermission(roleType:string,permissionList:string[]):boolean{
    for (var permission of permissionList) {
      return this.authservice.checkPermission(roleType,permission);
    }
    // permissionList.forEach(permission => {
    //   console.log(permission);
    //   console.log(this.authservice.checkPermission(roleType,permission));
    //   return this.authservice.checkPermission(roleType,permission);
    // });
    return false;

  }


  changeHeader(menu:menuItems){

    this.topMenuList=menu.child;
  }
  logout():void{
    // call api to logout user
    this.authservice.logout(this.router);


  }

}
export interface menuItems{
  label:string;
  isParent:boolean;
  icon:string;
  islastChild:boolean;
  pageLink:string;
  role:string;
  permission:string[];
  child:menuItems[];
}
