var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    dashbaordPermission: {
        type: Array,
        required: true
    },
    userPermission: {
        type: Array,
        required: false
    },
    chartPermission: {
        type: Array,
        required: false
    },
    active:{
        type:Boolean,
        default:true
    }
});
module.exports = mongoose.model('Role', RoleSchema);
