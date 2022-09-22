import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postCountries, getActivities, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [activity, setActivity] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countriesName: [],
  });

  function handleChange(e) {
    e.preventDefault();
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setActivity({
        ...activity,
        status: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    e.preventDefault();
    setActivity({
      ...activity,
      countries: [...activity.countriesName, e.target.value],
    });
  }

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>create your activity</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={activity.name}
            name="name"
            maxLength={3}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Dificulty:</label>
          <input
            type="number"
            value={activity.dificulty}
            name="dificulty"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Duration:</label>
          <input
            type="number"
            value={activity.duration}
            name="duration"
            min="1"
            max="300"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Season:</label>
          <label>
            <input
              type="checkbox"
              name="summer"
              value="summer"
              onChange={(e) => handleCheck(e)}
            />
            Summer
          </label>
          <label>
            <input
              type="checkbox"
              name="autumn"
              value="autumn"
              onChange={(e) => handleCheck(e)}
            />
            Autumn
          </label>
          <label>
            <input
              type="checkbox"
              name="winter"
              value="winter"
              onChange={(e) => handleCheck(e)}
            />
            Winter
          </label>
          <label>
            <input
              type="checkbox"
              name="spring"
              value="spring"
              onChange={(e) => handleCheck(e)}
            />
            Spring
          </label>
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {countries.map((act) => (
            <option value={act.name}>{act.name}</option>
          ))}
          {/* <label>Countries Name:</label>
            <input
              type="text"
              value={input.countriesName}
              name="countriesName"
            /> */}
        </select>
        <ul>
          <li>{activity.countries.map((m) => m + " ,")}</li>
        </ul>
        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
}
