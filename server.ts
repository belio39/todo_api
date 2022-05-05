import express from "express";
import config from "./config/config";
import mssql from "mssql";
import router from "./routes/user-route";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const connection = async () => {
  try {
    const conn = await mssql.connect(config);
    if (conn.connected) {
      console.log("Connected to DB");
    }
  } catch (error: any) {
    console.log(error.messages);
  }
};
connection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
