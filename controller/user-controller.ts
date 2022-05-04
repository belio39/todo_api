import { v1 as uid } from "uuid";
import { Request, Response } from "express";
import mssql from "mssql";
import config from "../config/config";
import { Registerschema } from "../models/use-model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const id = uid();
    const { title, description, date } = req.body as {
      title: string;
      description: string;
      date: string;
    };

    let pool = await mssql.connect(config);
    const { error } = Registerschema.validate(req.body);
    if (error) {
      return res.json({ error: error.details[0].message });
    }

    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("description", mssql.VarChar, description)
      .input("date", mssql.VarChar, date)
      .execute("insertUser");
    res.status(200).json({ message: "User Created Successfully" });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};
