const express = require('express'); // http server and router
const morgan = require('morgan'); //debugger
const mongoose = require('mongoose'); //db wrapper
const homeRoutes = require('./routes/homeRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://localhost/blog-test";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
        console.log("Server is running...");
    })
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public')); // allow direct access to public folder
app.use(express.urlencoded({ extended: true })); //parse POST requests
app.use(morgan('dev')); //dev logging


// routes
app.use('/', homeRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});