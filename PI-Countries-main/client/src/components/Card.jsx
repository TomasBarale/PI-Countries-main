import React from "react";

export default function Card({ name, flag, continent }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={flag} alt="flag not found" width="200px" height="250px" />
      <h5>{continent}</h5>
    </div>
  );
}
