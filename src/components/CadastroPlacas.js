import React, { useState } from 'react';
import axios from 'axios';
import './CadastroPlacas.css';
//import { cadastrarPlacaMDB } from './cadastroDePlaca';
import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-react-native-sdk';

const APP_ID = '16baa416-617f-406f-9143-6b2070a25b53'; // Substitua pelo ID da sua aplicação

// Configuração da aplicação Stitch
const client = Stitch.initializeDefaultAppClient(APP_ID);

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

  /*
  const cadastrarPlaca = async () => {
    console.log("Teste")

    //const confirmacao = window.confirm('Placa cadastrada com sucesso! Deseja cadastrar outra placa?');

    //if (confirmacao) {
    //  setNomeCidade('');
    //  setNumeroPlaca('');
      setHoraCadastro('');
    //}
    
  };
  */
  
  async function connectToMongoDB() {
    try {
        await client.auth.loginWithCredential(new AnonymousCredential());
        console.log(`Logged in as user: ${client.auth.user.id}`);
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        const db = mongoClient.db('Cluster0'); // Substitua pelo nome do seu banco de dados
        return db;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
}

async function cadastrarPlacaMDB(numeracao, localidade) {
  const db = await connectToMongoDB(); // Conecte ao banco de dados

  try {
  // Observe que a função `connectToMongoDB` já cuida da autenticação e conexão

  // Verifique o tamanho da numeracao e ajuste conforme necessário
  if (numeracao.length > 7) {
      numeracao = numeracao.slice(numeracao.length - 7);
  }

  // Crie o objeto JSON a ser inserido
  const json = {
      placa: numeracao,
      cidade: localidade,
      cadastroMomento: new Date(), // Substitua pela função que obtém data e hora formatada
  };

  // Insira o documento na coleção
  const result = await db.collection('placaVeiculo').insertOne(json);
  console.log(`Uma nova placa inserida com o ID: ${result.insertedId}`);

  } catch (error) {
  console.error('Erro ao cadastrar a placa:', error);
  }
}

/*
function obterDataEHoraFormatada() {
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toTimeString().split(' ')[0];
    const milissegundo = agora.getMilliseconds().toString().padStart(3, '0');

    return `${data} - ${hora}:${milissegundo}`;
}
*/

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
          <button onClick={cadastrarPlacaMDB(numeroPlaca, nomeCidade)} className="button cadastrar-placa">Cadastrar Placa</button>
        </div>
      )}
    </div>
  );
}

export default CadastroPlacas;
