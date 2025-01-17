import { Router } from "express";

const express = require("express");
const test = require("../controller/test");
const registerTest = require("../controller/registerTest");
const registerUser = require("../controller/registerUser");

const router: Router = express.Router();

router.get("/", test);
router.post("/", registerTest);
router.post("/register", registerUser);

module.exports = router;
