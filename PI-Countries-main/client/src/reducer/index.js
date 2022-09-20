const initialState = {
  countries: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES": //trae todo lo que mande getcountries
      return {
        ...state,
        countries: action.payload, //en este estado manda todo lo que mande la action get_countries
      };
    default:
      return state;
  }
}

export default rootReducer;
