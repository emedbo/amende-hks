var mongoose = require('mongoose');

var participantSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    partId: String,
    name: String,
    email: String,
    link: String,
    selectedLegs: [Number]
});

module.exports = mongoose.model('Participant', participantSchema);