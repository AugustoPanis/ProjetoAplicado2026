const Cliente = require('../models/clienteModels');
const crypto = require('crypto');

const create = async (data) => {
    const cliente = new Cliente(data);
    return await cliente.save();
};

const getAll = async () => {
    return await Cliente.find();
}

const getId = async (id) => {
    return await Cliente.findById(id);
}

const findByEmail = async (email) => {
    return await Cliente.findOne({ email });
}

const update = async (id, data) => {
    const cliente = await Cliente.findById(id);
    Object.assign(cliente, data);
    return await cliente.save();
};

const deleteCliente = async (id) => {
    return await Cliente.findByIdAndDelete(id);
};

module.exports = {
    create,
    getAll,
    getId,
    findByEmail,
    update,
    deleteCliente
};
