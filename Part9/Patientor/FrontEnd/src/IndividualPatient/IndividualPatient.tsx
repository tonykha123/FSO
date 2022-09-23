import React, { useEffect } from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const IndividualPatient = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  if (!id || !patients) return null;
  const foundPatient = patients[id];
  if (!foundPatient) return null;

  useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        if (id) {
          const { data: singlePatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "UPDATE_PATIENT", payload: singlePatient });
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchSinglePatient();
  }, []);

  return (
    <div>
      <h1>Name : {foundPatient.name}</h1>
      <h3>ssn : {foundPatient.ssn}</h3>
      <h3> Occupation : {foundPatient.occupation}</h3>
    </div>
  );
};

export default IndividualPatient;
