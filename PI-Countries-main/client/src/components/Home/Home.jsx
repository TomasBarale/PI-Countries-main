import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinent,
  orderByName,
  orderByPopulation,
  filterActivities,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch(); //para despachar las actions
  const allCountries = useSelector((state) => state.countries); // trae en esa constante todo lo que hay adentro de countires
  //trae del estado los countries cuando el componente se monta

  const [order, setOrder] = useState("");
  const [orderP, setOrderPopulation] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //1 porque arranca en la primer pagina
  const [countriesPerPage, setCountriesPerPage] = useState(10); //cuantos countries por pagina
  const indexOfLastCountry = currentPage * countriesPerPage; //1 * 10 = 10
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  ); //countries de la pagina actual = arreglo del state

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //trae del estado los paises cuando el componente se monta
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); //para que no se recarge la pagina
    dispatch(getCountries());
  }

  function handleFilterContinent(e) {
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);
  }
  //ordena por nombre
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //seteando para que arranque de la pagina uno
    setOrder(`Sort ${e.target.value}`); //para que cuando setea la pagina modifique el estado local y se reenderize
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1); //seteando para que arranque de la pagina uuno
    setOrderPopulation(`Ordenado ${e.target.value}`);
  }

  function handleFilterByActivities(e) {
    e.preventDefault();
    dispatch(filterActivities(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={style.contaainer}>
      <Link className={style.linkCreate} to="/activities">
        Create activity
      </Link>
      <h1>Countries</h1>
      <button
        className={style.reload}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload countries
      </button>
      <div>
        <div className={style.filterBar}>
          <select
            onChange={(e) => handleSortPopulation(e)}
            className={style.filter}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Order by population
            </option>
            <option value="may">Larger population</option>
            <option value="men">Smaller population</option>
          </select>

          <select
            onChange={(e) => handleSortName(e)}
            className={style.filter}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Order by name
            </option>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </select>

          <select
            onChange={(e) => handleFilterByActivities(e)}
            className={style.filter}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Activities
            </option>
            <option value="with">With Activities</option>
            <option value="without">Without Activities</option>
          </select>

          <select
            onChange={(e) => handleFilterContinent(e)}
            className={style.filter}
            defaultValue={"default"}
          >
            <option value="default" disabled>
              Continent
            </option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />

        <SearchBar />
        <div className={style.displayCards}>
          {currentCountry?.map((m) => {
            return (
              <div>
                <Link className={style.link} to={"/home/" + m.id}>
                  <Card name={m.name} flag={m.flag} continent={m.continent} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
