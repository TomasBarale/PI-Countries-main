const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getCountries = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    let DB = await Country.findAll({
      attributes: ["id", "name", "flag", "continent", "population"],
      include: {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
    if (DB.length > 0) {
      return res.send(DB);
    } else {
      const allCountries = await axios.get("https://restcountries.com/v3/all");
      const countryy = allCountries.data.map((m) => {
        return {
          id: m.cca3,
          name: m.name.common,
          flag: m.flags[0],
          continent: m.continents[0],
          capital: m.capital != null ? m.capital[0] : "No data",
          subregion: m.subregion,
          area: m.area,
          population: m.population,
        };
      });

      await Country.bulkCreate(countryy, { validate: true });

      let DB = await Country.findAll({
        attributes: ["id", "name", "flag", "continent", "population"],
        include: {
          model: Activity,
          attributes: ["name", "dificulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      });
      return res.send(DB);
    }
  } //if(name)
  let allCountries = await Country.findAll({ include: Activity });
  let countriesName = allCountries.filter((f) =>
    f.name.toLowerCase().includes(name.toLowerCase())
  );

  return countriesName.length
    ? res.send(countriesName)
    : res.status(404).send("There is no such country");
};

const getCountryById = async (req, res) => {
  const { id } = req.params;
  let allCountries = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "dificulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
  let countriesId = allCountries.filter((f) =>
    f.id.toLowerCase().includes(id.toLowerCase())
  );

  return countriesId.length
    ? res.status(200).send(countriesId)
    : res.status(404).send("The id is incorrect");
};

module.exports = {
  getCountries,
  getCountryById,
};
