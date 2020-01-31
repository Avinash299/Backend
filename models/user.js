var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false,
        default:0
    },
    mobileNo: {
        type: String,
        required: false,
        default:0,
    },
    firstName: {
        type: String,
        required: false,
        default:""
    },
    lastName: {
        type: String,
        required: false,
        default:""
    },
    address: {
        type: Object,
        required: false
    },
    terms: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        default: "user"
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);