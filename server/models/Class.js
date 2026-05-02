const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String, // Simplified to String for beginner friendliness as requested
        required: true
    },
    year: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th'],
        required: true
    },
    section: {
        type: String,
        enum: ['A', 'B', 'C'],
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    timetable: [{
        day: String,
        period: String,
        subject: String,
        teacher: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
