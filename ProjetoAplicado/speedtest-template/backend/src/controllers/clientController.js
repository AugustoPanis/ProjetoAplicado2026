  const Client = require('../models/Client');

  const createClient = async (req, res) => {
    try {
      const { name, email, cpf } = req.body;

      const client = await Client.create({
        name,
        email,
        cpf
      });

      res.status(201).json(client);

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  };

  const listarClientes = async (req, res) => {
  try {
    const clients = await Client.find();

    res.json(clients);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }

};

  module.exports = {
    createClient,
    listarClientes
  };