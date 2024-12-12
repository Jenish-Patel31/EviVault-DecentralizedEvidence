const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    adharCard: { type: String, required: true },
    birthdate: { type: Date, required: true },
    address: { type: String, required: true },
    userRole: { type: String, required: true }
})

const User =  mongoose.model('Users', userSchema);

module.exports = User;