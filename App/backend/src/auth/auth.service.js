const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (email, senha) => {

    
    if (email !== process.env.ADMIN_EMAIL) {
        throw new Error('Credenciais inválidas');
    }

    
    const senhaValida = await bcrypt.compare(senha, process.env.ADMIN_SENHA);
    if (!senhaValida) {
        throw new Error('senha inválidas');
    }

    
    const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return token;
};

module.exports = { login };