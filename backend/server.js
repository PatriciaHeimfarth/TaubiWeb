const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const pidgeonRoutes = express.Router();
const PORT = 4000;

let Pidgeon = require('./pidgeon');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/pidgeons', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

pidgeonRoutes.route('/').get(function(req, res) {
    Pidgeon.find(function(err, pidgeons) {
        if (err) {
            console.log(err);
        } else {
            res.json(pidgeons);
        }
    });
});

pidgeonRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Pidgeon.findById(id, function(err, pidgeon) {
        res.json(pidgeon);
    });
});

pidgeonRoutes.route('/update/:id').post(function(req, res) {
    Pidgeon.findById(req.params.id, function(err, pidgeon) {
        if (!pidgeon)
            res.status(404).send("data is not found");
        else
            pidgeon.description = req.body.description;
            pidgeon.town = req.body.town;
            pidgeon.latitude = req.body.latitude;
            pidgeon.longitude = req.body.longitude;
            pidgeon.responsible_person = req.body.responsible_person;
            

            pidgeon.save().then(pidgeon => {
                res.json('Pidgeon updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

pidgeonRoutes.route('/add').post(function(req, res) {
    let pidgeon = new Pidgeon(req.body);
    pidgeon.save()
        .then(pidgeon => {
            res.status(200).json({'pidgeon': 'pidgeon added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new pidgeon failed');
        });
});

app.use('/pidgeons', pidgeonRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});