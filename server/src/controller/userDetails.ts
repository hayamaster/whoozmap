import { Request, Response } from "express";

const getUserDetailsFromToken = require("../utils/getUserDetailsFromToken");

async function userDetails(req: Request, res: Response) {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided from cookie", error: true });
    }

    const user = await getUserDetailsFromToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token", error: true });
    }

    return res.status(200).json({
      message: "User details",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = userDetails;
