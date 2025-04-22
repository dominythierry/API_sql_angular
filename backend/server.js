const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routes/usuarios');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // para ler JSON no body
app.use('/', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
