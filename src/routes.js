import { Router } from "express";
import mongoose from "mongoose";
import User from "./app/models/User";
import UserControler from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";

const routes = new Router();

routes.post("/users", UserControler.store);
routes.post("/login", LoginController.store);

export default routes;
