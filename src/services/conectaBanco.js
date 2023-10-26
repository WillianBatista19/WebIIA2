/*  
    npm update
    npm install mongodb
*/
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://davidwaters503:5gHPskLgrhrutY1S@cluster0.3futgrs.mongodb.net/";

const client = new MongoClient(uri);

async function connectToDatabase() {
    await client.connect();
    console.log("Conectado ao MongoDB");

    const db = client.db("EngII");
    const collection = db.collection("usuario");

    return collection;
}

module.exports = connectToDatabase;
