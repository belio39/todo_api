import { v1 as uid } from "uuid";
import { Request, RequestHandler, Response } from "express";
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
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    const users = await pool.request().execute("getUsers");
    res.status(200).json({
      status: "Success",
      data: users.recordset,
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getSingleUser: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(config);
    const user = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getSingleUser");
    if (!user.recordset[0]) {
      return res.json({
        message: `No user with ${id}`,
      });
    }
    res.status(200).json({
      message: "Success",
      data: user.recordset,
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const updateUser: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(config);
    const { title, description, date } = req.body as {
      title: string;
      description: string;
      date: string;
    };
    const user = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getSingleUser");

    if (!user.recordset[0]) {
      res.json({
        message: `No user with ${id}`,
      });
    }
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("description", mssql.VarChar, description)
      .input("date", mssql.VarChar, date)
      .execute("updateUser");

    res.status(200).json({
      message: "User Successfully Updated",
    });
  } catch (error: any) {
    res.json({
      error: error.message,
    });
  }
};

interface RequestExtended extends Request {
  users?: any;
}

export const deleteUser = async (req: RequestExtended, res: Response) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(config);
    const user = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getSingleUser");
    if (!user.recordset[0]) {
      res.json({
        message: `No user ${id} exist!`,
      });
    }
    await pool.request().input("id", mssql.VarChar, id).execute("deleteUser");

    res.status(200).json({
      status: "Successfully",
      message: "User successfully deteled",
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};
