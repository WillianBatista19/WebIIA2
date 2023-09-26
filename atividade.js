//DEFININDO E INSTANCIANDO EXPRESS
const express = require("express")
const app = express();
const port = 3000
const PDFDocument = require('pdfkit');

//CONEXÃO COM BANCO DE DADOS
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


app.get('/', function(req, res){
    res.send('Show de bola!!!')
})

//ROTA PARA RETORNAR PDF

app.post('/relatorio/cidade', function(req, res, next){
    const doc = new PDFDocument({});
    const name = "Teste"
    const content = "Teste de PDF"
    
    res.setHeader("Content-disposition", 'attachment; filename="' + name +".pdf" + '"')

    res.setHeader("Content-type", "application/pdf")

    doc.pipe(res)
    doc.end()
})


//ROTA PARA CONFERIR A PLACA
app.get('/consulta/:placa', function(req, res){
    const placa = req.params.placa

    if(placa == placaBD){
        return "Placa no banco" + placa;
    }else{
        return "Placa não encontrada";
    }
})

//INICIALIZAR BANCO PELA PORTA
app.listen(port, function(){
    console.log("Servidor rodando")
})