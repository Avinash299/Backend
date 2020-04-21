var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    modules: {
        type: Array,
        required: true
    },
    permissions: {
        type: Array,
        required: true
    },
    active:{
        type:Boolean,
        default:true
    }
});
module.exports = mongoose.model('Role', RoleSchema);