import { RoleList } from "../../../rolecreation/role-creation.component";
import { DiscomData } from "../model/DiscomData";

export interface UserData {
  firstName:      string;
  lastName:       string;
  orgName:        string;
  employeeId:     string;
  email:          string;
  phonoNo:        string;
  userId:         string;
  active:         boolean;
  discomDataList: DiscomData[];
  userRolesList:  RoleList[];
}
