import { Router } from "express";

const express = require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const googleLogin = require("../controller/googleLogin");
const logout = require("../controller/logout");
const userDetails = require("../controller/userDetails");
const searchPlaceLocation = require("../controller/searchPlaceLocation");
const createMap = require("../controller/createMap");
const mapList = require("../controller/mapList");
const mapDetail = require("../controller/mapDetail");

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/user-details", userDetails);
router.post("/logout", logout);
router.get("/place-location", searchPlaceLocation);
router.post("/create-map", createMap);
router.get("/map-list", mapList);
router.get("/map-detail", mapDetail);

module.exports = router;
