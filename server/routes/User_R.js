const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const passwordValidator = require('password-validator');
require('dotenv').config();

// db
require("../models/User_model");
const User = mongoose.model("User");

const schema = new passwordValidator();

schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

// Route handler for user registration
const registerUser = async (req, res) => {
    const { username, email, country, city, password, userType } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email" });
    }
    if (!validator.isLength(username, { min: 3, max: 20 })) {
        return res.status(400).json({ error: "Username must be between 4 and 20 characters" });
    }
    const isValidPassword = schema.validate(password, { list: true });
    if (isValidPassword.length > 0) {
        return res.status(400).json({ error: "Invalid password. Password requirements: " + isValidPassword.join(", ") });
    }

    try {
        const oldUser = await User.findOne({ email });
        const oldUserUsername = await User.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ error: "User with email already exists" });
        }
        if (oldUserUsername) {
            return res.status(400).json({ error: "User with username already exists" });
        }
        await User.create({
            username,
            email,
            country,
            city,
            password: await bcrypt.hash(password, 10),
            userType,
        });
        return res.status(201).json({ status: "OK" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Route handler for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME || "1h",
        });

        res.status(200).json({ status: "OK", data: token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

// Route handler to get all users
const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find();
        res.send({ status: "OK", data: allUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
};

// Route handler to check if the user is an admin
const checkAdminStatus = async (req, res) => {
    // Get the JWT token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify and decode the JWT token to get the user's email
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.email;

        // Now you have the email, proceed to check if the user is an admin
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isAdmin = user.userType === '1';

        res.status(200).json({ status: 'OK', isAdmin });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server Error' });
    }
};


const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = {
            id: user.id,
            image: user.image,
            username: user.username,
            email: user.email,
            country: user.country,
            city: user.city,
            bio: user.bio,
        };

        res.status(200).json({ status: "OK", data: userData });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

const getUserUsername = async (req, res) => {
    // Get the JWT token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify and decode the JWT token to get the user's email
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const email = decodedToken.email;

        // Now you have the email, proceed to find the user and return the username
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ status: 'OK', username: user.username, image: user.image});
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const userEdit = async (req, res) => {
    try {
        const userE = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        await userE.save();
        res.json(userE);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
}


router.post("/reg", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/isAdmin", checkAdminStatus);
router.get("/profile/:username", getUserProfile);
router.get("/getUsername", getUserUsername);
router.patch("/:id", userEdit);


module.exports = router;