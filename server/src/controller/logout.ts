import { Request, Response } from "express";

async function logout(req: Request, res: Response) {
  try {
    const cookieOptions = {
      secure: true,
      httpOnly: true,
      sameSite: "none" as "none",
    };

    return res.status(200).cookie("token", "", cookieOptions).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = logout;
