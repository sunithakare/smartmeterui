// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL:"",
  AUTH_API:"/authenticate",
  LOGOUT_API:"/logout",
  FETCH_USER_ROLES_API:"/authenticate",
  SLAREPORTS_API:"/sladashboard/fetchSlaReports",
  SLAREPORTS_FILTER_API:"/sladashboard/fetchSlaReportswithfilter",
  SLAREPORTS_DOWNLOAD_API:"/sladashboard/download",
  USER_DISCOM_DATA_API:"/access/fetchStateAndDiscomForUser",
  FETCH_CONFIG_CODE_LIST_API:"/common/code",
  FETCH_CONFIG_CODE_LIST_SUBTYPE_API:"/common/findcodewithsubtype",
  FETCH_ROLES_API:"/roles/fetchRoles",
  FETCH_ALL_ROLES_FOR_TYPE_API:"/roles/fetchAllRoles",
  FETCH_ROLE_DETAILS_API:"/roles/roledata",
  FETCH_ROLES_WITH_FILTER_API:"/roles/fetchRoleswithfilter",
  FETCH_All_MODULES_API:"/access/moduleslist",
  FETCH_MODULE_ACCESS_API:"/access/modulespermission",
  SAVE_ROLE_API:"/roles/save",
  CREATE_ROLE_API:"/roles/create",
  DELETE_ROLE_API:"/roles/delete",
  FETCH_USERS_API:"/user/getuserslist",
  FETCH_USERS_WITH_FILTER_API:"/user/getuserslistwithfilter",
  FETCH_DISCOMS_IN_STATES_API:"/common/discominstate",
  FETCH_ALL_STATES_API:"/common/discomstatelist",
  FETCH_USER_DATA_API:"/user/getuserdata",
  CHECK_USER_NAME_API:"/user/checkusername",
  SAVE_USER_API:"/user/save",
  CREATE_USER_API:"/user/create",
  FETCH_APPROVER_API:"/approval/list",
  FETCH_APPROVER_WITH_FILTER_API:"/approval/find",
  DELETE_APPROVER_API:"/approval/delete",
  FIND_APPROVER_BY_NAME_API:"/approval/getapprover",
  SAVE_APPROVER_API:"/approval/saveapprover",
  CREATE_APPROVER_API:"/approval/createapprover",


  UAM_REGISTER_API:"/uam/register",
  UAM_VIEW_STATUS_API:"/uam/getid",
  UAM_VIEW_DETAILS_API:"/uam/reference",
  UAM_FETCH_APPLICATIONS_API:"/uam/getall",
  UAM_FETCH_APPLICATIONSWITH_FILTER_API:"/uam/getallwithfilter",
  UAM_APPROVE_API:"/uam/approval",
  UAM_VALID_STATUS_API:"/uam/getstatuslist",
  UAM_COMPLETE_API:"/uam/completeapplication",
  UAM_GET_NEXT_APPROVER_API:"/uam/getnextapprover",


  UPDATE_CI_FIELD_USER_CREATION:"/fieldUserCreation/updateCiFieldUserCreationDetails",
  SAVE_FIELD_USER_DATA:"/fieldUserCreation/saveFieldUserData",
  FETCH_FIELD_USER_DATA :"/fieldUserCreation/fetchFieldUserData",
  USER_CREATION_DETAILS:"/fieldUserCreation/userCreationDetails",
  FETCH_BY_FIELD_USER_NAME:"/fieldUserCreation/fetchByfieldUserNameFilter",




  FETCH_CI_USER_ALLOTMENT:"/fieldUserAllotment/fetchFieldUserAllotment",
  //FETCH_DATA_WITH_AGENCY_API:"/fieldUserAllotment/fetchAgencyByFilter",
  //FETCH_DATA_WITH_MOBILENO:"/fieldUserAllotment/getDataByMobileNo",
  //FETCH_DATA_TO_GET_DIVISIONS:"/fieldUserAllotment/getDivisionByAgency",
  FETCH_ALL_DATA_FOR_POPULATE:"/fieldUserAllotment/getDataByMobAndUserId",
  SAVE_FIELD_USER_ALLOTMENT_API:"/fieldUserAllotment/saveFieldUserAllotment",
  UPDATE_FIELD_USER_ALLOTMENT_API:"/fieldUserAllotment/updateFieldUserAllotment",
  FETCH_FIELD_USER_ALLOTMENT_DETAILS_API:"/fieldUserAllotment/getDetailsByFieldUser",



  FETCH_AGENCY_CREATION_API:"/agencyCreation/fetchAgencyData",
  FILTER_AGENCY_CREATION_API:"/agencyCreation/filterAgencyCreation",
  SAVE_AGENCY_CREATION_API:"/agencyCreation/saveAgencyData",
  LOOKUP_DATA_FOR_AGENCY_CREATION_API:"/agencyCreation/lookupdata",
  UPDATE_AGENCY_CREATION_API:"/agencyCreation/updateAgencyData",
  LIST_TO_DETAILS_NAVIGATION_AGENCY_CREATION_API:"/agencyCreation/listToDetailsNavigation",



  CI_MASTER_FETCH_DIVISION:"/cimasterdata/finddivbystate",
  CIA_DISCOMDATA_API:"/common/discomdata",
  CIA_SAVEDATA:"/CIAgencyAlotment/saveCIAlotment",
  CIA_UPDATE:"/CIAgencyAlotment/updataData",
  CIA_FIND_BY_STATE:"/cimasterdata/finddivbystate",
  CIA_FILTER_USER_DETAILS:"/CIAgencyAlotment/filterUserDetails",
  CIA_FIND_CI_AGENCY_DATA:"/CIAgencyAlotment/findCiAgencyData",
