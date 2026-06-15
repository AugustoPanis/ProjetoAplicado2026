const authService = require('../auth/auth.service');

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const token = await authService.login(email, senha);

        res.status(200).json({ token });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { login };