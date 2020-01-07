const express = require('express');
const app = express(); 

const database = require('./database.js');
const { users } = database; 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req,res) => {
	res.send(users); 
})

app.get('/users', (req,res) => {
	res.send(users); 
})

app.get('/profile/:id', (req,res) => {	
	for(user of users){
		const { name, entries } = user; 
		if(user.id === Number(req.params.id)){
			user = {
				name: name,
				entries: entries
			}
			res.send(user); 
		}
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
			id: id,
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		}
		users.push(user);
		res.send(user);
	} else{
		res.send("User already exists.");
	}

})

app.post('/signin', (req,res) => {
	let canSignin = false; 
	const { email, password } = req.body; 
	users.map(user => {
		if(user.email === email && user.password === password){
			canSignin = true; 
		}
		return canSignin; 
	})

	if(canSignin){
		res.json('sccess'); 
	}else{
		res.status(400).json('error logging in'); 
	}
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

//Updating user data (name, email, password)
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

app.put('/entries/:userId', (req, res) => {
	const { userId } = req.params; 
	for(user of users){
		if(user.id === Number(userId)){
			user.entries += 1; 
			res.send(user);
		}
	}
})

const port = 3003; 
app.listen(port, () => {
	console.log(`App is running on port ${port}`)
}); 

	// console.log(req.url);
	// console.log(req.method);
	// console.log(req.headers);
	// console.log(req.params);
	// console.log(req.query);
	//console.log(req.body); --> post/put/delete