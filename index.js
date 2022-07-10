const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');

const app = express();

// Configuração para pegar o body do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure the view engine to render handlebars.
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Rota Criar Usuário
app.get('/users/create', (req, res) => {
    res.render('adduser');
})

// Post para criar usuário
app.post ('/users/create', async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter == 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }
    
    await User.create({name, occupation, newsletter});
    res.redirect('/');
})

// Home
app.get('/', (req, res)=>{
    res.render('home');
})

conn.sync().then(()=>{
    app.listen(3000);
}).catch((err)=> console.log(err));
