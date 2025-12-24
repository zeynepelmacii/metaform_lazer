const mongoose = require('mongoose');
const hashPassword = require('../Utils/Auth/HashPassword');
const comparePassword = require('../Utils/Auth/ComparePassword');
const generateJWT = require('../Utils/Auth/GenerateJWT');

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim:true
    },
    lname: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isOrganisation: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: false
    },
    addressLine2: {
        type: String,
        required: false
    },
    addressLine3: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false 
    },
    country: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user",
        required: true
    }, 
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
  timestamps: true
});


hashPassword(UserSchema);
comparePassword(UserSchema);
generateJWT(UserSchema);



module.exports = mongoose.model("User", UserSchema);
