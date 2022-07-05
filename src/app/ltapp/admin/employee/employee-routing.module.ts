import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericAuthGuardService } from 'src/app/services/authguard.service';
import { EmployeeCreationComponent } from './employee-creation/employee-creation.component';
import { EmployeeRoleComponent } from './employee-role/employee-role.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
              { path: 'employeerole', component: EmployeeRoleComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'EMPLOYEE_ROLE'}},
              { path: 'employeecreation', component: EmployeeCreationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'EMPLOYEE_CREATION'}},
               { path: '', redirectTo: '/ltapp/dashboard', pathMatch: 'full' }
              ],

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
