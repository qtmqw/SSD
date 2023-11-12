const express = require("express");
const router = express.Router();
const UChat = require('../models/UChats_model');
const User = require('../models/User_model');

router.post("/messages", async (req, res) => {
    try {
        const userId = req.body.userId;
        const { content } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const message = new UChat({
            user: userId,
            username: user.username,
            image: user.image,
            message: content,
        });

        await message.save();
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create message" });
    }
});

// Get all messages
router.get("/messages", async (req, res) => {
    try {
        const messages = await UChat.find().populate('user');
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve messages" });
    }
});

module.exports = router;