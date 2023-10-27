const conecteAoBancoDeDados = require('./conectaBanco');

async function cadastrarPlaca(numeracao, localidade) {
    if (numeracao.length > 7) {
        numeracao = numeracao.substring(0, 7);
    }

    const collection = await conecteAoBancoDeDados("placaVeiculo");

    const json = { placa: numeracao, cidade: localidade , cadastroMomento: obterDataEHoraFormatada()};

    const result = await collection.insertOne(json);
    console.log(`Uma nova placa inserida com o ID: ${result.insertedId}`);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close(); 
}

function obterDataEHoraFormatada() {
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toTimeString().split(' ')[0];
    const milissegundo = agora.getMilliseconds().toString().padStart(3, '0');

    return `${data} - ${hora}:${milissegundo}`;
}

cadastrarPlaca("RDF5896 - aikjhfduh", "Crato").catch(console.error);
