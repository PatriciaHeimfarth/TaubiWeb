const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const pidgeonRoutes = express.Router();
const PORT = 4000;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Pidgeon = require('./models/pidgeon');
const UserModel = require('./models/user');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();
require('./auth/auth');

mongoose.connect('mongodb://127.0.0.1:27017/pidgeons', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

pidgeonRoutes.route('/').get(function (req, res) {

    Pidgeon.find(function (err, pidgeons) {
        if (err) {
            console.log(err);
        } else {
            res.json(pidgeons);
        }
    });
});

pidgeonRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Pidgeon.findById(id, function (err, pidgeon) {
        res.json(pidgeon);
    });
});

pidgeonRoutes.route('/update/:id').post(function (req, res) {
    Pidgeon.findById(req.params.id, function (err, pidgeon) {
        if (!pidgeon) {
            res.status(404).send("data is not found");
        }
         
        else {
            pidgeon.description = req.body.description;
            pidgeon.town = req.body.town;
            pidgeon.latitude = req.body.latitude;
            pidgeon.longitude = req.body.longitude;
            pidgeon.responsible_person_registered = req.body.responsible_person_registered;
        }



        pidgeon.save().then(pidgeon => {
            res.json('Pidgeon updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

pidgeonRoutes.route('/takecare/:id').post(function (req, res) {
     Pidgeon.findById(req.params.id, function (err, pidgeon) {
        if (!pidgeon) {
            res.status(404).send("data is not found");
        }
        console.log(req)
        pidgeon.update({responsible_person_registered: req.body.responsible_person_registered} ).then(pidgeon => {
            res.json('Pidgeon updated!');
        })
            .catch(err => {
                console.log(err)
                res.status(400).send("Update not possible");
            });
    });
});

pidgeonRoutes.route('/verify/:token').get(function (req, res) {
    var token = req.params.token;
    var data = jwt.decode(token, process.env.SECRET);
    if (new Date(data.expiry) > new Date()) {
        console.log(new Date(data.expiry));
        console.log('token okay');
    }
    else {
        console.log('token expired');
    }
});

pidgeonRoutes.route('/add').post(function (req, res) {
    let pidgeon = new Pidgeon(req.body);
    let nodemailer = require('nodemailer');
    let info = {};
    info.user = process.env.EMAIL;
    info.expiry = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let token = jwt.sign(info, process.env.SECRET);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Taubi - Eintrag bestätigen',
        text: 'Besuche zur Bestätigung http://localhost:4000/pidgeons/verify/' + token
    };



    pidgeon.save()
        .then(pidgeon => {
            res.status(200).json({ 'pidgeon': 'pidgeon added successfully' });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
        .catch(err => {
            res.status(400).send('adding new pidgeon failed');
        });
});

app.use('/pidgeons', pidgeonRoutes);
app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});