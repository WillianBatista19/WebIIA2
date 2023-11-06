import { connectToMongoDB } from './conectaAoBanco'; // Importe a função de configuração do banco

export async function cadastrarPlacaMDB(numeracao, localidade) {
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
