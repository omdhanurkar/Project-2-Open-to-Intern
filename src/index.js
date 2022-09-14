const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://group55-Database:fNdIk6xx7A9KXRmY@project-2-g55.20n7jsr.mongodb.net/Group55Database", {
    useNewUrlParser: true
})
    .then(() => { console.log("MongoDB is connected") })
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});