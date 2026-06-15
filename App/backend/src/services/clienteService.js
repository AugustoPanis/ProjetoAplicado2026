const clienteRepository = require('../repositories/ClienteRepository');

const crypto = require('crypto');

const validateEmailCriacao = async (email) => {
    const emailExistente = await clienteRepository.findByEmail(email);

    if (emailExistente) {
        throw new Error("E-mail já cadastrado");
    }
}

const validateEmailAtualizacao = async (email, id) => {
    const emailExistente = await clienteRepository.findByEmail(email);

    if (emailExistente && emailExistente._id.toString() !== id) {
        throw new Error("E-mail já cadastrado");
    }
}

const validaCliente = async (id) => {
    const cliente = await clienteRepository.getId(id);

    if (!cliente) {
        throw new Error("Cliente não encontrado");
    }

    return cliente;
}

const criar = async (dados) => {

    await validateEmailCriacao(dados.email);

    const tokenApp = crypto.randomUUID();

    const cliente = await clienteRepository.create({ ...dados, tokenApp });

    return cliente;
};

const getAll = async () => {
    return await clienteRepository.getAll();
}

const getId = async (id) => {
    return await clienteRepository.getId(id);
} 

const update = async (id, dados) => {
    await validaCliente(id);

    if (dados.email) {
        await validateEmailAtualizacao(dados.email, id);
    }
    return await clienteRepository.update(id, dados);
};

const deletarCliente = async (id) => {
    await validaCliente(id);
    return await clienteRepository.deleteCliente(id);
};

const testarConexao = async (id) => {
    const cliente = await validaCliente(id);

    const enviado = enviarMensagem(cliente.tokenApp, {
        tipo: 'teste',
        mensagem: 'Conexão testada pelo admin!'
    });

    if (!enviado) {
        throw new Error('App offline ou não conectado');
    }

    return { sucesso: true, mensagem: 'Mensagem enviada para o app!' };
};

module.exports = {
    criar,
    getAll,
    getId,
    update,
    deletarCliente,
    testarConexao
};