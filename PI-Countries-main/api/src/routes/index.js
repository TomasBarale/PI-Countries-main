const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const Activities = require("./Activity.js");
const Countries = require("./Country.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", Countries);
router.use("/activities", Activities);

module.exports = router;
