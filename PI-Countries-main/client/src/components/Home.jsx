import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch(); //para despachar las actions
  const allCountries = useSelector((state) => state.countries); // trae en esa constante todo lo que hay adentro de countires
  //trae del estado los countries cuando el componente se monta

  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina
  const [countriesPerPage, setCountriesPerPage] = useState(10); //cuantos countries por pagina
  const indexOfLastCountry = currentPage * countriesPerPage; //1 * 10 = 10
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //0
  const currentCountry = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); //countries de la pagina actual = arreglo del state

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />

        {allCountries?.map((m) => {
          return (
            <div>
              <Link to={"/home/" + m.id}>
                <Card name={m.name} flag={m.flag} continent={m.continent} />;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
