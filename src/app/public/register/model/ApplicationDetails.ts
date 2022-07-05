import { ConfigCode } from "src/app/services/httpclient.service";

export interface ApplicationDetails {
  userType:        string;
  requestFor:      string;
  existingVPNName: string;
  state:           string;
  discomList:      ConfigCode[];
  status:          string;
}
