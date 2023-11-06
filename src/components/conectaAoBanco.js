import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-react-native-sdk';

const APP_ID = '16baa416-617f-406f-9143-6b2070a25b53'; // Substitua pelo ID da sua aplicação

// Configuração da aplicação Stitch
const client = Stitch.initializeDefaultAppClient(APP_ID);

// Função para conectar ao banco de dados
export async function connectToMongoDB() {
    try {
        await client.auth.loginWithCredential(new AnonymousCredential());
        console.log(`Logged in as user: ${client.auth.user.id}`);
        const mongoClient = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        const db = mongoClient.db('Cluster0'); // Substitua pelo nome do seu banco de dados
        return db;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
}
