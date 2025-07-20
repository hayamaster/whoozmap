import { Router } from "express";

const express = require("express");
const register = require("../controller/register");
const login = require("../controller/login");
const logout = require("../controller/logout");
const userDetails = require("../controller/userDetails");
const searchPlaceLocation = require("../controller/searchPlaceLocation");
const createMap = require("../controller/createMap");
const mapList = require("../controller/mapList");
const mapDetail = require("../controller/mapDetail");
const deleteMap = require("../controller/deleteMap");

// 구글 OAuth2 라우트 import
const googleAuthRouter = require("./googleAuth");

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-details", userDetails);
router.post("/logout", logout);
router.get("/place-location", searchPlaceLocation);
router.post("/create-map", createMap);
router.get("/map-list", mapList);
router.get("/map-detail", mapDetail);
router.delete("/delete-map", deleteMap);

// 구글 OAuth2 라우트 연결
router.use("/auth", googleAuthRouter);

module.exports = router;
