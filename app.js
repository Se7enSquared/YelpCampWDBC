let express = require('express'),
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


app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {
                campgrounds: allcampgrounds
            });
        }
    });
});

app.post('/campgrounds', function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {
        name: name,
        image: image
    };
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
        res.redirect('/campgrounds');
    });
});


app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

app.listen(1000, function (req, res) {
    console.log('The YelpCamp Server Has Started!');
});