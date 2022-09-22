import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinent,
  orderByName,
  orderByPopulation,
  filterActivities,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch(); //para despachar las actions
  const allCountries = useSelector((state) => state.countries); // trae en esa constante todo lo que hay adentro de countires
  //trae del estado los countries cuando el componente se monta

  const [order, setOrder] = useState("");
  const [orderP, setOrderPopulation] = useState("");
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

  function handleFilterContinent(e) {
    dispatch(filterCountriesByContinent(e.target.value));
  }
  //ordena por nombre
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Ordenado ${e.target.vale}`); //para que cuando setea la pagina modifique el estado local y se reenderize
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1); //seteando para que arranque de la pagina uuno
    setOrderPopulation(`Ordenado ${e.target.vale}`);
  }

  function handleFilterByActivities(e) {
    e.preventDefault();
    dispatch(filterActivities(e.target.value));
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
        <div>
          <select onChange={(e) => handleSortPopulation(e)}>
            <option>Order by population</option>
            <option value="may">Mayor poblacion</option>
            <option value="men">Menor poblacion</option>
          </select>

          <select onChange={(e) => handleSortName(e)}>
            <option>Order by name</option>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </select>

          <select onChange={(e) => handleFilterByActivities(e)}>
            <option value="all">Activities</option>
            <option value="with">With Activities</option>
            <option value="without">Without Activities</option>
          </select>

          <select onChange={(e) => handleFilterContinent(e)}>
            <option value="All">Continent</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
          </select>

          <Paginado
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
          />
        </div>
        <SearchBar />

        {currentCountry?.map((m) => {
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
