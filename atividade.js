//DEFININDO E INSTANCIANDO EXPRESS
const express = require("express")
const app = express();
const port = 3000
const PDFDocument = require('pdfkit');

//CONEXÃO COM BANCO DE DADOS
/*
const Sequelize = require('sequelize')
const sequelize = new Sequelize('atividade', 'root', '159357', {
    host: "localhost",
    dialect: 'mysql'
})

//AUTENTICAÇÃO DE CONEXÃO COM O BANCO
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!")
}).catch(function(erro){
    console.log("Falha ao conectar: "+erro)
})
*/

app.get('/', function(req, res){
    res.send('Show de bola!!!')
})

//ROTA PARA RETORNAR PDF

app.get('/relatorio/cidade/:cidade', function(req, res, next){
    const doc = new PDFDocument({});
    const name = "Teste"
    const content = "Teste de PDF"
    const placa = "HQP8975"
    const cidade = req.params.cidade
    const cidadeBD = "Crato"
    const data = "26/09/2023"
    const hora = "08:00"
    
    if(cidade == cidadeBD){
        res.setHeader("Content-disposition", 'attachment; filename="' + name +".pdf" + '"')
        res.setHeader("Content-type", "application/pdf")

        doc.text("Placa: " + placa + " Cidade: " + cidadeBD + ", Data cadastro: " + data + ", Hora Cadastro: " + hora + "\n")
        doc.text("Placa: " + placa + " Cidade: " + cidadeBD + ", Data cadastro: " + data + ", Hora Cadastro: " + hora + "\n")
        doc.pipe(res)
        doc.end()
    }else{
        res.send("Cidade não consta no banco de dados");
    }
    
})


//ROTA PARA CONFERIR A PLACA
app.get('/consulta/:placa', function(req, res){
    const placa = req.params.placa
    const placaBD = "HWR7845"
    
    if(placa == placaBD){
        res.send("Placa no banco: " + placa);
    }else{
        res.send("Placa não encontrada");
    }
})

//INICIALIZAR BANCO PELA PORTA
app.listen(port, function(){
    console.log("Servidor rodando")
})