
export interface ApprovalDialogData {
  masterData: any;
  remarks: string;
  approveReject: Status;
  submitURL:string;
}

enum Status {
  Approved,
  Rejected
}
