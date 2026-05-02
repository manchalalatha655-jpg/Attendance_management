const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Institutional email required (e.g., hod123@vemu.org)'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9][a-zA-Z0-9._-]{2,18}@vemu\.org$/, 'Please use valid VEMU email (e.g., hod123@vemu.org, t101@vemu.org, s2023cs01@vemu.org)']
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student', 'hod', 'librarian'],
        required: true
    },
    department: {
        type: String,
        trim: true,
        default: null
    },
    assignedClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    studentId: {
        type: String,
        unique: true,
        sparse: true // Only for students
    },
    phone: {
        type: String,
        trim: true
    },
    qualification: {
        type: String,
        trim: true
    },
    year: {
        type: String, // E.g. "Year 1", "Semester 3"
        trim: true
    },
    employeeId: {
        type: String,
        unique: true,
        sparse: true // Only for teachers
    },
    adminId: {
        type: String,
        unique: true,
        sparse: true // Only for admins
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
