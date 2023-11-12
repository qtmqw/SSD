const express = require("express");
const router = express.Router();
const Event = require('../models/Events_model');

router.get("/", async (req, res) => {
    try {
        let event = await Event.find();
        res.json(event);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, date, country, city, about, time, googleMap, waze } = req.body;

        const event = {
            title,
            date,
            country,
            city,
            about,
            time,
            googleMap,
            waze,
        };

        const newEvent = await Event.create(event);
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;

// secret-drift
