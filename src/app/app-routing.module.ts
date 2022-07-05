import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFormBeforeSubmitComponent } from './public/register/viewformbeforesubmit/view-form-before-submit.component';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'testhome', component: CommonComponent },
  // { path: 'testhome', component: ViewFormBeforeSubmitComponent },

  { path: 'public',  loadChildren: () => import('./public/public.module').then(m => m.PublicModule)  },
  { path: 'ltapp',  loadChildren: () => import('./ltapp/ltapp.module').then(m => m.LtappModule)  },
  // { path: 'admin',  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)  },
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: '**', redirectTo: '/public', pathMatch: 'full' }
];

@NgModule({
//   imports: [RouterModule.forRoot(routes,{
//     initialNavigation: 'disabled'
//  })],
imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
