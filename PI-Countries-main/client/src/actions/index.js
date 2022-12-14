import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/countries", {});
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function filterCountriesByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

export function filterActivities(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload: payload,
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/countries?name=" + name
      );
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      alert("The country introduced does not exist");
      console.log(error);
    }
  };
}

export function postActivities(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post(
        `http://localhost:3001/activities`,
        payload
      );
      alert("Successfully created activity");
      return response;
    } catch (error) {
      alert(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
}
