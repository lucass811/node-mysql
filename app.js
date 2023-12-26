const express = require('express');

const { engine } = require('express-handlebars');

// MODULO FILE UPLOAD
const  fileupload = require('express-fileupload');

const mysql = require('mysql2');

const app = express();

// HABILITANDO O UPLOAD DE ARQUIVOS
app.use(fileupload());

// BOOTSTRAP
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
// CSS
app.use('/css', express.static('./css'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// MANIPULAÇÃO DE DADOS VIA ROTA
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'projeto2'

});

con.connect((erro) => {
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso');
});

app.get('/', (req, res) => {
    res.render('formulario')
});

//ROTA DE CADASTRO
app.post('/cadastrar', (req, res) => {
    let nome = req.body.nome;
    let valor = req.body.valor;
    let imagem = req.files.imagem.name;

    let sql = `INSERT INTO produtos (nome, valor, imagem) VALUES ('${nome}', ${valor}, '${imagem}')`;

    con.query(sql, (erro, retorno) => {
        if(erro) throw erro;

        req.files.imagem.mv(__dirname+'/images/'+req.files.imagem.name);
        console.log(retorno);
    });

    // RETORNAR PARA A ROTA PRINCIPAL
    res.redirect('/');
   
});

app.listen(3000);   