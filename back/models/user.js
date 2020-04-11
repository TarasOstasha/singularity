let mongoose = require('mongoose');


let User = mongoose.model('User', {
    userName: { type: String, index: true },
    password: { type: String },
    email: { type: String, unique: true},
    isLogged: { type: String, default: true }
});


module.exports = User;