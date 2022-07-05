

export interface ApplicationRequested {
  applicationName: string;
  accesType:       string;
  isRequired:      boolean;
  start:           Date;
  end:             Date;
  status:          string;
  remarks:         null;
}
