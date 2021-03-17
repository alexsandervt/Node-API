import { Router } from "express";
import mongoose from "mongoose";
import User from "./app/models/User";
import UserControler from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.get("/users", UserControler.index);
routes.get("/users/:id", UserControler.show);
routes.post("/users", UserControler.store);
routes.delete("/users/:id", authMiddleware, UserControler.delete);
routes.post("/login", LoginController.store);

export default routes;
