const connectToDatabase = require('./conectaBanco');

async function insertData() {
    const collection = await connectToDatabase();

    const obj = { login: "Joao", senha: "1234" };

    const result = await collection.insertOne(obj);
    console.log(`1 novo usuario inserido com o ID: ${result.insertedId}`);

    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close(); 
}

insertData().catch(console.error);
