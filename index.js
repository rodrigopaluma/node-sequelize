const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const app = express();

// Configuração para pegar o body do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure the view engine to render handlebars.
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Home
app.get('/', (req, res)=>{
    res.render('home');
})

app.listen(3000);
