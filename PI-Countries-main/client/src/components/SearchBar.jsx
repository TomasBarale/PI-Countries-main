import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";

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
    <div>
      <input
        type="text"
        value={name}
        placeholder="Search country"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
