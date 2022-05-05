"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const use_model_1 = require("../models/use-model");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v1)();
        const start = "start";
        const { title, description, date } = req.body;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { error } = use_model_1.Registerschema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("title", mssql_1.default.VarChar, title)
            .input("description", mssql_1.default.VarChar, description)
            .input("date", mssql_1.default.VarChar, date)
            .input("start", mssql_1.default.VarChar, start)
            .execute("insertTodo");
        res.status(200).json({
            message: "User Created Successfully",
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const todos = yield pool.request().execute("getTodos");
        res.status(200).json({
            status: "Success",
            data: todos.recordset,
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getTodos = getTodos;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const todo = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
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
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getTodo = getTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { title, description, date, start } = req.body;
        const todo = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getTodo");
        if (!todo.recordset[0]) {
            res.json({
                message: `No Todo with ${id}`,
            });
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("title", mssql_1.default.VarChar, title)
            .input("description", mssql_1.default.VarChar, description)
            .input("date", mssql_1.default.VarChar, date)
            .input("start", mssql_1.default.VarChar, start)
            .execute("updateTodo");
        res.status(200).json({
            message: "Todo Successfully Updated",
        });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const todo = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getTodo");
        if (!todo.recordset[0]) {
            res.json({
                message: `No Todo ${id} exist!`,
            });
        }
        yield pool.request().input("id", mssql_1.default.VarChar, id).execute("deleteTodo");
        res.status(200).json({
            status: "Successfully",
            message: "Todo successfully deteled",
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteTodo = deleteTodo;
// export const isComplete: RequestHandler<{ id: string }> = (req, res) => {
//   try {
//   } catch (error: any) {
//     res.json({ error: error.message });
//   }
// };
