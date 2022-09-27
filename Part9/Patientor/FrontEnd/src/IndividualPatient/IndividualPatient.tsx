import React, { useEffect } from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue,updatePatient } from "../state";
import { useParams } from "react-router-dom";

const IndividualPatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  if (!id || !patients[id]) return null;

  useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        if (id) {
          const { data: singlePatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(singlePatient));
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchSinglePatient();
  }, []);

  const { name, ssn, occupation, dateOfBirth } = patients[id];

  return (
    <div>
      <h1>Name : {name}</h1>
      <h3>ssn : {ssn}</h3>
      <h3> Occupation : {occupation}</h3>
      <h3>DOB: {dateOfBirth}</h3>
    </div>
  );
};

export default IndividualPatient;
