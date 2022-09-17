import patientData from '../../data/patients.json';
import { PatientEntry, PatientEntryNoSSN, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';
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

const findPatientById = (id: string): PatientEntry | undefined => {
  const foundPatientById = patients.find((p) => p.id === id);

  return foundPatientById;
};
const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatient,
  getPatientNoSSN,
  addPatient,
  findPatientById,
};
