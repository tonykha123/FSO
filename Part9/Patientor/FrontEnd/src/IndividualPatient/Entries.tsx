import React from 'react';
import { Patient } from '../types';
interface IProps {
  patient: Patient;
}

const Entries = ({ patient }: IProps) => {
  console.log(patient, 'from entries');

  if (!patient.entries) return <div>LOADING</div>;

  const entries = patient.entries.map((e) => (
    <div key={e.id}>
      {e.date} {e.description}
      <ul>
        {e.diagnosisCodes?.map((c) => (
          <li key={c}>{c}</li>
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
