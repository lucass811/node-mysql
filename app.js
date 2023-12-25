const express = require('express');

const { engine } = require('express-handlebars');

const mysql = require('mysql2');

const app = express();

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
    console.log(req.body);
    res.end();
});

app.listen(3000);