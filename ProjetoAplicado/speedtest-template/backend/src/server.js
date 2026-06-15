require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');

const clientRoutes = require('./routes/clientRoutes');

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({
    message: 'API online'
  });
});

app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});