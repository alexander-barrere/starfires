//  creates a new user profile and stores it in a MongoDB database:

const mongoose = require('mongoose');
const axios = require('axios');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
    birthtime: { type: String, required: true },
    birthPlace: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', (name) => {
    rl.question('What is your birthdate? ', (birthdate) => {
        rl.question('What is your birthtime? ', (birthtime) => {
            rl.question('What is your birthPlace? ', (birthPlace) => {
                axios.get(`https://nominatim.openstreetmap.org/search?q=${birthPlace}&format=json`)
                .then(response => {
                    const { latitude, longitude } = response.data[0];
                    const user = new User({ name, birthdate, birthtime, birthPlace, latitude, longitude });
                    user.save(function(err) {
                        if (err) return console.error(err);
                        console.log("User profile created and saved successfully!");
                    });
                });
            });
        });
    });
});
