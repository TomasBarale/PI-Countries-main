import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/countries");
  };
}
