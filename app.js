let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
        name: "Granite Hill",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"

    },
    function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });

let campgrounds = [{
        name: 'Salmon Creek',
        image: 'https://i.imgur.com/brkOt7m.jpg'
    },
    {
        name: 'Rendezvous Valley',
        image: 'https://i.imgur.com/4V2rKLG.jpg'
    },
    {
        name: 'Larimer Springs',
        image: 'https://i.imgur.com/XYfSLkP.jpg'
    },
    {
        name: 'Salmon Creek',
        image: 'https://i.imgur.com/brkOt7m.jpg'
    },
    {
        name: 'Rendezvous Valley',
        image: 'https://i.imgur.com/4V2rKLG.jpg'
    },
    {
        name: 'Larimer Springs',
        image: 'https://i.imgur.com/XYfSLkP.jpg'
    },
    {
        name: 'Salmon Creek',
        image: 'https://i.imgur.com/brkOt7m.jpg'
    },
    {
        name: 'Rendezvous Valley',
        image: 'https://i.imgur.com/4V2rKLG.jpg'
    },
    {
        name: 'Larimer Springs',
        image: 'https://i.imgur.com/XYfSLkP.jpg'
    }
]

app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', {
        campgrounds: campgrounds
    });
});

app.post('/campgrounds', function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

app.listen(1000, function (req, res) {
    console.log('The YelpCamp Server Has Started!');
});