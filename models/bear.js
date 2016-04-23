var mongoose = require('mongoose');

var bearSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('Bear', bearSchema);