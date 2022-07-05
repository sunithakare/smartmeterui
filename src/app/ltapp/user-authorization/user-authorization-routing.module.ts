import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericAuthGuardService } from 'src/app/services/authguard.service';
import { MyApprovalBucketComponent } from './my-approval-bucket/my-approval-bucket.component';
import { UserAuthorizationComponent } from './user-authorization.component';
import { ViewCompletedApplicationComponent } from './view-completed-application/view-completed-application.component';


const routes: Routes = [
  {
    path: '',
    component: UserAuthorizationComponent,
    children: [
               { path: 'uamUsers', component: ViewCompletedApplicationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'UAMVIEW'}},
               { path: 'myapprovals', component: MyApprovalBucketComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'UAMAPPROVAL'}},

               { path: '', redirectTo: '/ltapp/dashboard', pathMatch: 'full' }
              ],

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthorizationRoutingModule { }
