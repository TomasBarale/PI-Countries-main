import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import style from "./Detail.module.css";

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
        <div className={style.container}>
          <div>
            <img
              className={style.flag}
              src={myCountry[0].flag}
              alt="country flag"
            />
          </div>
          <div className={style.cardDetail}>
            <h1>Name: {myCountry[0].name}</h1>
            <h2>Id: {myCountry[0].id}</h2>
            <h3>Capital: {myCountry[0].capital}</h3>
            <h3>Subregion: {myCountry[0].subregion}</h3>
            <h3>Area: {myCountry[0].area} km²</h3>
            <h3>Population: {myCountry[0].population} inhabitants</h3>
          </div>
          <div className={style.containerActivitiesCards}>
            {myCountry[0].activities.length ? (
              <h3>
                <b>Activities: </b>
              </h3>
            ) : (
              ""
            )}
            {myCountry[0].activities?.map((m) => (
              <div>
                <ul className={style.cardActivities}>
                  <li>Name: {m.name}</li>
                  <li>Dificulty: {m.dificulty}</li>
                  <li>Duration: {m.duration} minutes</li>
                  <li>Season: {m.season}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to="/home">
        <button className={style.buttonBack}>Back</button>
      </Link>
    </div>
  );
}

//   return (
//     <div className={style.container}>
//       {myCountry.length > 0 ? (
//         <div>
//           <img
//             className={style.flag}
//             src={myCountry[0].flag}
//             alt="country flag"
//           />
//           <h1>{myCountry[0].name}</h1>
//           <h3>Id: {myCountry[0].id}</h3>
//           <h3>Capital: {myCountry[0].capital}</h3>
//           <h3>Subregion: {myCountry[0].subregion}</h3>
//           <h3>Area: {myCountry[0].area} km²</h3>
//           <h3>Population: {myCountry[0].population}</h3>
//           {myCountry[0].activities.length ? (
//             <p className={style.letras}>Activities:</p>
//           ) : (
//             ""
//           )}
//           {myCountry[0].activities?.map((e) => (
//             <div>
//               <ul className={style.textoActividad}>
//                 <p className={style.letras}>Name: {e.name}</p>

//                 <p className={style.letras}>Dificulty: {e.dificulty}</p>

//                 <p className={style.letras}>Duration: {e.duration} minutes</p>

//                 <p className={style.letras}>Season: {e.season}</p>
//               </ul>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//       <div>
//         <Link to="/home">
//           <button className="btn-home-detail">Home</button>
//         </Link>
//       </div>
//     </div>
//   );
// }
