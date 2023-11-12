const express = require("express");
const router = express.Router();
const UCar_model = require("../models/UCar_model");

router.get("/", async (req, res) => {
    try {
        let uCar_model = await UCar_model.find().populate('user');

        res.json(uCar_model);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.post("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { image, company, model, year, desc } = req.body;

        const uCar_model = {
            user: userId,
            image,
            company,
            model,
            year,
            desc,
        };

        const newUCar_model = await UCar_model.create(uCar_model);
        res.status(201).json(newUCar_model);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const uCar_models = await UCar_model.find({ user: userId });
        res.json(uCar_models);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const uCar_model = await UCar_model.findById(req.params.id);
        res.json(uCar_model);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const carE = await UCar_model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        await carE.save();
        res.json(carE);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const uCar = await UCar_model.findByIdAndDelete(req.params.id);
        res.json(uCar);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;