import { Router } from "express";

const express = require("express");
const test = require("../controller/test");
const registerTest = require("../controller/registerTest");
const register = require("../controller/register");
const login = require("../controller/login");

const router: Router = express.Router();

router.get("/", test);
router.post("/", registerTest);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
