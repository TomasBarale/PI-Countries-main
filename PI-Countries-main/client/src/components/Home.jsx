import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch(); //para despachar las actions
  const allCountries = useSelector((state) => state.countries); // trae en esa constante todo lo que hay adentro de countires
  //trae del estado los countries cuando el componente se monta
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); //para que no se recarge la pagina
    dispatch(getCountries());
  }

  return (
    <div>
      <Link to="/activities">Create activity</Link>
      <h1>Countries</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload countries
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente </option>
        </select>
        <select>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
        <select>
          <option value="act">Activities</option>
        </select>
        <select>
          <option value="cont">Continent</option>
        </select>
        {allCountries?.map((m) => {
          return (
            <fragment>
              <Link to={"/home/" + m.id}>
                <Card name={m.name} flags={m.flag} continent={m.continent} />;
              </Link>
            </fragment>
          );
        })}
      </div>
    </div>
  );
}
