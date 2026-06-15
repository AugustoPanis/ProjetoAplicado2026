const clienteService = require("../services/clienteService");

const getAll = async (req, res) => {
    try {
        const clientes = await clienteService.getAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getId = async (req, res) => {
    try {
        const cliente = await clienteService.getId(req.params.id);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const criar = async (req, res) => {
    try {
        const cliente = await clienteService.criar(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const cliente = await clienteService.update(req.params.id, req.body);
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletarCliente = async (req, res) => {
    try {
        const cliente = await clienteService.deletarCliente(req.params.id);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const testarConexao = async (req, res) => {
    try {
        const cliente = await clienteService.testarConexao(req.params.id);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getId,
    criar,
    update,
    deletarCliente,
    testarConexao
};