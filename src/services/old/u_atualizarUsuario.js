const connectToDatabase = require('./conectaBanco');

async function updateData(filter, update) {
    const collection = await connectToDatabase();

    const result = await collection.updateOne(filter, { $set: update });
    console.log(`Documento atualizado: ${result.modifiedCount} documento(s) atualizado(s)`);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close();
}

const filter = { login: "Joao" }; // Filtre o documento que deseja atualizar
const update = { senha: "4321" }; // Os campos a serem atualizados

updateData(filter, update).catch(console.error);
