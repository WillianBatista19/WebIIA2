const connectToDatabase = require('./conectaBanco');

async function readData(filter) {
    const collection = await connectToDatabase();

    const cursor = collection.find(filter);

    const data = await cursor.toArray();
    console.log("Documentos encontrados:");
    console.log(data);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close();
}

const filter = { login: "Joao" }; // Filtre os documentos que deseja consultar

readData(filter).catch(console.error);
