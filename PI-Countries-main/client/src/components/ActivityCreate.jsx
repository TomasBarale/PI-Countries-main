import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "required field";
  }
  if (!input.dificulty) {
    errors.dificulty = "Please, select a dificulty";
  }
  if (input.duration <= 0 || input.duration >= 301) {
    errors.duration = "Please, select a duration between 1 and 300 minutes";
  }
  if (!input.season) {
    errors.season = "Please, select a season";
  }
  if (!input.countriesName) {
    errors.countriesName = "Please, select a country";
  }
  return errors;
}

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countriesName: [],
  });

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
    setInput({
      ...input,
      countriesName: [...input.countriesName, e.target.value],
    });
  }
  function handleSelect(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your Activity!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Activity:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Difficulty:</label>
          <select
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
          <label>Duration:</label>
          <input
            type="number"
            value={input.duration}
            name="duration"
            min={1}
            max={300}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.duration}</p>}
        </div>
        <div>
          <label>Season:</label>
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
        <ul>
          <li>{input.countriesName.map((el) => el + " ,")}</li>
        </ul>
        <button type="submit">Create</button>
      </form>
      {/* Para borrar los paises seleccionados */}
      {input.countriesName.map((el) => (
        <div>
          <p>{el}</p>
          <button onClick={() => handleDelete(el)}>X</button>
        </div>
      ))}
    </div>
  );
}
