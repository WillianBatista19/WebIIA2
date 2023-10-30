const conecteAoBancoDeDados = require('./conectaBanco');

async function pesquisaPlacaPorCidade(cidadeDesejada) {
    const collection = await conecteAoBancoDeDados("placaVeiculo");

    const cursor = collection.find(cidadeDesejada);

    const data = await cursor.toArray();
    if (data.length > 0) {
        // Resultado não está vazio
        console.log('A consulta retornou documentos.');
        console.log("Documentos encontrados:");
        console.log(data);
    } else {
        // Resultado está vazio
        console.log('A consulta não retornou documentos.');
    }
    
    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close();
}

async function pesquisaPlacaPorNumero(placaDesejada) {
    const collection = await conecteAoBancoDeDados("placaVeiculo");

    const cursor = collection.find(placaDesejada);

    const data = await cursor.toArray();
    if (data.length > 0) {
        // Resultado não está vazio
        console.log('A consulta retornou documentos.');
        console.log("Documentos encontrados:");
        console.log(data);
    } else {
        // Resultado está vazio
        console.log('A consulta não retornou documentos.');
    }
    
    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close();
}

//const cidadeDesejada = { cidade: "Crato" };
const placaDesejada = { placa: "PQP4213" }; // Filtre os documentos que deseja consultar

//pesquisaPlacaPorCidade(cidadeDesejada).catch(console.error);
pesquisaPlacaPorNumero(placaDesejada).catch(console.error);
