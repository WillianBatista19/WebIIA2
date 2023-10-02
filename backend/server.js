const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb://willianmoreira200019:TOyl8r5UsXoOWcre@localhost:27017/placas';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const PlacaSchema = new mongoose.Schema({
  nomeCidade: String,
  numeroPlaca: String,
  horaCadastro: String,
});

const Placa = mongoose.model('Placa', PlacaSchema);

app.post('/cadastroPlaca', async (req, res) => {
  try {
    const { nomeCidade, numeroPlaca, horaCadastro } = req.body;

    const placa = new Placa({ nomeCidade, numeroPlaca, horaCadastro });
    await placa.save();

    res.status(200).json({ message: 'Placa cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar placa:', error);
    res.status(500).json({ error: 'Erro ao cadastrar placa' });
  }
});

const port = process.env.PORT || 27017;
app.listen(port, () => {
  console.log(`Servidor está executando na porta ${port}`);
});
