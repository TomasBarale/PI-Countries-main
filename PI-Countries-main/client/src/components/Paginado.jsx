import React from "react";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    //redondea para arriba todas las countries sobre la cantidad que quiero por pagina
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers?.map((number) => (
          <li className="number" key={number}>
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  ); // si hay pagenumbers mapealo y devuelve por cada uno de los numeros que devuelva el paginado
}
