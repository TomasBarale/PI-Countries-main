const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
//trae la infocde la base de datos

const getCountries = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    let infoBD = await Country.findAll({
      attributes: ["id", "name", "flag", "continent", "population"],
      include: {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
    if (infoBD.length > 0) {
      return res.send(infoBD);
    } else {
      const allCountries = await axios.get("https://restcountries.com/v3/all");
      //let countriesDb = await Country.findall({include:Activity})
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
      const filterCountry = countryy.filter((f) => f !== undefined);
      await Country.bulkCreate(filterCountry, { validate: true });

      let infoBD = await Country.findAll({
        attributes: ["id", "name", "flag", "continent", "population"],
        include: {
          model: Activity,
          attributes: ["name", "dificulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      });
      return res.send(infoBD);
    }
  }
  let allCountries = await Country.findAll({ include: Activity });

  let countriesName = allCountries.filter((f) =>
    f.name.toLowerCase().includes(name.toLowerCase())
  );

  return countriesName.length
    ? res.send(countriesName)
    : res.status(404).send("That country does not exist");
};
const getCountryById = async (req, res) => {
  const { id } = req.params;
  let allCountries = await Country.findAll({ include: Activity });
  let countriesId = allCountries.filter((el) =>
    el.id.toLowerCase().includes(id.toLowerCase())
  );
  /* let countryDB = await Country.findAll({
    where:{id : id} ,
    include:{
        model: Activity,
        attributes:["name", "dificulty", "duration", "season"],
        through: {
            attributes: []
        }
    }
}) */
  return res.status(200).send(countriesId);
};

// const getApiInfo = async () => {
//   const apiUrl = await axios.get("https://restcountries.com/v3/all");
//   const apiInfo = await apiUrl.data.map((a) => {
//     return {
//       id: a.cca3,
//       name: a.name.common,
//       flag: a.flags ? a.flags[0] : a.flag,
//       region: a.region,
//       capital: a.capital ? a.capital[0] : "Capital does not exist",
//       subregion: a.subregion,
//       area: a.area,
//       population: a.population,
//     };
//   });

//   return apiInfo;
// };

// const countriesDB = async (req, res) => {
//   return await Country.findAll({ include: Activity });
// };
// //obtiene los paises y verifica si los pasan por query. Si pasan por query devuelve todas las countries que tengan ese name
// const getCountry = async (req, res) => {
//   const name = req.query.name;
//   let countryTotal = await countriesDB();

//   if (name) {
//     let countryName = await countryTotal.filter((c) =>
//       c.name.toLowerCase().includes(name.toLowerCase())
//     );

//     countryName.length
//       ? res.send(countryName)
//       : res.status(404).send("A country with that name is not found");
//   } else {
//     res.send(countryTotal);
//   }
// };

// const searchCountryById = async (req, res) => {
//   const { id } = req.params;
//   const countryTotal = await countriesDB();

//   if (id) {
//     let countryId = await countryTotal.filter(
//       (f) => f.id.toLowerCase() === id.toLowerCase()
//     );
//     countryId.length
//       ? res.json(countryId)
//       : res.send([{ message: "Country not found!" }]);
//   }
// };

// const deleteCountry = async (req, res) => {
//   const { id } = req.params;

//   Country.destroy({ where: { id } })
//     .then(() => {
//       return res.send({ status: "Country removed" });
//     })
//     .catch((err) => {
//       res.status(204).send({ status: err });
//     });
// };

module.exports = {
  getCountries,
  getCountryById,
};
