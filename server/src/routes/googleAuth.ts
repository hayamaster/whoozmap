import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const express = require("express");
const googleAuthCallback = require("../controller/googleAuthCallback");
const router: Router = express.Router();

// Passport 구글 전략 등록 (최초 1회만)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:3000/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// 구글 로그인 시작
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 구글 로그인 콜백
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleAuthCallback
);

module.exports = router;
