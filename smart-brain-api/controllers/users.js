const handleUsersGet = (req, res, db) => {
	db.select('*')
		.from('users')
		.then(users => {
			res.send(users); 
		}).catch(err => {
			res.status(400).json(`Can't get users`); 
		})
}

module.exports = {
	handleUsersGet: handleUsersGet
}