CIA_FIND_BY_AGENCY:"/CIAgencyAlotment/findByAgency",


SLAREPORTS_EMPLOYEE_ROLES_FOR_CATEGORY_API:"/sladashboard/fetchEmployeeRoleForCategory",
SLAREPORTS_SAVE_EMPLOYEE:"/sladashboard/saveEmployee",
  SLAREPORTS_FETCH_EMPLOYEE:"/sladashboard/getEmployeeData",

 FILE_UPLOAD_API:"/file/upload",
  FILE_DOWNLOAD_API:"/file/download",


  INVENTORY_INWARD_IMPORT_LIST_DATA:"/inventory/fetchInwardSupplierList",
  INVENTORY_OUTWARD_IMPORT_LIST_DATA:"/inventory/outwardImport",
  INVENTORY_WAREHOUSE_INWARD: "inventory/warehouseInward",
  INVENTORY_WAREHOUSE_OUTWARD:'inventory/warehouseOutward',
  INVENTORY_OLD_METER_INWARD_LIST_DATA:"/inventory/oldMeterInward",
  INVENTORY_OLD_METER_OUTWARD_LIST_DATA:"/inventory/oldMeterOutward",
  INVENTORY_RETURN_FROM_SUBCONTRACTOR_LIST_DATA:"/inventory/returnFromSubcontractor",
  INVENTORY_RETURN_TO_SUBCONTRACTOR_LIST_DATA:"/inventory/returnToSubcontractor",
  INVENTORY_OLD_METER_INWARD:"/inventory/oldMeterInward",
