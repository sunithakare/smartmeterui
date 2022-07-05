import { ApplicationDetails } from "./ApplicationDetails";
import { ApplicationRequested } from "./ApplicationRequested";
import { ApproverRemark } from "./ApproverRemark";
import { EmploymentDetails } from "./EmploymentDetails";
import { LocationDetails } from "./LocationDetails";
import { RemarksData } from "./RemarksData";
import { SpocDetails } from "./SpocDetails";
import { UserDetails } from "./UserDetails";
import { VPNDetails } from "./VPNDetails";

export interface Register {
  userDetails:          UserDetails;
  employmentDetails:    EmploymentDetails;
  locationDetails:      LocationDetails;
  applicationDetails:   ApplicationDetails;
  applicationRequested: ApplicationRequested[];
  vpnDetails:           VPNDetails;
  approverRemarks:      ApproverRemark[];
  remarksData:          RemarksData;
  spocData:          SpocDetails[];
}


