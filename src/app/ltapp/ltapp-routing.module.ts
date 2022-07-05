import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericAuthGuardService, SLAAuthGuardService } from '../services/authguard.service';
import { ApproverCreationComponent } from './admin/approvercreation/approver-creation.component';
import { ApproverDetailsComponent } from './admin/approvercreation/approverdetails/approverdetails.component';
import { ReportUploadComponent } from './admin/reportupload/report-upload.component';
import { RoleCreationComponent } from './admin/rolecreation/role-creation.component';
import { UserCreationComponent } from './admin/usercreation/user-creation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LtappComponent } from './ltapp.component';
import { SlaReportsComponent } from './slareports/sla-reports.component';

const routes: Routes = [
  {
    path: '',
    component: LtappComponent,
    children: [{ path: 'slareports/:module', component: SlaReportsComponent ,canActivate: [SLAAuthGuardService]},
               { path: 'slareports', component: SlaReportsComponent ,canActivate: [SLAAuthGuardService] },
               { path: 'dashboard', component: DashboardComponent },
               { path: 'rolecreation', component: RoleCreationComponent,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'SRC'} },
               { path: 'usercreation', component: UserCreationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'SUC'}},
               { path: 'reportupload', component: ReportUploadComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'RFP 18/19 UPLOAD'}},
              //  { path: 'approvercreation', component: ApproverCreationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'APPUC'}},
              //  { path: 'approverdetails', component: ApproverDetailsComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'APPUC'}},
              //  { path: 'uamUsers', component: ListAllApplicationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'APPUC'}},

               { path: 'uam',  loadChildren: () => import('./user-authorization/user-authorization.module').then(m => m.UserAuthorizationModule)  },
               { path: 'customerindex',  loadChildren: () => import('./customer-index/customer-index.module').then(m => m.CustomerIndexModule)  },
               { path: 'aims',  loadChildren: () => import('./aims/aims.module').then(m => m.AimsModule)  },

               { path: '', redirectTo: '/ltapp/dashboard', pathMatch: 'full' }
              ],

  },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'testhome', component: CommonComponent },
  // { path: 'report', component: ReportTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule],
})
export class LtappRoutingModule {}
