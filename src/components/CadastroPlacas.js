import React, { useState } from 'react';
import axios from 'axios';
import './CadastroPlacas.css';

function CadastroPlacas() {
  const [nomeCidade, setNomeCidade] = useState('');
  const [imagem, setImagem] = useState(null);
  const [numeroPlaca, setNumeroPlaca] = useState('');
  const [horaCadastro, setHoraCadastro] = useState('');
  const apiKey = 'K89592927188957';

  const handleNomeCidadeChange = (event) => {
    setNomeCidade(event.target.value);
  };

  const handleImagemChange = (event) => {
    if (event.target.files.length > 0) {
      setImagem(event.target.files[0]);
    }
  };

  const reconhecerPlaca = async () => {
    const formData = new FormData();
    formData.append('file', imagem);
    formData.append('apikey', apiKey);

    try {
      const response = await axios.post('https://api.ocr.space/parse/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.ParsedResults && response.data.ParsedResults.length > 0) {
        const placa = response.data.ParsedResults[0].ParsedText;
        setNumeroPlaca(placa);

        const dataHoraAtual = new Date();
        const horaAtual = dataHoraAtual.toLocaleTimeString();
        setHoraCadastro(horaAtual);
      } else {
        alert('Não foi possível reconhecer a placa.');
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
    }
  };

  const cadastrarPlaca = async () => {

    const confirmacao = window.confirm('Placa cadastrada com sucesso! Deseja cadastrar outra placa?');

    if (confirmacao) {
      setNomeCidade('');
      setNumeroPlaca('');
      setHoraCadastro('');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Placas</h2>
      <div className="form-group">
        <label>Nome da Cidade:</label>
        <input type="text" value={nomeCidade} onChange={handleNomeCidadeChange} required className="input-text" />
      </div>
      <div className="form-group">
        <input type="file" accept="image/*" onChange={handleImagemChange} className="input-file" />
        <button onClick={reconhecerPlaca} className="button reconhecer-placa">Reconhecer Placa</button>
      </div>
      {numeroPlaca && (
        <div className="placa-info">
          <p>Nome da Cidade: {nomeCidade}</p>
          <p>Número da Placa: {numeroPlaca}</p>
          <p>Hora do Cadastro: {horaCadastro}</p>
          <button onClick={cadastrarPlaca} className="button cadastrar-placa">Cadastrar Placa</button>
        </div>
      )}
    </div>
  );
}

export default CadastroPlacas;
