const initialState = {
  countries: [],
  allCountries: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES": //trae todo lo que mande getcountries
      return {
        ...state,
        countries: action.payload, //en este estado manda todo lo que mande la action get_countries
        allCountries: action.payload,
      };
    case "FILTER_BY_CONTINENT":
      const allCountries = state.allCountries;
      const continentFilter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((f) => f.continent === action.payload);
      return {
        ...state,
        countries: continentFilter,
      };

    default:
      return state;
  }
}

export default rootReducer;
