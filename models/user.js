const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: ""
    },
    apartment: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    confirmationCode : {
        type: String,
        unique: true
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    }
    
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;