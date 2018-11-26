const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

app.set('view engine', 'ejs');

// LANDING route
app.get('/', function (req, res) {
    res.render('landing');
});

// INDEX route
app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                campgrounds: allcampgrounds
            });
        }
    });
});

// CREATE (post route)
app.post('/campgrounds', function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name,
        image: image,
        description: description
    };
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW route
app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

// SHOW route - shows additional info about campground
app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground}); 
        }
    })
    
});

app.listen(1000, function (req, res) {
    console.log('The YelpCamp Server Has Started!');
});