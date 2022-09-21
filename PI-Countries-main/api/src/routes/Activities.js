const { Router } = require("express");
const { postActivity } = require("../logistic/Activity.controller.js");
const router = Router();

router.post("/", postActivity);

module.exports = router;
