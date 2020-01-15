const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
 apiKey: '01131eb18c31484aaf6f23880c675c1a'
});

const handleApiCall = (req, res) => {
	app.models
		.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
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
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}