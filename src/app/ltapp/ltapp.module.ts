
import { LtappRoutingModule } from './ltapp-routing.module';
import { LtappComponent } from './ltapp.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SlaReportsComponent } from './slareports/sla-reports.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleCreationComponent } from './admin/rolecreation/role-creation.component';
import { RoleDetailsComponent } from './admin/rolecreation/roledetails/role-details.component';
import { UserCreationComponent } from './admin/usercreation/user-creation.component';
import { UserDetailsComponent } from './admin/usercreation/userdetails/user-details.component';
import { ApproverCreationComponent } from './admin/approvercreation/approver-creation.component';
import { ReportUploadComponent } from './admin/reportupload/report-upload.component';
import { ApproverDetailsComponent } from './admin/approvercreation/approverdetails/approverdetails.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatDialogModule} from '@angular/material/dialog';
import { ApprovalDialogComponent } from '../shared/component/approval-dialog/approval-dialog.component';
@NgModule({
  declarations: [
    LtappComponent,
    SlaReportsComponent,
    DashboardComponent,
    RoleCreationComponent,
    RoleDetailsComponent,
    UserCreationComponent,
    UserDetailsComponent,
    ApproverCreationComponent,
    ReportUploadComponent,
    ApproverDetailsComponent,
    ApprovalDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN'}),
    FlexLayoutModule,
    LtappRoutingModule,
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
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatStepperModule,
    NgApexchartsModule,
    MatDialogModule,
    MatMenuModule
  ],
  exports: [
  ],
  bootstrap: []
})

export class LtappModule { }
