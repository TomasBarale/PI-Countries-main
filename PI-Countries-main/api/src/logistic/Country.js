const { Country, Activity } = require("../db");
//trae la infocde la base de datos
const countriesDB = async (req, res) => {
  return await Country.findAll({ include: Activity });
};
//obtiene los paises y verifica si los pasan por query. Si pasan por query devuelve todas las countries que tengan ese name
const getCountry = async (req, res, next) => {
  const name = req.query.name;
  let countryTotal = await countriesDB();

  if (name) {
    let countryName = await countryTotal.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );

    countryName.length
      ? res.send(countryName)
      : res.status(404).send("A country with that name is not found");
  } else {
    res.send(countryTotal);
  }
};

const searchCountry = async (req, res, next) => {
  const { id } = req.params;
  const countryTotal = await countriesDB();

  if (id) {
    let countryId = await countryTotal.filter((f) => f.id == id);
    countryId.length
      ? res.json(countryId)
      : res.send([{ message: "Country not found!" }]);
  }
};

const deleteCountry = async (req, res) => {
  const { id } = req.params;

  Country.destroy({ where: { id } })
    .then(() => {
      return res.send({ status: "Country removed" });
    })
    .catch((err) => {
      res.status(204).send({ status: err });
    });
};
