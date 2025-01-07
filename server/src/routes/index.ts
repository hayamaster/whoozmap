const express = require("express");
const test = require("../controller/test");

const router = express.Router();

router.get("/", test);

module.exports = router;
