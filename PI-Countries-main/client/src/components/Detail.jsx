import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id)); //para acceder al id del detail
  }, [dispatch]);

  const myCountry = useSelector((state) => state.detail);

  return (
    <div>
      {myCountry.length > 0 ? (
        <div>
          <img src={myCountry[0].flag} alt="country flag" />
          <h1>Name:{myCountry[0].name}</h1>
          <h2>Id:{myCountry[0].id}</h2>
          <h3>Capital:{myCountry[0].capital}</h3>
          <h3>Subregion:{myCountry[0].subregion}</h3>
          <h3>Area:{myCountry[0].area}</h3>
          <h3>Population:{myCountry[0].population}</h3>
          {myCountry[0].activities.length ? (
            <h3>
              <b>Activities: </b>
            </h3>
          ) : (
            ""
          )}
          {myCountry[0].activities?.map((e) => (
            <div>
              <ul>
                <li>
                  <b>Name:</b>
                  {e.name}
                </li>
                <li>
                  <b>Dificultad:</b>
                  <p>{e.dificulty}</p>
                </li>
                <li>
                  <b>Duration:</b>
                  <p>{e.duration}HS</p>
                </li>
                <li>
                  <b>Season:</b>
                  <p>{e.season}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
