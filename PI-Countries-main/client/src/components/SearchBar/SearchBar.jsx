import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  //estado local para guardar la busqueda
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  //despacha la accion con el nombre del pais
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(name));
    setName("");
  }

  return (
    <div className={style.searchBar}>
      <div className={style.search}>
        <input
          type="text"
          name="text"
          value={name}
          placeholder="Search country"
          onChange={(e) => handleInputChange(e)}
        />

        <button
          className={style.btnSearch}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </div>
    </div>
  );
}
