// =====================
// CRIAR USUÁRIO DE TESTE AUTOMATICAMENTE
// =====================
(async () => {
    try {
        const existe = await db.usuarios.findOne({ where: { email: "teste@teste.com" } });

        if (!existe) {
            await db.usuarios.create({
                nome: "Usuário Teste",
                email: "teste@teste.com",
                senha: "123" // depois use bcrypt
            });

            console.log("Usuário de teste criado:");
            console.log("Email: teste@teste.com");
            console.log("Senha: 123");
        }
    } catch (erro) {
        console.error("Erro ao criar usuário de teste:", erro);
    }
})();


// =====================
// ROTA DE LOGIN
// =====================
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Verifica campos
        if (!email || !senha) {
            return res.status(400).json({ error: "Preencha todos os campos!" });
        }

        // 2. Busca usuário no banco
        const usuario = await db.usuarios.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        // 3. Confere senha (plaintext - troque para bcrypt depois)
        if (senha !== usuario.senha) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        // 4. Gera token
        const token = gerarToken(usuario.id);

        // 5. Envia resposta
        return res.status(200).json({
            sucesso: true,
            token: token
        });

    } catch (erro) {
        console.error("Erro no login:", erro);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
});
