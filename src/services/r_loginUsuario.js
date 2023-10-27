const conecteAoBancoDeDados = require('./conectaBanco');
const bcrypt = require('bcrypt');

async function pesquisaPlacaPorCidade(usuarioCredencialEmail, usuarioCredencialSenha) {
    const collection = await conecteAoBancoDeDados("usuario");

    const cursor = collection.find(usuarioCredencialEmail);

    const data = await cursor.toArray();
    if (data.length > 0) {
        // Resultado não está vazio
        //console.log('A consulta retornou documentos.');
        //console.log("Documentos encontrados:");
        //console.log(data);
        data.forEach(usuario => {
            if (usuario.email === usuarioCredencialEmail.email) {
                const resultado = bcrypt.compareSync(usuarioCredencialSenha.senha, usuario.senha)
                if (resultado) {
                    console.log("Email e Senha CORRETOS")
                } else {
                    console.log("Senha INCORRETA")
                }
            }
            else{
                console.log("Email INEXISTENTE na base de dados");
            }
        });
        
    } else {
        // Resultado está vazio
        console.log('Email INEXISTENTE na base de dados');
    }
    
    // Fecha a conexão com o banco de dados
    const client = collection.s.db.client;
    client.close();
}

const usuarioCredencialEmail = { email: "davidwaters@blalabla.tal"};
const usuarioCredencialSenha = { senha:"adjhfj743238jhgh37134"};

pesquisaPlacaPorCidade(usuarioCredencialEmail, usuarioCredencialSenha).catch(console.error);
