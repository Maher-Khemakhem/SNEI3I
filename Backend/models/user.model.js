const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// User Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [6, 'Minimum password length is 6 characters'],
        },
        role:{
            type:String,
            required:true
        },
        id_role:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            unique: true, 
        }
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10); // Use a strength of 10
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static method for login
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
