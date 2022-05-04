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
exports.createUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const use_model_1 = require("../models/use-model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v1)();
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
            .execute("insertUser");
        res.status(200).json({ message: "User Created Successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createUser = createUser;