//Nav To Details
   INVENTORY_WAREHOUSE_OUTWORD_DETAILS:"/inventory/warehouseOutward/details",

   INVENTORY_MASTERS_ITEM_MAKE_LIST_DATA:"/inventoryMasters/getItemMake",
   INVENTORY_MASTERS_ITEM_MAKE_SAVE_DATA:"/inventoryMasters/saveMasterItemMake",
   INVENTORY_MASTERS_ITEM_MAKE_FILTER_DATA:"/inventoryMasters/filterItemMake",
   INVENTORY_MASTERS_ITEM_MAKE_UPDATE_DATA:"/inventoryMasters/updateMasterItemMake",

  //  INVENTORY_MASTERS_ITEM_GROUP_LIST_DATA:"/inventoryMasters/getItemGroup",
  //  INVENTORY_MASTERS_ITEM_GROUP_SAVE_DATA:"/inventoryMasters/saveMasterItemGroup",

   INVENTORY_MASTERS_SUPLLIER_SUBCONTRACTOR_LIST_DATA:"/inventoryMasters/getSupplierSubcontractor",
   INVENTORY_MASTERS_SUPPLIER_SUBCONTRACTOR_SAVE_DATA:"inventoryMasters/saveMasterSupplierSubcontractor",

   INVENTORY_MASTERS_WAREHOUSE_CREATION_LIST_DATA:"/inventoryMasters/getWarehouseCreation",
   INVENTORY_MASTERS_WAREHOUSE_CREATION_SAVE_DATA:"/inventoryMasters/saveMasterWarehouseCreation",
   INVENTORY_MASTERS_UPDATE_WAREHOUSE_MAPPING:"/inventoryMasters/updateWarehouseMapping",

   INVENTORY_MASTERS_ITEM_SAVE_DATA:'/inventoryMasters/saveMasterItem',
   INVENTORY_MASTERS_ITEM_FILTER_BY_ITEM_MAKE:'/inventoryMasters/filterByItemMake',
   INVENTORY_MASTERS_ITEM_FIND_ALL_ITEM_DATA:'/inventoryMasters/findAllItem',
   INVENTORY_MASTERS_ITEM_TYPE_SAVE_DATA:'/inventoryMasters/saveMasterItemType',
   INVENTORY_MASTERS_ITEM_TYPE_FIND_ALL_ITEM_TYPE:'/inventoryMasters/findAllItemType',


   INVENTORY_MASTERS_CITY_WAREHOUSE_MAPPING_SAVE_DATA:'/inventoryMasters/saveMasterCityWareHouse',
   INVENTORY_MASTERS_CITY_WAREHOUSE_MAPPING_FETECHALL:'/inventoryMasters/findAllCityWareHouse',

   SHOW_SERIAL_DATA_WHTOWHINWARD_API:"/inventory/warehouseInward/details/",
   SHOW_SERIAL_DATA_INWARDIMPORT_API:"/inventory/inwardImport/details/",
   SHOW_SERIAL_DATA_OUTWARDIMPORT_API:"/inventory/outwardImport/details/",
   SHOW_SERIAL_DATA_OLDMETERINWARD_API:"/inventory/oldMeterInward/details/",
   SHOW_SERIAL_DATA_OLDMETEROUTWARD_API:"/inventory/oldMeterOutward/details/",
   SHOW_SERIAL_DATA_RETURN_FROM_SUBCONTRACTOR_API:"/inventory/returnFromSubcontractor/details/",
   SHOW_SERIAL_DATA_RETURN_TO_SUBCONTRACTOR_API:"/inventory/returnToSubcontractor/details/",
   INVENTORY_MASTER_LIST_FETCH:"/supplier/",
   INVENTORY_MASTER_SAVE_SUPPLIER:"/supplier/",
   INVENTORY_MASTER_UPDATE_SUPPLIER:"/supplier/updateMasterSupplier",
   INVENTORY_MASTERS_ITEM_TYPE_FETCH_ITEM_GROUP:"/itemModelName/",
  // INVENTORY_MASTERS_ITEM_TYPE_FETCH_ITEM_GROUP:'/itemGroup/',
   INVENTORY_MASTERS_AIMS_SUPPLIER_DETAILS :"/supplier/active",


   INVENTORY_MASTERS_ITEM_CATEGORY_FIND_ALL_ITEM_TYPE:'/itemCategory/findAllItemCategory',
  INVENTORY_MASTERS_ITEM_CATEGORY_FETCH_ITEM_GROUP:'/itemGroup/',
  INVENTORY_MASTERS_ITEM_CATEGORY_FILTER_API:'/itemCategory/fetItemCategoryFilter',
  INVENTORY_MASTERS_ITEM_CATEGORY_SAVE_DATA:'/itemCategory/',
  INVENTORY_MASTERS_ITEM_CATEGORY_UPDATE_DATA:'/itemCategory/',
  INVENTORY_MASTERS_ITEM_CATEGORY_DETAILS_DATA:'/itemCategory/fetch',

  INVENTORY_MASTERS_ITEM_GROUP_LIST_DATA:"/itemGroup/getItemGroup",
  INVENTORY_MASTERS_ITEM_GROUP_SAVE_DATA:"/itemGroup/",
  INVENTORY_MASTERS_ITEM_GROUP_UPDATE_DATA:"/itemGroup/",
  INVENTORY_MASTERS_ITEM_GROUP_FILTER_DATA:"/itemGroup/getItemGroupFilterData",
  INVENTORY_MASTERS_ITEM_GROUP_NAV_TO_DETAILS_DETAILS_DATA:"/itemGroup/getDetailsData",

 INVENTORY_MASTERS_ITEM_MODEL_NAME_SAVE_DATA:'/itemModelName/',
  INVENTORY_MASTERS_ITEM_MODEL_NAME_FIND_ALL_ITEM_DATA:'/itemModelName/',
 INVENTORY_MASTERS_ITEM_MODEL_NAME_FETCH_ITEM_GROUP:"/itemGroup/",
  INVENTORY_MASTERS_ITEM_MODEL_NAME_FETCH_ITEM_CATEGORY:"/itemCategory/",
  INVENTORY_MASTERS_ITEM_MODEL_NAME_FETCH_ITEM_SUPPLIER:"/supplier/active",
  INVENTORY_MASTERS_ITEM_MODEL_NAME_NAV_TO_DETAILS_DATA:"/itemModelName/getDetailsData",


};

export const roleType = {
  ADMIN:"ADMIN",
  MANAGER:"MANAGER",
  VIEWER:"VIEWER",
};

export const roleConfig = {
  RoleCreation:"SRC",
  UserCreation:"SUC",
  ApproverCreation:"APPUC",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
