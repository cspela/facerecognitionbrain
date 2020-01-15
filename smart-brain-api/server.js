const express = require('express');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors'); 
const database = require('./database.js');
const knex = require('knex');

const register = require('./controllers/register'); 
const signin = require('./controllers/signin'); 
const profile = require('./controllers/profile'); 
const image = require('./controllers/image'); 
const users = require('./controllers/users'); 

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

const app = express(); 

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors()); 

app.get('/users', (req, res) => { users.handleUsersGet(req, res, db)});
app.post('/register', register.handleRegister(db, bcrypt)); 
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) }); 
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) }); 
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res) }); 
app.delete('/user/:id', (req, res) => { profile.handleProfileDelete(req, res, db) });
app.put('/userData/:id', (req, res) => { profile.handleProfilePut(req, res, db) }); 

const port = 3003; 
app.listen(port, () => {
	console.log(`App is running on port ${port}`)
}); 
