const conecteAoBancoDeDados = require('./conectaBanco');
const bcrypt = require('bcrypt');

async function cadastrarPlaca(login, chaveDeAcesso) {
    if(verificarEmailSemEspacos(login)){        
        try {
            var salt = bcrypt.genSaltSync(10)
            var chaveDeAcessoCrip = bcrypt.hashSync(chaveDeAcesso, salt)
        } catch (error) {
            console.log(error)
        }

        const collection = await conecteAoBancoDeDados("usuario");

        const json = { email: login, senha: chaveDeAcessoCrip};

        const result = await collection.insertOne(json);
        console.log(`Um novo usuário cadastrado com o ID: ${result.insertedId}`);

        // Fecha a conexão com o banco de dados
        const client = collection.s.db.client;
        client.close();
    } else{
        console.log("Email Inválido")
    }
}

function verificarEmailSemEspacos(login) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(login);
    //console.log(regex.test(login));
}

cadastrarPlaca("jonaswaters@blalabla.tal", "adjhfj743238jhgh37134").catch(console.error);
