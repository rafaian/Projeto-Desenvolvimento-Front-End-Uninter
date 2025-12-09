const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Usuário de teste
const usuarioTeste = {
    email: "teste@teste.com",
    senha: "123456"
};

// Rota de login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (email === usuarioTeste.email && senha === usuarioTeste.senha) {
        return res.json({
            message: "Login realizado com sucesso!",
            token: "token-falso-para-teste"
        });
    }

    return res.status(401).json({ error: "Credenciais inválidas!" });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
