const express = require('express');
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const users = [
	{
		id: 1, 
		name: 'Spela',
		email: 'spela@gmail.com',
		password: '123'	
	},
	{
		id: 2,
		name: 'Eva',
		email: 'eva@gmail.com',
		password: '1234'	
	},	
	{
		id: 3,
		name: 'Meva',
		email: 'meva@gmail.com',
		password: '1234'	
	}	
]

app.get('/users', (req,res) => {
	res.send(users); 
})

app.get('/user/:id', (req,res) => {	
	for(user of users){
		if(user.id === Number(req.params.id)){
			user = {
				id: user.id,
				name: user.name,
				email: user.email
			}
			res.send(user); 
		}
	}
})

app.post('/register', (req,res) => {
	const user = {
		id: req.body.id,
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	}
	users.push(user); 
	res.send("User has been successfuly added."); 
})

app.post('/login', (req,res) => {
	let canLogin = false; 
	users.map(user => {
		if(user.email === req.body.email && user.password === req.body.password){
			canLogin = true; 
		}
		return canLogin; 
	})
	res.send(canLogin); 
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

app.put('/user/:id', (req,res) => {
	users.forEach((user, i) => {
		if(user.id === Number(req.params.id)){
			user.name = req.body.name; 
			user.email = req.body.email; 
			user.password = req.body.password; 
		}
	})
	res.send("User has been updated."); 
})


app.listen(3000); 


	// console.log(req.url);
	// console.log(req.method);
	// console.log(req.headers);
	// console.log(req.params);
	// console.log(req.query);
	//console.log(req.body); --> post/put/delete