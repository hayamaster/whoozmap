import { Router } from "express";

const express = require("express");
const test = require("../controller/test");
const registerTest = require("../controller/registerTest");

const router: Router = express.Router();

router.get("/", test);
router.post("/", registerTest);

module.exports = router;
