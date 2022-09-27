import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    //redondea para arriba todas las countries sobre la cantidad que quiero por pagina
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={style.paginador}>
        {pageNumbers?.map((number) => (
          <li className={style.number} key={number}>
            <button
              className={style.buttonPag}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  ); // si hay pagenumbers mapealo y devuelve por cada uno de los numeros que devuelva el paginado
}
