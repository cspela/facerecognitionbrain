const express = require('express');
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const users = [
	{
		id: 1, 
		name: 'Spela',
		email: 'spela@gmail.com',
		password: '123',
		rank: 1
	},
	{
		id: 2,
		name: 'Eva',
		email: 'eva@gmail.com',
		password: '1234',
		rank: 2
	},	
	{
		id: 3,
		name: 'Meva',
		email: 'meva@gmail.com',
		password: '1234',
		rank: 5	
	}	
]

app.get('/', (req,res) => {
	res.send("This is working"); 
})

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
	let exists = false; 
	users.map(user => {
		if(user.email === req.body.email){
			exists = true; 
		}
		return exists; 
	})
	console.log(exists); 
	if(!exists){
		const user = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		}
		users.push(user);
		res.send(user);
	} else{
		res.send("User already exists.");
	}

})

app.post('/signin', (req,res) => {
	let canSignin = false; 
	users.map(user => {
		if(user.email === req.body.email && user.password === req.body.password){
			canSignin = true; 
		}
		return canSignin; 
	})
	if(canSignin){
		res.send('Sccess'); 
	}else{
		res.send('Fail'); 
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

app.put('/rank/:userId', (req, res) => {
	for(user of users){
		if(user.id === Number(req.params.userId)){
			user.rank += 1; 
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