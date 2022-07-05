import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PubicComponent } from './pubic.component';
import { RegisterComponent } from './register/register.component';
import { RegisterationStatusComponent } from './register/registeration-status/registeration-status.component';
import { ViewFormBeforeSubmitComponent } from './register/viewformbeforesubmit/view-form-before-submit.component';

// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile.component';
// import { CommonComponent } from './common/common.component';
// import { ReportTableComponent } from './report-table/report-table.component';

const routes: Routes = [
  { path: '', component: PubicComponent ,
          children:[
            { path: 'view', component: ViewFormBeforeSubmitComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'viewUAMForm', component: ViewFormBeforeSubmitComponent },
            { path: 'viewUAMStatus/:uuid', component: RegisterationStatusComponent },
            { path: '', component: HomeComponent  }
        ]},
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'testhome', component: CommonComponent },
  // { path: 'report', component: ReportTableComponent },

];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
