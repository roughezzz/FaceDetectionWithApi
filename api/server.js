const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smart_brain'
  }
});

// db.select('*').from('users').then(data =>{
// 	console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({id}).then(user => {
		if (user.length) {
			res.json(user[0])
		}else{
			res.status(400).json('Not Found')
		}
	}).catch(err => res.status(400).json('Error getting user'))
})

app.put('/image',(req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl',(req, res) => {image.handleAPICall(req,res)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});