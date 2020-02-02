var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    startDate: {
        type: Object,
    },
    endDate: {
        type: Object,
    },
    rules: {
        type: String,
    }
});
module.exports = mongoose.model('Event', EventSchema);