const database = {
	users: [
		{
			id: 1, 
			name: 'Spela',
			email: 'spela@gmail.com',
			password: '123',
			entries: 1,
			joined: new Date()
		},
		{
			id: 2,
			name: 'Eva',
			email: 'eva@gmail.com',
			password: '1234',
			entries: 2,
			joined: new Date()
		},	
		{
			id: 3,
			name: 'Meva',
			email: 'meva@gmail.com',
			password: '1234',
			entries: 5,
			joined: new Date()
		}	
	]
}

module.exports = {
	users: database.users
}