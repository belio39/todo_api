import { v1 as uid } from "uuid";
import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import config from "../config/config";
import { Registerschema } from "../models/use-model";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const id = uid();
    const start = "start";
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
      .input("start", mssql.VarChar, start)
      .execute("insertTodo");
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getTodos: RequestHandler = async (req, res) => {
  try {
    let pool = await mssql.connect(config);
    const todos = await pool.request().execute("getTodos");
    res.status(200).json({
      status: "Success",
      data: todos.recordset,
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getTodo: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(config);
    const todo = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getTodo");
    if (!todo.recordset[0]) {
      return res.json({
        message: `No todo with ${id}`,
      });
    }
    res.status(200).json({
      message: "Success",
      data: todo.recordset,
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const updateTodo: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(config);
    const { title, description, date, start } = req.body as {
      title: string;
      description: string;
      date: string;
      start: string;
    };
    const todo = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getTodo");

    if (!todo.recordset[0]) {
      res.json({
        message: `No Todo with ${id}`,
      });
    }
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("description", mssql.VarChar, description)
      .input("date", mssql.VarChar, date)
      .input("start", mssql.VarChar, start)
      .execute("updateTodo");

    res.status(200).json({
      message: "Todo Successfully Updated",
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

export const deleteTodo = async (req: RequestExtended, res: Response) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(config);
    const todo = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getTodo");
    if (!todo.recordset[0]) {
      res.json({
        message: `No Todo ${id} exist!`,
      });
    }
    await pool.request().input("id", mssql.VarChar, id).execute("deleteTodo");

    res.status(200).json({
      status: "Successfully",
      message: "Todo successfully deteled",
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

// export const isComplete: RequestHandler<{ id: string }> = (req, res) => {
//   try {
//   } catch (error: any) {
//     res.json({ error: error.message });
//   }
// };
