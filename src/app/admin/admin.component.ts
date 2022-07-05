import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  topMenuList:menuItems[];
  sideMenuList:menuItems[]=[
  {label:"SLA DashBoard",isParent:true,islastChild:false,pageLink:"",child:[
                                                                              {label:"All SLA Link",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                              {label:"HES",isParent:false,islastChild:true,pageLink:"slareports/HES",child:[]},
                                                                              {label:"MDM-A",isParent:false,islastChild:true,pageLink:"slareports/MDM-A",child:[]},
                                                                              {label:"MDM-B",isParent:false,islastChild:true,pageLink:"slareports/MDM-B",child:[]},
                                                                              {label:"CSP",isParent:false,islastChild:true,pageLink:"slareports/CSP",child:[]},
                                                                              {label:"INVENTORY",isParent:false,islastChild:true,pageLink:"slareports/Inventory",child:[]},
                                                                              {label:"HELPDESK",isParent:false,islastChild:true,pageLink:"slareports/Helpdesk",child:[]},
                                                                              {label:"PROJECTS-A",isParent:false,islastChild:true,pageLink:"slareports/Project-A",child:[]},
                                                                              {label:"PROJECTS-B",isParent:false,islastChild:true,pageLink:"slareports/Project-B",child:[]},
                                                                              {label:"TSP",isParent:false,islastChild:true,pageLink:"slareports/TSP",child:[]},
                                                                            ]
  },
  {label:"Operational Analytics",isParent:true,islastChild:false,pageLink:"",child:[
                                                                                    {label:"Operational Analytics Reports",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                                    {label:"Critical Dashboard Reports",isParent:false,islastChild:true,pageLink:"slareports",child:[]},

                                                                                  ]
  },
  {label:"Monitoring Dashboard",isParent:true,islastChild:false,pageLink:"",child:[]
  },
  {label:"WFM",isParent:true,islastChild:false,pageLink:"",child:[
                                                                  {label:"CIMI",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"NSC",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"SM2SM",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"O&M",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  ]
  },
  {label:"Inventory",isParent:true,islastChild:false,pageLink:"",child:[]
  },
  {label:"User Authorization",isParent:true,islastChild:false,pageLink:"",child:[]
  },
  {label:"CONFIG",isParent:true,islastChild:false,pageLink:"",child:[
                                                                  {label:"ROLE CATEGORY",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"ROLE",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"SYSTEM ROLE CREATION",isParent:false,islastChild:true,pageLink:"../admin/dashboard",child:[]},
                                                                  {label:"USER CREATION",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"SYSTEM USER CREATION",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"RFP18",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"RFP19",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  {label:"RFP21",isParent:false,islastChild:true,pageLink:"slareports",child:[]},
                                                                  ]
  },
]

  ngOnInit(): void {
  }

  changeHeader(menu:menuItems){
    menu.child.forEach(element => {
console.log(element.label);
});
this.topMenuList=menu.child;
  }


}
export interface menuItems{
  label:String;
  isParent:boolean;
  islastChild:boolean;
  pageLink:String;
  child:menuItems[];
}
