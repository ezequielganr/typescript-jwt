import { Router } from "express";

const routes = Router();

import users from "./users";

routes.use("/api", users);

export default routes;
