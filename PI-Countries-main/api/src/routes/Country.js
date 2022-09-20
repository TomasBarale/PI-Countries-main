const { Router } = require("express");
const router = Router();
const axios = require("axios");

//importamos las funciones del controlador
const { getCountries, getCountryById } = require("../logistic/Country");

router.get("/", getCountries);

router.get("/:id", getCountryById);

module.exports = router;
