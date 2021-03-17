import mongoose from "mongoose";

class DataBase {
  constructor() {
    this.mongoDataBase();
  }
  mongoDataBase() {
    mongoose
      .connect(
        "mongodb+srv://avtelles:FyN0wuPuOcrABPZm@cluster0.w7jpn.mongodb.net/bdtelles?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }
      )
      .then(() => {
        console.log("Conexão com Mongodb Realizada com sucesso!");
      })
      .catch((erro) => {
        console.log("Erro ao conectar ao servidor!" + erro);
      });
  }
}
export default new DataBase();
