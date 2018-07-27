const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c4286df042a447088a82694b7d0a0a15'
});

const handleAPICall = (req, res) => {
	app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	}).catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db)=>{
	const {id} = req.body;
	db('users').where('id','=',id).increment('entries', 1).returning('entries')
	.then(entries => {
		res.json(entries[0]);
	}).catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall
}