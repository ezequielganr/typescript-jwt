import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

const app: Application = express();

const port: number = 8000;

dotenv.config();

app.use(express.json());

app.use(cors());
app.use(helmet());

import routes from "./src/routes";

app.use(routes);

app.listen(port);