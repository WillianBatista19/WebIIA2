const connectToDatabase = require('./conectaBanco');

async function deleteData(filter) {
    const collection = await connectToDatabase();

    const result = await collection.deleteOne(filter);
    console.log(`Documento excluído: ${result.deletedCount} documento(s) excluído(s)`);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close();
}

const filter = { login: "Curso de node" }; // Filtre o documento que deseja excluir

deleteData(filter).catch(console.error);
