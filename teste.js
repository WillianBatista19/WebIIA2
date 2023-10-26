const express = require('express');
const tesseract = require('tesseract.js');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.post('/identificarPlaca', async (req, res) => {
try {
    if (!req.body.imageBase64) {
    return res.status(400).json({ error: 'Imagem da placa não fornecida' });
    }

    // Decodificar a imagem em base64 e salvar como arquivo temporário
    const imageBuffer = Buffer.from(req.body.imageBase64, 'base64');
    await fs.writeFile('temp.png', imageBuffer);

    // Processar a imagem com o Tesseract.js
    const { data } = await tesseract.recognize('temp.png', 'eng');

    // Exibir os caracteres reconhecidos
    return res.status(200).json({ characters: data.text });
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
}
});

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);
});
