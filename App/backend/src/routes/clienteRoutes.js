const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getId);
router.post('/', clienteController.criar);
router.post('/:id/testar', clienteController.testarConexao);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.deletarCliente);


module.exports = router;