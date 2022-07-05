import { MastersSupplierListComponent } from './masters/masters-supplier-list/masters-supplier-list.component';
import { GenericAuthGuardService } from './../../services/authguard.service';
import { InwardImportComponent } from './inward-import/inward-import.component';
import { AimsComponent } from './aims.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldMeterInwardComponent } from './old-meter-inward/old-meter-inward.component';
import { OldMeterOutwardComponent } from './old-meter-outward/old-meter-outward.component';
import { SimActivationDeactivationComponent } from './sim-activation-deactivation/sim-activation-deactivation.component';
import { OutwardImportListComponent } from './outward-import-list/outward-import-list.component';
import { ReturnFromSubcontractorListComponent } from './return-from-subcontractor-list/return-from-subcontractor-list.component';
import { WhToWhOutwardListComponent } from './wh-to-wh-outward-list/wh-to-wh-outward-list.component';
import { WhToWhInwardListComponent } from './wh-to-wh-inward-list/wh-to-wh-inward-list.component';
import { ReturnToSupplierComponent } from './return-to-supplier/return-to-supplier.component';
import { IndentWiseOutwardImportComponent } from './indent-wise-outward-import/indent-wise-outward-import.component';
import { ImportMiDataComponent } from './import-mi-data/import-mi-data.component';
import { ImportHesDataComponent } from './import-hes-data/import-hes-data.component';
import { ImportCcnbDataComponent } from './import-ccnb-data/import-ccnb-data.component';
import { WarehouseCreationComponent } from './masters/warehouse-creation/warehouse-creation.component';
import { ItemComponent } from './masters/item/item.component';
import { ItemGroupListComponent } from './masters/item-group-list/item-group-list.component';
import { DisplaySerialNoListComponent } from './display-serial-no-list/display-serial-no-list.component';
import { ItemCategoryListComponent } from './masters/item-category-list/item-category-list.component';
import { IndentRequestListComponent } from './indent-request-list/indent-request-list.component';
import { IndentApproverComponent } from './indent-approver/indent-approver.component';

const routes: Routes = [ {
  path: '',
  component: AimsComponent,
  children: [
             { path: 'oldMeterInward', component: OldMeterInwardComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'oldMeterOutward', component: OldMeterOutwardComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'simActivationDeactivation', component: SimActivationDeactivationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'inwardImport', component: InwardImportComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'outwardImportList', component: OutwardImportListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'returnFromSubcontractorList', component: ReturnFromSubcontractorListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'whtowhoutwardList', component: WhToWhOutwardListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'whtowhinwardimportList', component: WhToWhInwardListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'returnToSupplier', component: ReturnToSupplierComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'indentWiseOutwardImport', component: IndentWiseOutwardImportComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'importmidata', component: ImportMiDataComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'importhesdata', component: ImportHesDataComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'importccnbdata', component: ImportCcnbDataComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},

            // {path: 'discom', component: DiscomComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'warehouseCreation', component: WarehouseCreationComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
            // {path: 'addingUser', component: AddingUserComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
            // {path: 'userErrorMessage', component: UserErrorMessageComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},

           //  {path: 'subcontractormapping', component: SubcontractorMappingComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
            // {path: 'cimaster', component: CiMasterComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
            // {path: 'citywarehousemapping', component: CityWarehouseMappingComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             {path: 'item', component: ItemComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},

           //  { path: 'divisioncreationList', component: DivisionCreationListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
           //  { path: 'subdivisionList', component: SubdivisionListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
           //  { path: 'substationcreationList', component: SubstationCreationListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
             { path: 'itemgroupList', component: ItemGroupListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},
           //  { path: 'itemtypeList', component: ItemTypeListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},

           //  {path: 'feedercreation',component: FeederCreationComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
           //  { path: 'dtrcreation',component: DtrCreationComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
           //  {path: 'suppliersubcontractor',component: SupplierSubcontractorComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
           //  {path: 'itemmake',component: ItemMakeComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
             {path: 'masterSupplier',component: MastersSupplierListComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
             { path: 'itemCategoryList', component: ItemCategoryListComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},


             {path: 'displayList',component: DisplaySerialNoListComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
             {path: 'indentrequestlist',component: IndentRequestListComponent  ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'},},
             { path: 'indentApprover', component: IndentApproverComponent ,canActivate: [GenericAuthGuardService],data:{role:'ANY',permission:'ANY'}},

             { path: '', redirectTo: '/ltapp/dashboard', pathMatch: 'full' }
            ],

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AimsRoutingModule { }
