import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerIndexRoutingModule } from './customer-index-routing.module';
import { CustomerIndexComponent } from './customer-index.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CiAgencyListComponent } from './ci-agency-list/ci-agency-list.component';
import { CiAgencyDetailsComponent } from './ci-agency-list/ci-agency-details/ci-agency-details.component';
import { CiAgencyAllotmentListComponent } from './ci-agency-allotment-list/ci-agency-allotment-list.component';
import { CiAgencyAllotmentDetailsComponent } from './ci-agency-allotment-list/ci-agency-allotment-details/ci-agency-allotment-details.component';
import { CiFieldUserListComponent } from './ci-field-user-list/ci-field-user-list.component';
import { CiFieldUserDetailsComponent } from './ci-field-user-list/ci-field-user-details/ci-field-user-details.component';
import { CiFieldUserAllotmentComponent } from './ci-field-user-allotment/ci-field-user-allotment.component';
import { CiFieldUserAllotmentDetailsComponent } from './ci-field-user-allotment/ci-field-user-allotment-details/ci-field-user-allotment-details.component';
import { SupervisorAllotmentListComponent } from './supervisor-allotment-list/supervisor-allotment-list.component';
import { SupervisorAllotmentDetailsComponent } from './supervisor-allotment-list/supervisor-allotment-details/supervisor-allotment-details.component';


@NgModule({
  declarations: [
    CustomerIndexComponent,
    CiAgencyListComponent,
    CiAgencyDetailsComponent,
    CiAgencyAllotmentListComponent,
    CiAgencyAllotmentDetailsComponent,
    CiFieldUserListComponent,
    CiFieldUserDetailsComponent,
    CiFieldUserAllotmentComponent,
    CiFieldUserAllotmentDetailsComponent,
    SupervisorAllotmentListComponent,
    SupervisorAllotmentDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    CustomerIndexRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN'}),
    FlexLayoutModule,
    // material imports
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDialogModule
  ]
})
export class CustomerIndexModule { }
