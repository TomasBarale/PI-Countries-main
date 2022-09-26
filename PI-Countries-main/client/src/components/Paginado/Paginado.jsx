import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    //redondea para arriba todas las countries sobre la cantidad que quiero por pagina
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.paginador}>
        {pageNumbers?.map((number) => (
          <li className={styles.number} key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  ); // si hay pagenumbers mapealo y devuelve por cada uno de los numeros que devuelva el paginado
}
