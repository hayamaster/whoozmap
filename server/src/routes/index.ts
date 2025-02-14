import { Router } from "express";

const express = require("express");
const test = require("../controller/test");
const registerTest = require("../controller/registerTest");
const register = require("../controller/register");
const login = require("../controller/login");
const logout = require("../controller/logout");
const userDetails = require("../controller/userDetails");
const searchPlaceLocation = require("../controller/searchPlaceLocation");

const router: Router = express.Router();

router.get("/", test);
router.post("/", registerTest);
router.post("/register", register);
router.post("/login", login);
router.get("/user-details", userDetails);
router.post("/logout", logout);
router.get("/place-location/:searchPlace/:lat/:lng", searchPlaceLocation);

module.exports = router;
