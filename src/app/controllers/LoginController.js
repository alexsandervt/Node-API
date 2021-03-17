import bcrypt from "bcryptjs";
import User from "../models/User";

class LoginController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExiste = await User.findOne({ email: email });

    if (!userExiste) {
      return res.status(401).json({
        error: true,
        code: 110,
        message: "Usuário não encontrado",
      });
    }

    if (!(await bcrypt.compare(password, userExiste.password))) {
      return res.status(401).json({
        error: true,
        code: 111,
        message: "Senha inválida",
      });
    }
    return res.json({
      user: {
        id: userExiste._id,
        name: userExiste.name,
        email,
      },
    });
  }
}

export default new LoginController();
