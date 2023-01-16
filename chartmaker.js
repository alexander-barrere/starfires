/* This program prompts the user for their name, then queries the MongoDB database to find the user based on the provided name, and use the chart field of the user 
document to get the chart data to render the chart in the webpage.
It uses Astro.js to generate the chart data, and D3.js to create the SVG elements for each planet and position them on the chart based on their positions in the 
chart data. */

const mongoose = require('mongoose');
const Astro = require('astro.js');
const D3 = require('d3');

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
    User.findOne({ name }, (err, user) => {
        if (err) return console.log(err);
        if (!user) return console.log('User not found');
        const chart = new Astro.Chart(user.name, {
            date: user.birthdate,
            time: user.birthtime,
            place: [user.latitude, user.longitude]
        });
        const svg = D3.select('body')
            .append('svg')
            .attr('width', 500)
            .attr('height', 500);
        svg.selectAll('circle')
            .data(chart.planets)
            .enter()
            .append('circle')
            .attr('cx', (d) => d.position.x)
            .attr('cy', (d) => d.position.y)
            .attr('r', (d) => d.size)
            .attr('fill', (d) => d.color);
        console.log("Chart generated successfully!");
    });
});