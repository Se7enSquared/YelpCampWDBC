let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

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
    }
]

app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', {
        campgrounds: campgrounds
    });
});

app.post('/campgrounds', function (req, res) {
    res.send('post');
});

app.get('/campgrounds/new', function (req, res) {
    res.render('new');
});

app.listen(1000, function (req, res) {
    console.log('The YelpCamp Server Has Started!');
});