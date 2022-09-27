import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h1>Welcome to my countries page</h1>
        <Link to="/home">
          <button className={style.learnMore}>
            <span className={style.circle} aria-hidden="true">
              <span className={style.iconArrow}></span>
            </span>
            <span className={style.buttonText}>Enter</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
