import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h1>Welcome to my countries page</h1>
        <Link to="/home">
          <button className={style.enter}>
            <span></span>
            <span></span>
            <span></span>
            <span></span> Enter
          </button>
        </Link>
      </div>
    </div>
  );
}
