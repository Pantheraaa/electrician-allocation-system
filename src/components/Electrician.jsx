import React from 'react';
import styles from "./electrician.module.css";

const Electrician = ({ data }) => {
  const { name, phoneNumber, zone, grievanceElectrician } = data;
  /**
   {
        "name": "Javed",
        "phoneNumber": "6161232524",
        "zone": [
            "GURGAON"
        ],
        "grievanceElectrician": false
    }
   */
  return (
    <div className={ styles.Electrician }>
      <h3>Name: { name } </h3>
      <p>Phone: { phoneNumber } </p>
      <p>Zone: { zone?.join(", ") } </p>
      <p>Grievance electrician: { grievanceElectrician ? "Yes" : "No" } </p>
    </div>
  )
}

export default Electrician;