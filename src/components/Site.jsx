import React, { useState } from 'react';
import styles from "./site.module.css";
import { FiEdit } from "react-icons/fi";

const Site = ({ data }) => {
  const [site, setSite] = useState({ ...data });
  const [isEdit, setIsEdit] = useState(false);
  const formateDate = (timestamp) => {
    let date = new Date(timestamp);
    const fullDate = `${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    return fullDate;
  }

  const handleDateChange = (e) => {
    setSite({ ...site, ["InstallationDate"]: e.target.value });
    setIsEdit(false);
  }

  return (
    <div className={ styles.Site }>
      <h3>Name: { site.name }</h3>
      <p>Phone: { site.phone }</p>
      <p>City: { site.city }</p>
      <p>Assigned Electrician: { site.AssignedElectritian[0]?.electricianName }</p>
      <div style={ { display: "flex", alignItems: "center", gap: "1rem" } }>
        <p>
          Installation Date: { !isEdit ?
            <span>{ formateDate(site.InstallationDate) }</span>
            : <input type='date' name={ data.name } phone={ data.phone } onChange={ handleDateChange } /> }
        </p>
        <FiEdit onClick={ () => setIsEdit(true) } />
      </div>
      <p>grievance: { site.grievance ? "Yes" : "No" }</p>
    </div>
  )
}

export default Site;