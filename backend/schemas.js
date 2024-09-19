const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uid: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
        set: (value) => value.toLowerCase()
    },
    //age: Number,
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
        type: String,
        default: null,
        validate: {
            validator: function (value) {
                return !this.isTrainer || value === null
            },
            message: "A trainer cannot have trainerId"
        }
    },
})

const user = mongoose.model('users', userSchema)

module.exports = { user }