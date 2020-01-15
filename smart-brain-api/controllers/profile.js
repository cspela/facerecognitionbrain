const handleProfileGet = (req, res, db) => {	
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
}

const handleProfileDelete =(req, res, db) => {
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
}

const handleProfilePut = (req,res, db) => {
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
}

module.exports = {
	handleProfileGet: handleProfileGet,
	handleProfileDelete: handleProfileDelete,
	handleProfilePut: handleProfilePut
}