import { Router } from "express";
import mongoose from "mongoose";
import User from "./app/models/User";
import UserControler from "./app/controllers/UserController";

const routes = new Router();

routes.post("/users", UserControler.store);

routes.get("/", async (req, res) => {
  // await User.create(
  //   {
  //     name: "Telles6",
  //     email: "alex@telles.dev.br",
  //     password: "123456",
  //   },
  //   function (err, small) {
  //     if (err)
  //       return res.status(400).json({ error: "Erro: Ao cadastrar usuário!" });
  //     return res.status(200).json({ error: "usuario cadastrado com sucesso!" });
  //   }
  // );
});
routes.get("/contato", (req, res) => {
  res.send("Contato");
});

export default routes;
