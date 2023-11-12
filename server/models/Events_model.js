const mongoose = require("mongoose")
const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        about: {
            type: String,
        },
        time: {
            type: String,
        },
        googleMap: {
            type: String,
        },
        waze: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
);

const Event = mongoose.model("Event", eventSchema)

module.exports = Event