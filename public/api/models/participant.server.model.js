var mongoose = require('mongoose');

var participantSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    name: String,
    email: String,
    link: String
});

module.exports = mongoose.model('Participant', participantSchema);