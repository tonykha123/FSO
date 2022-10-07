import React from 'react';
import { Patient, Diagnosis } from '../types';
interface IProps {
  patient: Patient;
  diagnosis: { [id: string]: Diagnosis };
}

const Entries = ({ patient, diagnosis }: IProps) => {
  console.log(diagnosis, 'from entries');
  if (!patient.entries) return <div>LOADING</div>;

  const entries = patient.entries.map((e) => (
    <div key={e.id}>
      {e.date} {e.description}
      <ul>
        {e.diagnosisCodes?.map((c) => (
          <li key={c}>
            {c} :{diagnosis[c].name}
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div>
      <h1>Entries</h1>
      {entries}
    </div>
  );
};

export default Entries;
