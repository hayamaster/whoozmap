import { Request, Response } from "express";

const ListItemModel = require("../models/ListItemModel");

async function test(req: Request, res: Response) {
  try {
    const list = await ListItemModel.find();

    return res.status(200).json({
      message: "List of items",
      data: list,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = test;
