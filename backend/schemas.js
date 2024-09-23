const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uid: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
        set: (value) => value.toLowerCase()
    },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    goal: {
        type: String,
        enum: ['Build endurance', 'Increase flexibility', 'Weight loss', 'Gain muscles', 'Become healthier'],
        required: true
    },
    targetWeight: { type: Number, required: true },
    activity: {
        type: String,
        enum: ['Little or not active', 'Lightly active', 'Moderately active', 'Very active'],
        required: true
    },
    isTrainer: { type: Boolean, default: false },
    //if the user is not trainer then, we can include the trainer id or leave it as null :)
    trainerId: {
        type: ObjectId,
        default: null,
        validate: {
            validator: function (value) {
                return !this.isTrainer || value === null
            },
            message: "A trainer cannot have trainerId"
        }
    },
})

const excerciseSchema = new mongoose.Schema({
    name: String,
    description: String
})

const user = mongoose.model('users', userSchema)
const excercise = mongoose.model('excercise', excerciseSchema)

module.exports = { user, excercise }