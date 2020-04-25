var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dob: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: Array,
        required: false
    },
    state: {
        type: Array,
        required: false
    },
    country: {
        type: Array,
        required: false
    },
    mobile: {
        type: String,
        required: false,
    },
    pin: {
        type: String,
        required: false
    },
    addressLine1: {
        type: Object,
        required: false
    },
    addressLine2: {
        type: Object,
        required: false
    },
    acceptTerms: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        default: "user"
    },
    active:{
        type:Boolean,
        default:true
    }
});

// UserSchema.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, null, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });

// UserSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', UserSchema);