const express = require('express');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors'); 
const database = require('./database.js');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smartbrain'
  }
});

const app = express(); 

const { users } = database; 

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors()); 

app.get('/', (req,res) => {
	res.send(`It's working...`); 
})

app.get('/users', (req,res) => {
	db.select('*')
		.from('users')
		.then(users => {
			res.send(users); 
		}).catch(err => {
			res.status(400).json(`Can't get users`); 
		})
})

app.get('/profile/:id', (req,res) => {	
	const { id } = req.params;
	db.select('*')
		.from('users')
		.where('id', id)
		.then(user => {
			if(!user[0]){
				res.status(400).json(`Can't get user`); 
			}
			res.json(user[0]);
		}).catch(err => {
			res.status(400).json(`Can't get user`); 
		})
})

//INSERT INTO LOGIN!!!!!
app.post('/register', (req,res) => {
	let exists = false; 
	const { name, email, password } = req.body; 
	db('users')
      .returning('*')
	  .insert({
		name: name, 
		email: email, 
		joined: new Date()
	}).then(user => {
		res.json(user[0]); 
	}).catch(err => {
		res.status(400).json(`Unable to register`); 
	})
})

app.post('/signin', (req,res) => {
	const { email, password } = req.body; 
	db.select('*').from('login')
		.where({email: email, hash: password})
		.then(user => {
			if(!user[0]){
				res.status(400).json(`Can't sign in`); 
			}
			db.select('*')
				.from('users')
				.where('email', email)
				.then(user => {
					res.json(user[0]);
				}) 
		}).catch(err => {
			res.status(400).json(`Can't sign in`); 
		})
})

app.put('/image', (req, res) => {
	const { id } = req.body; 
	db('users')
		.where('id', id)
		.increment({'entries': 1})
		.returning('entries')
		.then(entries => {
			res.json(entries); 
		}).catch(err => {
			res.status(400).json(`Can't update entries`)
		})
})

app.delete('/user/:id', (req,res) => {
	const { id } = req.params; 
	db('users')
		.where('id', id)
		.del()
		.then(response => {
			if(response === 1){
				res.json((`User deleted.`)); 
			}else{
				res.status(400).json(`Can't delete user`);
			}
		}).catch(err => {
			res.status(400).json(`Error`);
		})
})

app.put('/userData/:id', (req,res) => {
	const { name, email, password } = req.body;
	const { id } = req.params; 
	db('users')
		.where('id', id)
		.update({
			name: name,
			email: email,
		})
		.then(response => {
			if(response === 1){
				res.json((`User updated.`)); 
			}else{
				res.status(400).json(`User doesn't exists`);
			}
		})
		.catch(err => {
			res.status(400).json(`Can't update user.`);
		})
})

const port = 3003; 
app.listen(port, () => {
	console.log(`App is running on port ${port}`)
}); 
