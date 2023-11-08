/*  
    npm update
    npm install mongodb
*/
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://davidwaters503:5gHPskLgrhrutY1S@cluster0.3futgrs.mongodb.net/";

const client = new MongoClient(uri);

async function conecteAoBancoDeDados(tabela) {
    await client.connect();
    console.log("Conectado ao MongoDB");
    console.log(tabela)

    const db = client.db("WebII");
    const collection = db.collection(tabela);

    return collection;
}

module.exports = conecteAoBancoDeDados;
