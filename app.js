const express = require('express');

const { engine } = require('express-handlebars')

const mysql = require('mysql2');

const app = express();

// BOOTSTRAP
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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

app.listen(3000);