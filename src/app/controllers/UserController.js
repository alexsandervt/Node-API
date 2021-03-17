import * as Yup from "yup";
import bcrypt from "bcryptjs";
import User from "../models/User";

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { limit = 40 } = req.query;
    console.log(page);

    await User.paginate({}, { select: "_id name email", page, limit })
      .then((users) => {
        return res.json({
          error: false,
          users: users,
        });
      })
      .catch((erro) => {
        return res.status(400).json({
          erroor: true,
          code: 106,
          message: "Não foi possivel executar a solicitação",
        });
      });
  }

  async show(req, res) {
    User.findOne({ _id: req.params.id }, "_id name email createdAt updatedAt")
      .then((user) => {
        return res.json({
          error: false,
          user: user,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          erro: true,
          code: 107,
          message: "Não foi possivel executar a solicitação",
        });
      });
  }

  async store(req, res) {
    //Validação de email, senha e password com a dependencia do YUP
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        code: 103,
        message: "Erro: Dados inválidos!",
      });
    }
    // END -> Validação de email, senha e password com a dependencia do YUP
    const emailExiste = await User.findOne({ email: req.body.email });
    if (emailExiste) {
      return res.status(400).json({
        error: true,
        code: 102,
        message: "Error: Este e-mail já está cadastrado!",
      });
    }
    // Criptografar senha
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);

    const user = await User.create(dados, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 101,
          message: "Error: Não foi possível cadastrar usuário!",
        });
      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso!",
        dados: user,
      });
    });
  }

  //Excluindo usuario
  async delete(req, res) {
    const usuarioExiste = await User.findOne({ _id: req.params.id });

    if (!usuarioExiste) {
      return res.status(400).json({
        error: true,
        code: 121,
        message: "Usuario não encontrado",
      });
    }

    const user = await User.deleteOne({ _id: req.params.id }, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          code: 122,
          message: "Usuário não foi excluido",
        });
    });

    res.json({
      error: false,
      message: "Usuario excluido com sucesso",
    });
  }
}

export default new UserController();
