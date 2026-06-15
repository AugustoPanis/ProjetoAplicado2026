const express = require("express");
const cors = require("cors"); 
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const clienteRoutes = require("./routes/clienteRoutes.js");

app.use("/clientes", clienteRoutes);

const authRoutes = require('./auth/auth.routes');
app.use('/auth', authRoutes);

module.exports = app;