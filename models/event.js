var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    eventName: {
        type: String,
    },
    eventCountry: {
        type: String,
    },
    eventCity: {
        type: String,
    },
    startModel: {
        type: Object,
    },
    endModel: {
        type: Object,
    },
    eventDescription: {
        type: String,
    },
    eventProblemStatement: {
        type: String,
    },
});
module.exports = mongoose.model('Event', EventSchema);