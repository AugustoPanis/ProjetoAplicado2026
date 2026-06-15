const express = require('express');

const router = express.Router();

const {
  createClient
  , listarClientes
} = require('../controllers/clientController');

router.post('/', createClient);

router.get('/', listarClientes);


module.exports = router;