const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

// Handle errors function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // Incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // Incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // Duplicate email error (MongoDB error code 11000)
    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }

    // Validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// Token creation (JWT)
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'maher secret', {
        expiresIn: maxAge,
    });
};

// Signup (GET)
const signup_get = async (req, res) => {
    res.status(200).send('Signup page (if needed)');
};

// Login (GET)
const login_get = async (req, res) => {
    res.status(200).send('Login page (if needed)');
};

// Signup (POST)
const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json({ err });
    }
};

// Login (POST)
const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};
const logout_get = async (req, res) => {
    res.cookie('jwt','',{maxAge:1});
    res.status(200).json({ data:'You logged out successfully' });
};
module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
};
