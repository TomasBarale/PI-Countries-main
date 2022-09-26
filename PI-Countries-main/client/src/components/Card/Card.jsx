import React from "react";
import style from "./Card.module.css";

export default function Card({ name, flag, continent }) {
  return (
    <div className={style.card}>
      <img
        className={style.cardImg}
        src={flag}
        alt="flag not found"
        width="300px"
        height="250px"
      />
      <h3 className={style.cardName}>{name}</h3>
      <h5 className={style.cardContinent}>{continent}</h5>
    </div>
  );
}
