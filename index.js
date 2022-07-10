const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');
const Address = require('./models/Address');

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

// Rota Listar Usuário
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({raw: true, where: {id: id}});
    res.render('userview', {user});
})

// Deletar Usuário
app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;
    await User.destroy({where: {id: id}});
    res.redirect('/');
})

// Rota editar usuário
app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({include: Address, where: {id: id}});
    res.render('useredit', {user: user.get({plain: true})});
})

// Update de Usuário
app.post('/users/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter == 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.update({name, occupation, newsletter}, {where: {id: id}});
    res.redirect('/');
})

// Criar Endereço
app.post('/address/create', async (req, res) => {

    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;

    const address = {
        UserId,
        street,
        number,
        city
    }

    await Address.create(address);
    res.redirect(`/users/edit/${UserId}`);
})

// Home
app.get('/', async (req, res)=>{
    const users = await User.findAll({ raw: true});
    res.render('home',{users});
})

conn
    .sync()
    //.sync({ force: true })
    .then(()=> {
        app.listen(3000);
}).catch((err)=> console.log(err));
