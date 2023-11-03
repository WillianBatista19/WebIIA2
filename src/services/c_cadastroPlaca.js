const conecteAoBancoDeDados = require('./conectaBanco');

/*async function cadastrarPlacaMDB(numeracao, localidade) {
    if (numeracao.length > 7) {
        numeracao = numeracao.slice(numeracao.length - 7);
    }

    const collection = await conecteAoBancoDeDados("placaVeiculo");

    const json = { placa: numeracao, cidade: localidade , cadastroMomento: obterDataEHoraFormatada()};

    const result = await collection.insertOne(json);
    console.log(`Uma nova placa inserida com o ID: ${result.insertedId}`);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close(); 

    return true;
}*/

async function cadastrarPlacaMDB(numeracao, localidade) {
    if (numeracao.length > 7) {
        numeracao = numeracao.slice(numeracao.length - 7);
    }

    const collection = await conecteAoBancoDeDados("placaVeiculo");

    const json = { placa: numeracao, cidade: localidade , cadastroMomento: obterDataEHoraFormatada()};

    const result = await collection.insertOne(json);
    console.log(`Uma nova placa inserida com o ID: ${result.insertedId}`);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close(); 

    return result.insertedId;
}

function obterDataEHoraFormatada() {
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toTimeString().split(' ')[0];
    const milissegundo = agora.getMilliseconds().toString().padStart(3, '0');

    return `${data} - ${hora}:${milissegundo}`;
}

module.exports = cadastrarPlacaMDB;

// module.exports = obterDataEHoraFormatada;

// export { cadastrarPlacaMDB }

// export { obterDataEHoraFormatada }

// cadastrarPlacaMDB("dasda aikjhfduh - OOO4213", "Jua").catch(console.error);
