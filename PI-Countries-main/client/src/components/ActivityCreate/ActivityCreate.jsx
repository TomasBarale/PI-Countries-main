import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./ActivityCreate.module.css";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countriesName: [],
  });
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Required field";
      setButtonEnabled(false);
    }
    if (!input.dificulty) {
      errors.dificulty = "Please, select a dificulty";
      setButtonEnabled(false);
    }
    if (input.duration <= 0 || input.duration >= 301) {
      errors.duration = "Please, select a duration between 1 and 300 minutes";
      setButtonEnabled(false);
    }
    if (!input.season) {
      errors.season = "Please, select a season";
      setButtonEnabled(false);
    }
    if (!input.countriesName) {
      errors.countriesName = "Please, select a country";
      setButtonEnabled(false);
    }
    if (Object.entries(errors).length === 0) setButtonEnabled(true);

    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCountrySelect(e) {
    if (input.countriesName.includes(e.target.value))
      return alert("You've already selected that country");
    setInput({
      ...input,
      countriesName: [...input.countriesName, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleDelete(e) {
    setInput({
      ...input,
      countriesName: input.countriesName.filter((f) => f !== e),
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(input));
    alert("Activity created!!");
    setInput({
      name: "",
      dificulty: "",
      duration: "",
      season: "",
      countriesName: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div>
      <div className={style.containerCreate12}>
        <Link to="/home">
          <button className={style.btnHoome}>Home</button>
        </Link>

        <h1>Create your Activity!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={style.separate}>
            {/* <label>Activity: </label> */}
            <input
              className={style.input}
              type="text"
              value={input.name}
              name="name"
              placeholder="Activity name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            {errors.name && <p className={style.warning}>{errors.name}</p>}
          </div>
          <div className={style.separate}>
            {/* <label>Difficulty:</label> */}
            <select
              className={style.selectt}
              defaultValue={"default"}
              name="dificulty"
              onChange={(e) => handleSelect(e)}
            >
              <option value="default" disabled>
                Difficulty
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            {errors.dificulty && (
              <p className={style.warning}>{errors.dificulty}</p>
            )}
          </div>
          <div className={style.separate}>
            {/* <label>Duration:</label> */}
            <input
              className={style.input}
              type="number"
              value={input.duration}
              name="duration"
              min={1}
              max={300}
              placeholder="Duration"
              onChange={(e) => handleChange(e)}
            />
            {errors.duration && (
              <p className={style.warning}>{errors.duration}</p>
            )}
          </div>
          <div className={style.separate}>
            {/* <label>Season:</label> */}
            <select
              defaultValue={"default"}
              name="season"
              onChange={(e) => handleSelect(e)}
            >
              <option value="default" disabled>
                Season
              </option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="autumn">Autumn</option>
              <option value="spring">Spring</option>
            </select>
          </div>
          <div>
            {errors.season && <p className={style.warning}>{errors.season}</p>}
          </div>
          <div className={style.separate}>
            <select
              defaultValue={"default"}
              name="countriesName"
              onChange={(e) => handleCountrySelect(e)}
            >
              <option value="default" disabled>
                Select Country
              </option>
              {countries.map((m) => (
                <option value={m.name}>{m.name}</option>
              ))}
            </select>
            <div>
              {errors.countriesName && (
                <p className={style.warning}>{errors.countriesName}</p>
              )}
            </div>
          </div>
          <ul>
            <li>{input.countriesName.map((el) => el + ", ")}</li>
          </ul>
          <button
            className={style.createbtn}
            type="submit"
            disabled={!buttonEnabled}
          >
            Create
          </button>
        </form>
        {input.countriesName.map((m) => (
          <div className={style.form}>
            <p className={style.p}>
              {m}
              <button className={style.buttonX} onClick={() => handleDelete(m)}>
                X
              </button>
            </p>
          </div>
        ))}

        {/* Para borrar los paises seleccionados */}
      </div>
    </div>
  );
}
