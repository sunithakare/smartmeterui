import { SupervisorAllotmentListComponent } from './supervisor-allotment-list/supervisor-allotment-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericAuthGuardService } from 'src/app/services/authguard.service';
import { CiAgencyAllotmentDetailsComponent } from './ci-agency-allotment-list/ci-agency-allotment-details/ci-agency-allotment-details.component';
import { CiAgencyAllotmentListComponent } from './ci-agency-allotment-list/ci-agency-allotment-list.component';
import { CiAgencyDetailsComponent } from './ci-agency-list/ci-agency-details/ci-agency-details.component';
import { CiAgencyListComponent } from './ci-agency-list/ci-agency-list.component';
import { CiFieldUserAllotmentComponent } from './ci-field-user-allotment/ci-field-user-allotment.component';
import { CiFieldUserListComponent } from './ci-field-user-list/ci-field-user-list.component';
import { CustomerIndexComponent } from './customer-index.component';

const routes: Routes = [ {
  path: '',
  component: CustomerIndexComponent,
  children: [
             { path: 'ciagencydata', component: CiAgencyListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'ciagencyallotment', component: CiAgencyAllotmentListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'cifielduser', component: CiFieldUserListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'cifielduserallotment', component: CiFieldUserAllotmentComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
            //  { path: 'myapprovals', component: MyApprovalBucketComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'UAMAPPROVAL'}},
              {path: 'supervisorallotmentlist', component: SupervisorAllotmentListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: '', redirectTo: '/ltapp/dashboard', pathMatch: 'full' }
            ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerIndexRoutingModule { }
