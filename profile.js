/* This program uses the Express framework to create a simple web server that listens for a GET request to the '/profile/:name' route, where ':name' is a URL parameter 
that holds the name of the user. It then queries the MongoDB database to find the user based on the provided name, and use the chart field of the user document to 
get the chart data to render the chart in the webpage.
It uses the EJS template engine to render the HTML page, and Express to serve the HTML.
Please note that you need to replace mongodb://localhost/mydb with the appropriate URI of your MongoDB instance.
And you also need to create a views directory and an profile.ejs file that will contain the HTML template, the EJS template engine will use the user object 
to replace the variables in this file with the actual values of the user. */

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    birthtime: { type: String, required: true },
    birthPlace: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    chart: { type: Object },
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

const app = express();
app.set('view engine', 'ejs');

app.get('/profile/:name', (req, res) => {
    User.findOne({ name: req.params.name }, (err, user) => {
        if (err) return console.log(err);
        if (!user) return res.send('User not found');
        res.render('profile', { user });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
