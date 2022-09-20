const { Router } = require("express");
const { postActivity } = require("../logistic/Activity.js");
const router = Router();

router.post("/", postActivity);

module.exports = router;
