const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(cors())
app.use(express.json());

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});

app.get('/', (req, res) => { res.send('success')});
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/signup', signup.handleSignUp(db, bcrypt));
app.get('/profile/:id', profile.handleGetProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleClarifaiCall())

app.listen(process.env.PORT, () => {console.log(`Listening on ${process.env.PORT}`)});