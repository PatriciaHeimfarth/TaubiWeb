const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pidgeon = new Schema({
    description: {
        type: String
    },
    town: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    responsible_person: {
        type: Boolean
    },
    
});

module.exports = mongoose.model('Pidgeon', Pidgeon);