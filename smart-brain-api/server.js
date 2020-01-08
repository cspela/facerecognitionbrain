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
			if(user.length){
				res.json(user[0]);
			}else{
				res.status(400).json(`Not found.`); 
			}
		}).catch(err => {
			res.status(400).json(`Error getting user`); 
		})
})

app.post('/register', (req,res) => {
	let exists = false; 
	const { name, email, password } = req.body; 
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			return trx('users')
		      .returning('*')
			  .insert({
				name: name, 
				email: loginEmail[0], 
				joined: new Date()
			}).then(user => {
				res.json(user[0]); 
			})	
		})
		.then(trx.commit)
		.catch(trx.rollback)
	}).catch(err => {
		res.status(400).json(`Unable to register`); 
	})
})

app.post('/signin', (req,res) => {
	const { email, password } = req.body; 
	db.select('email', 'hash')
		.from('login')
		.where('email', email)
		.then(data => {
			if(bcrypt.compareSync(password, data[0].hash)){
				db.select('*').from('users').where('email', data[0].email)
				.then(user => {
					res.json(user[0])
				}).catch(err => {
					res.status(400).json(`Can't sign in`); 
				})
			}else{
				res.status(400).json(`Can't sign in`); 
			}
		}).catch(err => {
			res.status(400).json(`Can't sign in`); 
		})
})

app.put('/image', (req, res) => {
	const { id } = req.body; 
	db('users')
		.where('id', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries); 
		}).catch(err => {
			res.status(400).json(`Unable to get entries`)
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
