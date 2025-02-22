import { Router } from "express";

const express = require("express");
const test = require("../controller/test");
const register = require("../controller/register");
const login = require("../controller/login");
const logout = require("../controller/logout");
const userDetails = require("../controller/userDetails");
const searchPlaceLocation = require("../controller/searchPlaceLocation");
const createMap = require("../controller/createMap");
const mapList = require("../controller/mapList");

const router: Router = express.Router();

router.get("/", test);
router.post("/register", register);
router.post("/login", login);
router.get("/user-details", userDetails);
router.post("/logout", logout);
router.get("/place-location", searchPlaceLocation);
router.post("/create-map", createMap);
router.get("/map-list", mapList);

module.exports = router;
