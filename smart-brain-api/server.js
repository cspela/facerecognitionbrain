const express = require('express');
const app = express(); 

const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors'); 

const database = require('./database.js');
const { users } = database; 

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors()); 

app.get('/', (req,res) => {
	res.send(users); 
})

app.get('/users', (req,res) => {
	res.send(users); 
})

app.get('/profile/:id', (req,res) => {	
	let found = 'false'; 
	users.forEach(user => {
		const { name, entries } = user; 
		if(user.id === Number(req.params.id)){
			found = 'true'; 
			return res.json(user); 
		}
	})
	if(!found){
		res.status(404).json('Not found'); 
	}
})

app.post('/register', (req,res) => {
	let exists = false; 
	const { id, name, email, password } = req.body; 
	users.map(user => {
		if(user.email === email){
			exists = true; 
		}
		return exists; 
	})
	console.log(exists); 	
	if(!exists){
		const user = {
			id: Math.floor(Math.random() * 100),
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		}
		users.push(user);
		res.json(user);
	} else{
		res.json("exists");
	}

})

app.post('/signin', (req,res) => {
	let canSignin = false; 
	const { email, password } = req.body; 
	users.map(user => {
		if(user.email === email && user.password === password){
			canSignin = true;
			return res.json(user); 
		}
		return canSignin; 
	})

	if(!canSignin){
		res.status(400).json('fail');
	}

	// if(!canSignin){
	// 	res.json('success'); 
	// }else{
	// 	res.status(400).json('fail'); 
	// }
})

app.delete('/user/:id', (req,res) => {
	users.forEach((user, i) => {
		//console.log(user, i); 
		if(user.id === Number(req.params.id)){
			users.splice(i, 1);
		}
	})
	res.send("User has been successfuly deleted."); 
})

app.put('/userData/:id', (req,res) => {
	const { name, email, password } = req.body;
	const { id } = req.params; 
	users.forEach((user, i) => {
		if(user.id === Number(id)){
			user.name = name; 
			user.email = email; 
			user.password = password; 
		}
	})
	res.send("User has been updated."); 
})

app.put('/image', (req, res) => {
	let found = 'false'; 
	users.forEach(user => {
		const { id } = req.body; 
		if(user.id === Number(id)){
			found = 'true'; 
			user.entries++; 
			return res.json(user.entries); 
		}
	})
	if(!found){
		res.status(400).json('User not found'); 
	}
})

// app.put('/entries/:userId', (req, res) => {
// 	const { userId } = req.params; 
// 	for(user of users){
// 		if(user.id === Number(userId)){
// 			user.entries += 1; 
// 			res.send(user);
// 		}
// 	}
// })

const port = 3003; 
app.listen(port, () => {
	console.log(`App is running on port ${port}`)
}); 
