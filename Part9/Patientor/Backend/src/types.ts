export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PaitientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
