const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
    },
    petType: {
        type: String,
        required: [true, "Type is required"],
        minLength: [3, "Type must be at least 3 characters"],
    },
    petDesc: {
        type: String,
        required: [true, "Description is required"],
        minLength: [3, "Description must be at least 3 characters"],
    },
    skill1: {
        type: String,
    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
module.exports.Pet = mongoose.model('Pet', PetSchema);

