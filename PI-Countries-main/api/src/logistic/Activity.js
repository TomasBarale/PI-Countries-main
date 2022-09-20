const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

// //trae la infocde la base de datos
// const activityDB = async (req, res) => {
//   return await Activity.findAll({ include: Country });
// };
// //obtiene los paises y verifica si los pasan por query. Si pasan por query devuelve todas las countries que tengan ese name
// const getActivity = async (req, res) => {
//   const { name } = req.query;
//   let activityTotal = await activityDB();

//   if (name) {
//     let activityName = await activityTotal.filter((f) =>
//       f.name.toLowerCase().includes(name.toLowerCase())
//     );

//     activityName.length
//       ? res.send(activityName)
//       : res.status(404).send("An activity with that name is not found");
//   } else {
//     res.send(activityTotal);
//   }
// };

// const searchActivity = async (req, res) => {
//   const { id } = req.params;
//   const activityTotal = await activityDB();

//   if (id) {
//     let activityId = await activityTotal.filter((f) => f.id == id);
//     activityId.length
//       ? res.json(activityId)
//       : res.status(404).send([{ message: "Activity not found" }]);
//   }
// };

// const deleteActivity = async (req, res) => {
//   const { id } = req.params;

//   Activity.destroy({ where: { id } })
//     .then(() => {
//       return res.send({ status: "Activity removed" });
//     })
//     .catch((err) => {
//       res.status(204).send({ status: err });
//     });
// };

const postActivity = async (req, res, next) => {
  const { name, dificulty, duration, season, countriesName } = req.body;
  try {
    if (name && dificulty && duration && season && countriesName) {
      const activity = {
        name,
        dificulty,
        season,
        duration,
      };
      let createdActivity = await Activity.create(activity);
      let infoCountriesId = await Country.findAll({
        where: {
          name: {
            [Op.in]: countriesName,
          },
        },
      });
      infoCountriesId?.map((m) => m.addActivity(createdActivity));

      if (createdActivity)
        res.json({
          message: "Successfully created activity",
          data: createdActivity,
        });
      else res.json({ message: "Error, missing data" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postActivity,
};
