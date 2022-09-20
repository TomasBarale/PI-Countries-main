import React from "react";

export default function Card({ name, flag, continent }) {
  return (
    <div>
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        <img src={flag} alt="flag not found" width="200px" height="250px" />
      </div>
      <div>
        <h5>{continent}</h5>
      </div>
    </div>
  );
}
