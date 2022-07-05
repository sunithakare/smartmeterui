import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AimsRoutingModule } from './aims-routing.module';
import { AimsComponent } from './aims.component';

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
import { InwardImportComponent } from './inward-import/inward-import.component';
import { InwardImportDetailsComponent } from './inward-import/inward-import-details/inward-import-details.component';
import { OldMeterInwardComponent } from './old-meter-inward/old-meter-inward.component';
import { OldMeterInwardDetailsComponent } from './old-meter-inward/old-meter-inward-details/old-meter-inward-details.component';
import { OldMeterOutwardComponent } from './old-meter-outward/old-meter-outward.component';
import { OldMeterOutwardDetailsComponent } from './old-meter-outward/old-meter-outward-details/old-meter-outward-details.component';
import { SimActivationDeactivationComponent } from './sim-activation-deactivation/sim-activation-deactivation.component';
import { SimActivationDeactivationDetailsComponent } from './sim-activation-deactivation/sim-activation-deactivation-details/sim-activation-deactivation-details.component';
import { OutwardImportDetailsComponent } from './outward-import-list/outward-import-details/outward-import-details.component';
import { OutwardImportListComponent } from './outward-import-list/outward-import-list.component';
import { ReturnFromSubcontractorDetailsComponent } from './return-from-subcontractor-list/return-from-subcontractor-details/return-from-subcontractor-details.component';
import { ReturnFromSubcontractorListComponent } from './return-from-subcontractor-list/return-from-subcontractor-list.component';
import { WhToWhInwardDetailsComponent } from './wh-to-wh-inward-list/wh-to-wh-inward-details/wh-to-wh-inward-details.component';
import { WhToWhInwardListComponent } from './wh-to-wh-inward-list/wh-to-wh-inward-list.component';
import { WhToWhOutwardDetailsComponent } from './wh-to-wh-outward-list/wh-to-wh-outward-details/wh-to-wh-outward-details.component';
import { WhToWhOutwardListComponent } from './wh-to-wh-outward-list/wh-to-wh-outward-list.component';
import { ImportCcnbDataComponent } from './import-ccnb-data/import-ccnb-data.component';
import { ImportCcnbDataDetailsComponent } from './import-ccnb-data/import-ccnb-data-details/import-ccnb-data-details.component';
import { ImportHesDataComponent } from './import-hes-data/import-hes-data.component';
import { ImportHesDataDetailsComponent } from './import-hes-data/import-hes-data-details/import-hes-data-details.component';
import { ImportMiDataComponent } from './import-mi-data/import-mi-data.component';
import { ImportMiDataDetailsComponent } from './import-mi-data/import-mi-data-details/import-mi-data-details.component';
import { IndentWiseOutwardImportComponent } from './indent-wise-outward-import/indent-wise-outward-import.component';
import { IndentWiseOutwardImportDetailsComponent } from './indent-wise-outward-import/indent-wise-outward-import-details/indent-wise-outward-import-details.component';
import { MiDataUpdateComponent } from './mi-data-update/mi-data-update.component';
import { MiDataUpdateDetailsComponent } from './mi-data-update/mi-data-update-details/mi-data-update-details.component';
import { ReturnToSupplierComponent } from './return-to-supplier/return-to-supplier.component';
import { ReturnToSupplierDetaislComponent } from './return-to-supplier/return-to-supplier-details/return-to-supplier-detaisl.component';

import { DisplaySerialNoListComponent } from './display-serial-no-list/display-serial-no-list.component';
import { MastersSupplierListComponent } from './masters/masters-supplier-list/masters-supplier-list.component';
import { MastersSupplierDetailsComponent } from './masters/masters-supplier-list/masters-supplier-details/masters-supplier-details.component';
import { ItemComponent } from './masters/item/item.component';
import { ItemDetailsComponent } from './masters/item/item-details/item-details.component';
import { ItemGroupDetailsComponent } from './masters/item-group-list/item-group-details/item-group-details.component';
import { ItemGroupListComponent } from './masters/item-group-list/item-group-list.component';
import { WarehouseCreationComponent } from './masters/warehouse-creation/warehouse-creation.component';
import { WarehouseCreationDetailsComponent } from './masters/warehouse-creation/warehouse-creation-details/warehouse-creation-details.component';
import { ItemCategoryDetailsComponent } from './masters/item-category-list/item-category-details/item-category-details.component';
import { ItemCategoryListComponent } from './masters/item-category-list/item-category-list.component';
import { IndentRequestDetailsComponent } from './indent-request-list/indent-request-details/indent-request-details.component';
import { IndentRequestListComponent } from './indent-request-list/indent-request-list.component';
import { IndentApproverComponent } from './indent-approver/indent-approver.component';
import { IndentApproverDetailsComponent } from './indent-approver/indent-approver-details/indent-approver-details.component';
@NgModule({
  declarations: [

    AimsComponent,
        InwardImportComponent,
        InwardImportDetailsComponent,
        OldMeterInwardComponent,
        OldMeterInwardDetailsComponent,
        OldMeterOutwardComponent,
        OldMeterOutwardDetailsComponent,
        SimActivationDeactivationComponent,
        SimActivationDeactivationDetailsComponent,
        OutwardImportListComponent,
        OutwardImportDetailsComponent,
        ReturnFromSubcontractorListComponent,
        ReturnFromSubcontractorDetailsComponent,
        WhToWhOutwardListComponent,
        WhToWhOutwardDetailsComponent,
        WhToWhInwardListComponent,
        WhToWhInwardDetailsComponent,
        ReturnToSupplierComponent,
        ReturnToSupplierDetaislComponent,
        IndentWiseOutwardImportComponent,
        IndentWiseOutwardImportDetailsComponent,
        ImportMiDataComponent,
        ImportMiDataDetailsComponent,
        MiDataUpdateComponent,
        MiDataUpdateDetailsComponent,
        ImportHesDataComponent,
        ImportHesDataDetailsComponent,
        ImportCcnbDataDetailsComponent,
        ImportCcnbDataComponent,
        ItemComponent,
        ItemDetailsComponent,
        ItemGroupListComponent,
        ItemGroupDetailsComponent,
        WarehouseCreationComponent,
        WarehouseCreationDetailsComponent,
        ItemCategoryListComponent,
        ItemCategoryDetailsComponent,
        DisplaySerialNoListComponent,
        MastersSupplierListComponent,
        MastersSupplierDetailsComponent,
        IndentRequestListComponent,
        IndentRequestDetailsComponent,
        IndentApproverComponent,
        IndentApproverDetailsComponent

  ],
  imports: [
    CommonModule,
    AimsRoutingModule,
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
export class AimsModule { }
