const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

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
      let infoCountriesName = await Country.findAll({
        where: {
          name: {
            [Op.in]: countriesName,
          },
        },
      });
      infoCountriesName?.map((m) => m.addActivity(createdActivity));

      if (createdActivity)
        res.json({
          message: "Successfully created activity",
          data: createdActivity,
        });
      else
        res.json({
          message: "Error not all corresponding data was obtained",
        });
    }
  } catch (error) {
    next(error);
  }
};

// const deleteActivity = async (req, res) => {
//   const { id } = req.params;
//   try {
//     let act = await Activity.destroy({ where: { id: id } });
//     return res.status(200).send("Activity deleted successfully!");
//   } catch (error) {
//     return res.status(404).send(error);
//   }
// };

module.exports = {
  postActivity,
};
