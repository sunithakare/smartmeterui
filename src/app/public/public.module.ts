import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import {  HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { PublicRoutingModule } from './public-routing.module';
import { PubicComponent } from './pubic.component';
import { LoginComponent } from './login/login.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RegisterationStatusComponent } from './register/registeration-status/registeration-status.component';
import { ShowReferenceIdDialogComponent } from './register/viewformbeforesubmit/showreferenceiddialog/show-reference-id-dialog.component';
import { ViewFormBeforeSubmitComponent } from './register/viewformbeforesubmit/view-form-before-submit.component';
import { RegisterHeaderComponent } from './register/register-header/register-header.component';

import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    HomeComponent,
    PubicComponent,
    LoginComponent,
    RegisterComponent,
    ViewFormBeforeSubmitComponent,
    ShowReferenceIdDialogComponent,
    RegisterationStatusComponent,
    RegisterHeaderComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
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
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDialogModule,
    NgApexchartsModule
  ],
  exports: [
    HomeComponent
  ],
  bootstrap: [PubicComponent]
})
export class PublicModule { }
