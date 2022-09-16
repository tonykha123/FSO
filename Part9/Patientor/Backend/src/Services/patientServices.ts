import patientData from '../../data/patients.json';
import { PatientEntry, PatientEntryNoSSN } from '../types';

const patients: PatientEntry[] = patientData;

const getPatient = (): PatientEntry[] => {
  return patients;
};

const getPatientNoSSN = (): PatientEntryNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatient,
  getPatientNoSSN,
};
